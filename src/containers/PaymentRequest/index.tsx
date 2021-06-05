import React, {useEffect, useState} from 'react';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Grid from 'antd/es/grid';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Modal from 'antd/es/modal';
import Row from 'antd/es/row';
import Popconfirm from 'antd/es/popconfirm';
import Popover from 'antd/es/popover';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Statistic from 'antd/es/statistic';
import Typography from 'antd/es/typography';
import {Rule} from 'rc-field-form/lib/interface';
import {nanoid} from 'nanoid';

import MoreOutlined from '@ant-design/icons/MoreOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import {PageContentsLayout, Qr} from 'components';
import {usePaymentParams} from 'hooks';
import {EditableCell} from './EditableCell';
// import { responsiveWidth } from 'utils/responsive';

// declare let tnb_keysign: {
//   requestTransfer: (
//     to: string,
//     amount: number,
//     memo?: string,
//     callback?: (res: any) => any,
//     bank?: string,
//     code?: string,
//   ) => any;
// };

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

  // xs screen
  const [showEditModal, setShowEditModal] = useState(false);

  const paymentsTotal = paymentData.reduce((acc, payment) => payment.amount + acc, 0);
  const isMakingPayment = initialPayments.length > 0;
  useEffect(() => {
    setCopied(false);
  }, [paymentData]);

  const isEditing = (record: Payment) => record.key === editingKey;

  const edit = (record: Partial<Payment> & {key: React.Key}) => {
    if (screens.xs) {
      setShowEditModal(true);
    }
    form.setFieldsValue({accountNumber: '', amount: '', memo: '', ...record});
    setEditingKey(record.key);
  };

  const editByModal = (record: Partial<Payment> & {key: React.Key}) => {
    form.setFieldsValue({accountNumber: '', amount: '', memo: '', ...record});
    setEditingKey(record.key);
    setShowEditModal(true);
  };

  const cancel = () => {
    if (paymentData.length) {
      if (paymentData[paymentData.length - 1].accountNumber === '') {
        const dataCpy = [...paymentData];
        dataCpy.pop();
        setPaymentData(dataCpy);
      }
    }

    setEditingKey('');

    if (showEditModal) setShowEditModal(false);
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
      } else {
        newData.push(row);
      }

      setPaymentData(() => newData);
      setEditingKey(() => '');
      if (screens.xs) setShowEditModal(false);
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

    if (!screens.xs) {
      if (paymentData.length > 0) {
        if (paymentData[paymentData.length - 1].accountNumber === '') return;
        const prevData = paymentData[paymentData.length - 1];
        newData = {...prevData, key: nanoid(), accountNumber: ''};
      }
      setPaymentData([...paymentData, {...newData, amount: 0, memo: ''}]);
      edit(newData);
    } else {
      editByModal(newData);
    }
  };

  const columns: any[] = [
    {
      title: '',
      dataIndex: '',
      width: '20px',
      render: (_: any, record: Payment) => {
        const beingEditedInTable = isEditing(record) && !screens.xs;
        return beingEditedInTable ? (
          <Space direction="vertical">
            <Button onClick={() => save(record.key)} style={{marginRight: 8}}>
              Save
            </Button>

            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <>
            <Popover
              placement="right"
              trigger="focus"
              content={
                <>
                  <Button block type="text" disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Edit
                  </Button>

                  <Popconfirm title="Sure you want to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button type="text" block disabled={editingKey !== ''}>
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              }
            >
              <Button type="text" shape="circle" icon={<MoreOutlined />} />
            </Popover>
          </>
        );
      },
    },
    {
      dataIndex: 'accountNumber',
      title: 'Recipient Address',
      width: '40%',
      editable: true,
      render: (text: string) => (
        <Typography.Text copyable style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Typography.Text>
      ),
    },
    {
      align: 'right' as const,
      dataIndex: 'amount',
      title: 'Amount (TNBC)',
      width: '20%',
      editable: true,
      render: (coins: number) => <Typography.Text>{coins.toLocaleString()}</Typography.Text>,
    },
    {
      dataIndex: 'memo',
      title: 'Memo',
      editable: true,
      render: (text: string) => (
        <Typography.Text style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>{text}</Typography.Text>
      ),
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
          const duplicate = paymentData.find(
            (payment) => value === payment.accountNumber && payment.key !== editingKey,
          );
          console.log({recipient: value, duplicate});
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
        editing: isEditing(record) && !screens.xs,
        rules: validationRules[col.dataIndex],
      }),
    };
  });

  const {protocol, host} = window.location;
  const PAYMENT_REQUEST_ADDRESS = `${protocol}//${host}/tnb/payment-request`;

  const stringifyPayments = (payments: Payment[]) => {
    let accountNumbers = '';
    let amounts = '';
    let memos = '';

    const query = payments.forEach(({accountNumber, amount, memo}) => {
      if (accountNumber) {
        accountNumbers += accountNumber.concat(',');
        amounts += `${amount},`;
        memos += memo.trim().replaceAll(' ', '%20').concat(',');
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
        <Card>
          <Row gutter={[30, 30]} justify="center" align="bottom" style={{padding: '10px'}}>
            {isMakingPayment && (
              <>
                {Boolean((window as any).keysign) && (
                  <Col span={24}>
                    <Typography.Text strong type="danger">
                      You Don't have Keysign installed
                    </Typography.Text>
                    <br />
                    Install keysign to complete this payment:
                    <br />
                    <Button
                      type="link"
                      target="blank"
                      href="https://chrome.google.com/webstore/detail/keysign/icgabofdocpmhlcamjijifghkijnccbo"
                    >
                      On Google Chrome (or Chromium Based Browsers):
                    </Button>
                    <br />
                    <Button type="link" target="blank" href="https://addons.mozilla.org/en-US/firefox/addon/keysign">
                      On Firefox{' '}
                    </Button>
                  </Col>
                )}

                <Col>
                  <Statistic title="Recipients" value={paymentData.length} />
                </Col>
                <Col>
                  <Statistic title="Payments Total" value={paymentsTotal} />
                </Col>
                <Col>
                  <Button
                    shape="round"
                    size="large"
                    disabled={Boolean((window as any).keysign)}
                    onClick={() => {
                      const keysign = (window as any).tnb_keysign;
                      if (keysign) {
                        keysign.requestHandshake((res: any) => console.log('Keysign is installed!', res));
                        keysign.requestTransfer(
                          'e91f8cb818171455b3a0077fe770b291f2fc83a42c38f239fbf39795aa87e9b6',
                          10,
                          'Processed by Yung TJ',
                          (res: any) => console.log(res),
                          ' http://54.177.121.3',
                          'randomly generated one time code',
                        );
                      }
                    }}
                  >
                    Pay with
                    <img
                      alt="Keysign"
                      width="100px"
                      src="https://camo.githubusercontent.com/a7cbb9ebdc8f2ae3f48b2ec69403d5f8658829cec0a7428b7b9c5dcbff456011/68747470733a2f2f692e696d6775722e636f6d2f485748553250742e706e67"
                    />
                  </Button>
                </Col>
              </>
            )}

            <Col span={24}>
              <Typography.Title level={5}>
                {isMakingPayment ? 'Detailed view of payments' : 'Set up and share payment request'}
              </Typography.Title>

              <Modal
                title="New Payment"
                centered
                visible={showEditModal}
                okText="Save"
                onOk={() => save(editingKey)}
                onCancel={cancel}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    name={'accountNumber'}
                    label="Recipient Address"
                    validateStatus="success"
                    style={{margin: 0}}
                    rules={validationRules.accountNumber}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={'amount'}
                    label="Amount"
                    validateStatus="success"
                    style={{margin: 0}}
                    rules={validationRules.amount}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name={'memo'}
                    label="Memo"
                    validateStatus="success"
                    style={{margin: 0}}
                    rules={validationRules.memo}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Modal>
              <Form form={form}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  style={{padding: '0px'}}
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
                        <Typography.Text>Limit: 10</Typography.Text>
                      </Col>
                    </Row>
                  )}
                />
              </Form>
            </Col>

            {!isMakingPayment && (
              <>
                <Col>
                  <Statistic title="Recipients" value={paymentData.length} />
                </Col>
                <Col>
                  <Statistic title="Payments Total" value={paymentsTotal} />
                </Col>

                <Col span={24}>
                  <Typography.Title level={5}>
                    {' '}
                    Share the customized link or QR code below with others to complete the payment.
                  </Typography.Title>
                  <Row justify="center">
                    <Col md={8}>
                      <Qr width={250} text={stringifyPayments(paymentData)} />
                    </Col>
                    <Col span={24} md={16}>
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
                </Col>
              </>
            )}
          </Row>
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default PaymentRequest;
