import React, {FC} from 'react';

import Divider from 'antd/es/divider';
import List from 'antd/es/list';

import KeyValuePair, {KeyValueType} from '../KeyValuePair';

interface ComponentProps {
  items: KeyValueType[];
}

const KeyValueList: FC<ComponentProps> = ({items}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={({title, value, ...properties}) => (
        <List.Item>
          <KeyValuePair title={title} value={value} {...properties} />
        </List.Item>
      )}
    >
      <Divider type="horizontal" style={{margin: '0px'}} />
    </List>
  );
};

export default KeyValueList;
