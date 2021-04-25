import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Breadcrumb, Layout as AntDLayout, Row} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {isElementAccessExpression} from 'typescript';

const PageContentsLayout: FC = ({children}) => {
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
      <Breadcrumb.Item href={getHref(0)}>
        <HomeFilled />
      </Breadcrumb.Item>,
    ];

    const validUrls = ['account', 'trace-transactions'];

    console.log({url});
    if (url.length > 2) {
      for (let i = 1; i < url.length; i += 1) {
        if (url[i].length > 0) {
          if (validUrls.includes(url[i])) {
            breadCrumbItems.push(
              <Breadcrumb.Item href={getHref(i)}>{url[i].charAt(0).toUpperCase() + url[i].slice(1)}</Breadcrumb.Item>,
            );
          } else {
            breadCrumbItems[breadCrumbItems.length - 1] = (
              <Breadcrumb.Item href={getHref(i)}>
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
    console.log(breadCrumbs.length);
    if (breadCrumbs.length > 1) setBreadCrumb(breadCrumbs);
  }, [getBreadCrumbItems]);

  return (
    <>
      {breadCrumb ? (
        <>
          <Breadcrumb style={{padding: '20px 0px'}}>{breadCrumb}</Breadcrumb>

          <Row gutter={[20, 30]}>{children}</Row>
        </>
      ) : (
        <Row style={{paddingTop: '50px'}} gutter={[20, 30]}>
          {children}
        </Row>
      )}
    </>
  );
};
export default PageContentsLayout;
