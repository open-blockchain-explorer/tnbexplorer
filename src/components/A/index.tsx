import React, {FC} from 'react';
import {Link, LinkProps} from 'react-router-dom';

import {useChainPath} from 'hooks';

interface ComponentProps {
  newWindow?: boolean;
  href: string;
  network?: 'tnb' | 'testnet';
}

type AnchorProps = ComponentProps & Partial<LinkProps>;

const formatHref = (href: string, network: string) => {
  if (href.startsWith('/')) {
    return href;
  } else if (href.startsWith('./')) {
    const arr = window.location.pathname.split('/');
    arr.pop();
    arr.push(href.slice(2));
    return arr.join('/');
  }
  return `/${network}/${href}`;
};

const A: FC<AnchorProps> = ({newWindow, href, network, children, ...props}) => {
  const chain = useChainPath();

  const rel = newWindow ? 'noreferrer' : undefined;
  const target = newWindow ? '_blank' : '_self';
  return href.startsWith('http') ? (
    <a rel={rel} target={target} href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link {...props} to={formatHref(href, network ?? chain.slice(1))}>
      {children}
    </Link>
  );
};

export default A;
