import React, { FC } from "react";
import { Col, Grid, Layout as AntDLayout, Row } from "antd";
import Header from "./Header";

import { layoutPadding } from "utils/responsive";

const { useBreakpoint } = Grid;

const { Footer, Content } = AntDLayout;

const Layout: FC = ({ children }) => {
  const screens = useBreakpoint();
  console.log(screens);

  return (
    <>
      <AntDLayout>
        <Header />
        <Content style={{ padding: "50px " + layoutPadding(screens) }}>
          <Row gutter={[20, 30]}>{children}</Row>
        </Content>
        <Footer style={{ paddingLeft: layoutPadding(screens) }}>Footer</Footer>
      </AntDLayout>
    </>
  );
};

export default Layout;
