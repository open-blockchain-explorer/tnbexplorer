import React, {useEffect, useState, useRef} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography} from 'antd';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import {Rule} from 'rc-field-form/lib/interface';
import {EditableCell} from './EditableCell';

interface Payment {
  key: string;
  accountNumber: string;
  amount: number;
  memo: string;
}

const originData: Payment[] = [];

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Payment[]>(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Payment) => record.key === editingKey;

  const edit = (record: Partial<Payment> & {key: React.Key}) => {
    form.setFieldsValue({accountNumber: '', amount: '', memo: '', ...record});
    setEditingKey(record.key);
  };

  const cancel = () => {
    if (data[data.length - 1].accountNumber === '') {
      const dataCpy = [...data];
      dataCpy.pop();
      setData(dataCpy);
    }
    setEditingKey('');
  };

  const handleDelete = (recordKey: string) => {
    const filteredData = data.filter(({key}) => key !== recordKey);
    setData(filteredData);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Payment;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(() => newData);
        setEditingKey(() => '');
      } else {
        newData.push(row);
        setData(() => newData);
        setEditingKey(() => '');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = async () => {
    let newData: Payment = {
      key: '0',
      accountNumber: '',
      amount: 0,
      memo: 'Processed by Tnb Explorer',
    };
    if (data.length > 0) {
      if (data[data.length - 1].accountNumber === '') return;

      newData = {...data[data.length - 1]};
      newData.key = (Number(newData.key) + 1).toString();
      newData.accountNumber = '';
    }
    setData([...data, {...newData, amount: 0, memo: ''}]);
    edit(newData);
  };

  const columns: any[] = [
    {
      dataIndex: 'accountNumber',
      title: 'Account Number',
      width: '40%',
      editable: true,
      render: (text: string) => (
        <Typography.Text style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>{text}</Typography.Text>
      ),
    },
    {
      align: 'right' as const,
      dataIndex: 'amount',
      title: 'Amount (TNBC)',
      width: '20%',
      editable: true,
      render: (coins: number) => <Typography.Text>{new Intl.NumberFormat().format(coins)}</Typography.Text>,
    },
    {
      dataIndex: 'memo',
      title: 'Memo',
      width: '40%',
      editable: true,
      render: (text: string) => (
        <Typography.Text style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>{text}</Typography.Text>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Payment) => {
        const beingEdited = isEditing(record);
        return beingEdited ? (
          <span>
            <Button onClick={() => save(record.key)} style={{marginRight: 8}}>
              Save
            </Button>

            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            {'   '}
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Typography.Link disabled={editingKey !== ''}>Delete</Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  type PaymentRules = {[Property in keyof Omit<Payment, 'key'>]: Rule} | {[s: string]: Rule[]};
  const validationRules: PaymentRules = {
    accountNumber: [
      {len: 64, message: 'Length has to be 64'},
      {message: 'Must only contain hex values (a-f 0-9)', pattern: /^#?([a-f0-9]{1,})$/i},
      {
        required: true,
        message: 'Account Number is required',
      },
    ],
    amount: [
      {
        validator: (_, value) => {
          if (value > 0) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Must Enter a value greater than 0'));
        },
      },
      {
        required: true,
        message: 'Amount is required',
      },
    ],
    memo: [{max: 64, message: 'Memo has a max length of 64', whitespace: false}],
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Payment) => ({
        record,
        inputType: col.dataIndex === 'amount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        focusIndex: columns[0].dataIndex,
        title: col.title,
        editing: isEditing(record),
        rules: validationRules[col.dataIndex],
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        footer={() => (
          <Row justify="space-between">
            <Col>
              <Button
                onClick={handleAdd}
                type="primary"
                disabled={data.length === 10}
                ghost={data.length === 10}
                icon={<PlusOutlined />}
              >
                Add Payment Address
              </Button>
            </Col>
            <Col>
              Total:
              <Typography.Text strong> {data.reduce((acc, payment) => payment.amount + acc, 0)}</Typography.Text>
            </Col>
            <Col>
              <Typography.Text>Limit: 10</Typography.Text>
            </Col>
          </Row>
        )}
      />
    </Form>
  );
};

export default EditableTable;
