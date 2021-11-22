import React, {FC} from 'react';
import {Link, LinkProps} from 'react-router-dom';

import {useChainPath} from 'hooks';

type Network = 'tnb' | 'testnet';
interface ComponentProps {
  newWindow?: boolean;
  href: string;
  network?: Network;
}

type AnchorProps = ComponentProps & Partial<LinkProps>;

const formatHref = (href: string, network: Network) => {
  if (href.startsWith('/')) {
    return href;
  }

  if (href.startsWith('./')) {
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
    <Link {...props} to={formatHref(href, network ?? (chain.slice(1) as Network))}>
      {children}
    </Link>
  );
};

export default A;
