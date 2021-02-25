import React, {FC} from 'react';
import {Grid, Layout as AntDLayout, Row} from 'antd';

const PageContentsLayout: FC = ({children}) => {
  return <Row gutter={[20, 30]}>{children}</Row>;
};

export default PageContentsLayout;
