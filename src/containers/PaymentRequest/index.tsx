import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Descriptions from 'antd/es/descriptions';
import Form, {Rule} from 'antd/es/form';
import Grid from 'antd/es/grid';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Modal from 'antd/es/modal';
import Row from 'antd/es/row';
import Popconfirm from 'antd/es/popconfirm';
import Tooltip from 'antd/es/tooltip';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import Statistic from 'antd/es/statistic';
import Typography from 'antd/es/typography';
import {nanoid} from 'nanoid';
import {useHistory} from 'react-router-dom';

import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import QrcodeOutlined from '@ant-design/icons/QrcodeOutlined';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

import {getConfirmationBlocks} from 'api/bank';
import {PageContentsLayout, Qr} from 'components';
import {BANK_URL} from 'constants/url';
import {usePaymentParams} from 'hooks';
import {Payment} from 'types/payment-request';
import {createPaymentsUrl} from 'utils/payment-request';
import {EditableCell} from './EditableCell';
// import { responsiveWidth } from 'utils/responsive';

const PaymentRequest = () => {
  const [keysign, setKeysign] = useState<any>(null);

  const waitForKeysign = () => {
    let keysignObj: any;
    let iterations = 0;
    console.time('waitForKeysign');
    const interval = setInterval(() => {
      iterations += 1;
      keysignObj = (window as any).tnb_keysign;
      if (keysignObj || iterations >= 3) {
        setKeysign(keysignObj);
        clearInterval(interval);
        console.timeEnd('waitForKeysign');
      }
    }, 1000);
  };

  useEffect(() => {
    waitForKeysign();
  }, []);

  const [keysignResult, setKeysignResult] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const initialPayments = usePaymentParams();
  const [paymentData, setPaymentData] = useState<Payment[]>(initialPayments);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const [copied, setCopied] = useState(false);
  const {useBreakpoint} = Grid;
  const screens = useBreakpoint();
  const history = useHistory();

  // for xs screen
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const paymentsTotal = paymentData.reduce((acc, payment) => payment.amount + acc, 0);
  const isMakingPayment = initialPayments.length > 0;

  useEffect(() => {
    setCopied(false);
  }, [paymentData]);

  const updateUrl = (data: Payment[]) => {
    if (initialPayments.length) {
      history.replace(createPaymentsUrl(data || paymentData));
    }
  };

  const isEditing = (record: Payment) => record.key === editingKey;

  const edit = (record: Partial<Payment>) => {
    if (screens.xs) {
      setShowEditModal(true);
    }
    form.setFieldsValue({recipient: '', amount: '', memo: '', ...record});
    setEditingKey(record.key as string);
  };

  const editByModal = (record: Partial<Payment>) => {
    form.setFieldsValue({recipient: '', amount: '', memo: '', ...record});
    setEditingKey(record.key as string);
    setShowEditModal(true);
  };

  const cancel = () => {
    if (paymentData.length) {
      if (paymentData[paymentData.length - 1].recipient === '') {
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
    updateUrl(filteredData);
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
      updateUrl(newData);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = async () => {
    let newData: Payment = {
      key: nanoid(),
      recipient: '',
      amount: 0,
      memo: 'Payment Request via Tnb Explorer',
    };

    if (paymentData.length > 0) {
      if (paymentData[paymentData.length - 1].recipient === '') return;
      const prevData = paymentData[paymentData.length - 1];
      newData = {...prevData, key: nanoid(), recipient: ''};
    }

    if (!screens.xs) {
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
            <Button onClick={() => save(record.key as string)} style={{marginRight: 8}}>
              Save
            </Button>

            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <>
            <Tooltip title="Edit" placement="left">
              <Button
                type="ghost"
                shape="circle"
                icon={<EditOutlined />}
                style={{border: 'none'}}
                onClick={() => edit(record)}
                disabled={editingKey !== ''}
              />
            </Tooltip>

            <Tooltip title="Delete" placement="left">
              <Popconfirm
                icon={<QuestionCircleOutlined style={{color: 'red'}} />}
                title={
                  <>
                    Are you sure you want to <br />
                    delete this transaction?
                  </>
                }
                onConfirm={() => handleDelete(record.key as string)}
              >
                <Button
                  type="ghost"
                  shape="circle"
                  disabled={editingKey !== ''}
                  icon={<DeleteOutlined />}
                  style={{border: 'none'}}
                />
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
    {
      dataIndex: 'recipient',
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
    recipient: [
      {len: 64, message: 'Length has to be 64'},
      {message: 'Must only contain hex values (a-f 0-9)', pattern: /^#?([a-f0-9]{1,})$/i},
      {
        required: true,
        message: 'Account Number is required',
      },
      {
        validator: (_, value) => {
          const duplicate = paymentData.find((payment) => value === payment.recipient && payment.key !== editingKey);
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

  const hrefPaymentUrl = useMemo(() => {
    const {protocol, host} = window.location;
    const websiteDomainName = `${protocol}//${host}`;

    return websiteDomainName.concat(createPaymentsUrl(paymentData));
  }, [paymentData]);

  const loadingMessage = () => {
    switch (paymentStatus) {
      case 'keysign':
        return 'Waiting For Keysign ...';
      case 'validating':
        return 'Valdating Transaction Block ...';
      default:
        return '';
    }
  };

  const viewPaymentResultModal = useCallback(() => {
    if (keysignResult !== null) {
      if (keysignResult.success) {
        Modal.success({
          title: 'Payments were sent successfully',
          content: (
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <br />
                <Descriptions bordered size="small" layout="vertical">
                  <Descriptions.Item label="Sender" span={24}>
                    <Row justify="space-between" gutter={[10, 10]}>
                      <Col span={24}>
                        <Typography.Text>{keysignResult?.result?.sender} </Typography.Text>
                      </Col>
                      <Col>
                        <Typography.Text>{keysignResult?.data?.from} Account</Typography.Text>
                      </Col>

                      <Col>
                        <Button href={`/tnb/account/${keysignResult?.result?.sender}`}>View Account</Button>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={24}>
                <Typography.Text strong>Payment Summary</Typography.Text>
                <Descriptions bordered layout="horizontal" size="small">
                  <Descriptions.Item
                    label="Amount"
                    labelStyle={{width: screens.xs || screens.sm ? '90px' : '120px'}}
                    contentStyle={{textAlign: 'right'}}
                    span={24}
                  >
                    {paymentsTotal}
                  </Descriptions.Item>
                  <Descriptions.Item label="Pv Fee" contentStyle={{textAlign: 'right'}} span={24}>
                    1
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank Fee" contentStyle={{textAlign: 'right'}} span={24}>
                    1
                  </Descriptions.Item>

                  <Descriptions.Item
                    style={{borderTop: '5px solid #f0f0f0'}}
                    contentStyle={{textAlign: 'right'}}
                    label="Total"
                    span={24}
                  >
                    {paymentsTotal + 2}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          ),
          centered: true,
          cancelText: 'Cancel',
          onOk: () => {
            setKeysignResult(null);
          },
        });
      } else {
        Modal.error({
          title: 'Payment failed to send',
          content: keysignResult.message || 'Payments Block Id could not be verified',
          centered: true,
          okText: 'Try Again!',
          cancelText: 'Cancel',
          onOk: () => {
            window.location.href = hrefPaymentUrl;
          },
        });
      }
    }
  }, [screens, hrefPaymentUrl, keysignResult, paymentsTotal]);

  useEffect(() => {
    viewPaymentResultModal();
  }, [viewPaymentResultModal]);

  return (
    <PageContentsLayout showBreadCrumb loading={loadingMessage()}>
      <Col span={24}>
        <Card>
          <Row gutter={[30, 30]} justify="center" align="bottom" style={{padding: '10px'}}>
            {isMakingPayment && (
              <>
                {keysign === undefined && (
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
                  <Statistic title="Total Volume" value={paymentsTotal} />
                </Col>
                <Modal
                  visible={showQrModal}
                  centered
                  closable
                  onCancel={() => setShowQrModal(false)}
                  footer={null}
                  bodyStyle={{width: '100%', padding: '30px'}}
                  title="Scan Payment Request Transactions"
                >
                  <Row justify="center" align="middle">
                    <Qr
                      text={JSON.stringify(paymentData.map(({recipient, amount, memo}) => ({recipient, amount, memo})))}
                      width={paymentData.length < 5 ? 250 + paymentData.length * 30 : undefined}
                    />
                  </Row>
                </Modal>
                <Col>
                  <Tooltip
                    title={
                      copied ? (
                        <>
                          Copied{' '}
                          <Typography.Text type="success">
                            <CheckOutlined />
                          </Typography.Text>{' '}
                        </>
                      ) : (
                        'Copy url'
                      )
                    }
                  >
                    <Button
                      shape="round"
                      size="large"
                      icon={<ShareAltOutlined />}
                      onClick={async () => {
                        await navigator.clipboard.writeText(hrefPaymentUrl);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 5000);
                      }}
                    >
                      Share
                    </Button>
                  </Tooltip>
                </Col>
                <Col>
                  <Button
                    icon={<QrcodeOutlined width="50px" />}
                    shape="round"
                    size="large"
                    onClick={() => setShowQrModal(true)}
                  >
                    Scan Transactions
                  </Button>
                </Col>
                <Col>
                  <Button
                    shape="round"
                    size="large"
                    disabled={!keysign}
                    onClick={() => {
                      setPaymentStatus('keysign');

                      keysign.requestTransfer(
                        paymentData.map(({recipient, amount, memo}) => ({to: recipient, amount, memo})),
                        async (res: any) => {
                          const {success, result: keysignBlock} = res;
                          let paymentIsSuccessful: boolean;
                          try {
                            if (success) {
                              setPaymentStatus('validating');
                              const {results: confirmationBlocks} = await getConfirmationBlocks(BANK_URL, {
                                limit: 20,
                                block: keysignBlock.id,
                              });

                              paymentIsSuccessful = confirmationBlocks.some((cb: any) => {
                                return keysignBlock.id === cb.block;
                              });
                            } else {
                              paymentIsSuccessful = false;
                            }
                          } catch {
                            paymentIsSuccessful = false;
                          }
                          setKeysignResult(() => ({
                            ...res,
                            success: paymentIsSuccessful,
                          }));
                          setPaymentStatus(() => '');
                        },
                        BANK_URL,
                      );
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
                    name={'recipient'}
                    label="Recipient Address"
                    validateStatus="success"
                    style={{margin: 0}}
                    rules={validationRules.recipient}
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
                  scroll={{x: 600}}
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
                      <Qr width={250} text={hrefPaymentUrl} />
                    </Col>
                    <Col span={24} md={16}>
                      <Row>
                        <Col span={24}>
                          <Input.TextArea autoSize disabled value={hrefPaymentUrl} />
                        </Col>
                        <Col span={24}>
                          <Button
                            block
                            onClick={async () => {
                              await navigator.clipboard.writeText(hrefPaymentUrl);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 5000);
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
