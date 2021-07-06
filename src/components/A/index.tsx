import React, {FC} from 'react';

import {Link} from 'react-router-dom';

const A: FC<{newWindow?: boolean; href: string}> = ({newWindow, href, children}) => {
  const rel = newWindow ? 'noreferrer' : undefined;
  const target = newWindow ? '_blank' : '_self';
  return href.startsWith('http') ? (
    <a rel={rel} target={target} href={href}>
      {children}
    </a>
  ) : (
    <Link to={href}>{children}</Link>
  );
};

export default A;
