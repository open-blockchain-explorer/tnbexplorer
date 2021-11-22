import React, {useEffect, useRef, ReactNode} from 'react';
import {Form} from 'antd';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import {Rule} from 'antd/es/form';

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  focusIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: T;
  index: number;
  rules: Rule[];
}

export function EditableCell<T>({
  editing,
  dataIndex,
  focusIndex,
  title,
  inputType,
  record,
  index,
  children,
  rules,
  ...restProps
}: EditableCellProps<T>) {
  const inputRef = useRef<Input>(null);
  const inputNumberRef = useRef<HTMLInputElement>(null);

  let inputNode: ReactNode;
  if (dataIndex === focusIndex) {
    inputNode = inputType === 'number' ? <InputNumber ref={inputNumberRef} /> : <Input ref={inputRef} />;
  } else {
    inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  }
  useEffect(() => {
    if (editing && dataIndex === focusIndex) {
      inputRef.current?.focus();
      inputNumberRef.current?.focus();
    }
  }, [editing, dataIndex, focusIndex]);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} validateStatus="success" style={{margin: 0}} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
