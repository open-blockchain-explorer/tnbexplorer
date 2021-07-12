import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import Breadcrumb from 'antd/es/breadcrumb';
import Modal from 'antd/es/modal';
import Row, {RowProps} from 'antd/es/row';
import Spin from 'antd/es/spin';

import HomeFilled from '@ant-design/icons/HomeFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

interface Props {
  loading?: boolean | string;
}

const PageContentsLayout: FC<RowProps & Props> = ({children, align, justify, gutter, loading}) => {
  const [breadCrumb, setBreadCrumb] = useState<ReactNode[]>();

  const getBreadCrumbItems = useCallback(() => {
    const url = window.location.pathname.slice(1).split('/');

    const getHref = (index: number) =>
      window.location.origin.concat('/') +
      url
        .slice(0, index + 1)
        .join('/')
        .concat('/');

    const breadCrumbItems: ReactNode[] = [
      <Breadcrumb.Item key={0} href={getHref(0)}>
        <HomeFilled />
      </Breadcrumb.Item>,
    ];

    const validUrls = ['account', 'trace-transactions', 'payment-request', 'faucet'];

    // console.log({url});
    if (url.length > 1) {
      for (let i = 1; i < url.length; i += 1) {
        if (url[i].length > 0) {
          if (validUrls.includes(url[i])) {
            breadCrumbItems.push(
              <Breadcrumb.Item key={i} href={getHref(i)}>
                {url[i].charAt(0).toUpperCase() + url[i].slice(1)}
              </Breadcrumb.Item>,
            );
          } else {
            breadCrumbItems[breadCrumbItems.length - 1] = (
              <Breadcrumb.Item key={i} href={getHref(i)}>
                {url[i - 1].charAt(0).toUpperCase() + url[i - 1].slice(1)}
              </Breadcrumb.Item>
            );
          }
        }
      }
    }
    return breadCrumbItems;
  }, []);

  useEffect(() => {
    const breadCrumbs = getBreadCrumbItems();
    // console.log(breadCrumbs.length);
    if (breadCrumbs.length > 1) setBreadCrumb(breadCrumbs);
  }, [getBreadCrumbItems]);

  return (
    <>
      <Modal
        bodyStyle={{backgroundColor: 'lightgray', padding: '40px', textAlign: 'center', fontWeight: 'bold'}}
        centered
        closable={false}
        visible={!!loading}
        footer={null}
      >
        <Spin
          indicator={<LoadingOutlined />}
          size="large"
          tip={!!loading && typeof loading === 'string' ? loading : ''}
        />
      </Modal>

      {breadCrumb ? (
        <>
          <Breadcrumb style={{padding: '20px 0px'}}>{breadCrumb}</Breadcrumb>
          <Row
            align={align ?? 'top'}
            justify={justify ?? 'start'}
            gutter={gutter ?? [20, 30]}
            style={{paddingBottom: '50px'}}
          >
            {children}
          </Row>
        </>
      ) : (
        <Row
          align={align ?? 'top'}
          justify={justify ?? 'start'}
          gutter={gutter ?? [20, 30]}
          style={{paddingTop: '50px', paddingBottom: '50px'}}
        >
          {children}
        </Row>
      )}
    </>
  );
};
export default PageContentsLayout;
