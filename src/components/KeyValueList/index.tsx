import React, {FC, ReactNode} from 'react';

import Divider from 'antd/es/divider';
import List from 'antd/es/list';

import KeyValuePair, {KeyValueType} from '../KeyValuePair';

interface ComponentProps {
  items: (KeyValueType & {show?: boolean; renderItem?: (props: KeyValueType) => ReactNode})[];
}

const KeyValueList: FC<ComponentProps> = ({items}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={({title, value, show = true, renderItem, ...properties}) => {
        if (renderItem) {
          return <List.Item> {renderItem({title, value, ...properties})} </List.Item>;
        }

        if (show) {
          return (
            <List.Item key={title}>
              <KeyValuePair title={title} value={value} {...properties} />
            </List.Item>
          );
        }
        return null;
      }}
    >
      <Divider type="horizontal" style={{margin: '0px'}} />
    </List>
  );
};

export default KeyValueList;
