import React, {FC} from 'react';
import Card from 'antd/es/card';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

const ChartsCard: FC<{title?: string; description?: string}> = ({children, title, description}) => {
  return (
    <Card>
      <Space direction="vertical">
        {title ? (
          <>
            <Typography.Text strong>{title}</Typography.Text>
            <Typography.Text>{description}</Typography.Text>
          </>
        ) : (
          <></>
        )}
      </Space>
      {children}
    </Card>
  );
};

export default ChartsCard;
