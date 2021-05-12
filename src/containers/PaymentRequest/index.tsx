import React, {FC, useEffect, useState, useRef} from 'react';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Form, {FormInstance} from 'antd/es/form';
import Grid from 'antd/es/grid';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Popconfirm from 'antd/es/popconfirm';
import Table, {ColumnsType} from 'antd/es/table';
import Typography from 'antd/es/typography';
import {Rule} from 'rc-field-form/lib/interface';
import {nanoid} from 'nanoid';

import PlusOutlined from '@ant-design/icons/PlusOutlined';

import {PageContentsLayout, Qr} from 'components';
import {usePaymentParams} from 'hooks';
import EditableRow from './EditableRow';
import {EditableCell} from './EditableCell';
// import { responsiveWidth } from 'utils/responsive';

interface Payment {
  key: string;
  accountNumber: string;
  amount: number;
  memo: string;
}

const PaymentRequest = () => {
  const initialPayments = usePaymentParams();
  const [paymentData, setPaymentData] = useState<Payment[]>(initialPayments);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const [copied, setCopied] = useState(false);
  const {useBreakpoint} = Grid;
  const screens = useBreakpoint();
  const tabList = [
    {
      key: 'payment-request',
      tab: 'Payment request',
    },
    {
      key: 'make-payment',
      tab: 'Make Payment',
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState<string>('payment-request');

  useEffect(() => {
    setCopied(false);
  }, [paymentData]);

  const isEditing = (record: Payment) => record.key === editingKey;

  const edit = (record: Partial<Payment> & {key: React.Key}) => {
    form.setFieldsValue({accountNumber: '', amount: '', memo: '', ...record});
    setEditingKey(record.key);
  };

  const cancel = () => {
    if (paymentData[paymentData.length - 1].accountNumber === '') {
      const dataCpy = [...paymentData];
      dataCpy.pop();
      setPaymentData(dataCpy);
    }
    setEditingKey('');
  };

  const handleDelete = (recordKey: string) => {
    const filteredData = paymentData.filter(({key}) => key !== recordKey);
    setPaymentData(filteredData);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Payment;

      const newData = [...paymentData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setPaymentData(() => newData);
        setEditingKey(() => '');
      } else {
        newData.push(row);
        setPaymentData(() => newData);
        setEditingKey(() => '');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = async () => {
    let newData: Payment = {
      key: nanoid(),
      accountNumber: '',
      amount: 0,
      memo: 'Processed By Tnb Explorer',
    };

    if (paymentData.length > 0) {
      if (paymentData[paymentData.length - 1].accountNumber === '') return;
      const prevData = paymentData[paymentData.length - 1];
      newData = {...prevData, key: nanoid(), accountNumber: ''};
    }
    setPaymentData([...paymentData, {...newData, amount: 0, memo: ''}]);
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
      {
        validator: (_, value) => {
          const duplicate = paymentData.find((payment) => value === payment.accountNumber);
          console.log(value, duplicate);
          if (duplicate) {
            return Promise.reject(new Error('Account Number Must be Unique'));
          }
          return Promise.resolve();
        },
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

  const PAYMENT_REQUEST_ADDRESS =
    'http:localhost:3000/tnb/payment-request' || 'https://tnbexplorer.com/tnb/payment-request';

  const stringifyPayments = (payments: Payment[]) => {
    let accountNumbers = '';
    let amounts = '';
    let memos = '';

    const query = payments.forEach(({accountNumber, amount, memo}) => {
      if (accountNumber) {
        accountNumbers += accountNumber.concat(',');
        amounts += `${amount},`;
        memos += memo.concat(',');
      }
    });

    return `${PAYMENT_REQUEST_ADDRESS}?accountNumber=${accountNumbers.slice(0, -1)}&amount=${amounts.slice(
      0,
      -1,
    )}&memo=${memos.slice(0, -1)}`;
  };
  return (
    <PageContentsLayout>
      <Col span={24}>
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={(key) => {
            setActiveTabKey(key);
          }}
        >
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={paymentData}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
              footer={() => (
                <Row justify="space-between">
                  <Col>
                    <Button
                      onClick={handleAdd}
                      type="primary"
                      disabled={paymentData.length === 10}
                      ghost={paymentData.length === 10}
                      icon={<PlusOutlined />}
                    >
                      Add Payment Address
                    </Button>
                  </Col>
                  <Col>
                    Total:
                    <Typography.Text strong>
                      {' '}
                      {paymentData.reduce((acc, payment) => payment.amount + acc, 0)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>Limit: 10</Typography.Text>
                  </Col>
                </Row>
              )}
            />
          </Form>
          <br />

          {activeTabKey === 'payment-request' ? (
            <>
              <Typography.Title level={5}>
                {' '}
                Share the customized link or QR code below with others to complete the payment.
              </Typography.Title>
              <Row justify="center">
                <Col span={8} sm={24} md={8}>
                  <Qr width={250} text={stringifyPayments(paymentData)} />
                </Col>
                <Col sm={24} md={16}>
                  <Row>
                    <Col span={24}>
                      <Input.TextArea autoSize disabled value={stringifyPayments(paymentData)} />
                    </Col>
                    <Col span={24}>
                      <Button
                        block
                        onClick={async () => {
                          await navigator.clipboard.writeText(stringifyPayments(paymentData));
                          setCopied(true);
                        }}
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Space direction="vertical">
                <Typography.Text>Enter your Private Key to Send Coins</Typography.Text>
                <Typography.Text strong mark type="warning">
                  This website does not Store your Private Key
                </Typography.Text>
              </Space>
              <Input placeholder={'Enter your Private Key to Send Coins'} />
              <Button>Enter Key</Button>
            </>
          )}
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default PaymentRequest;
