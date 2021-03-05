import React, { FC } from 'react';
import { Col, Row, Table, Typography } from 'antd';

import { TableProps } from 'antd/es/table';
import { ButtonLink } from '..';

type OverviewTableProps = TableProps<any> & { buttonLink: string };
const index: FC<OverviewTableProps> = ({ buttonLink, ...tableProps }) => {
  return (
    <Row>
      <Col span={24}></Col>

      <Col span={24}>
        <Table
          {...tableProps}
          bordered={true}
          title={() => (
            <Row justify="space-between" align="middle">
              <Typography.Text> Latest Transactions</Typography.Text>
              <ButtonLink link={buttonLink} />
            </Row>
          )}
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default index;
