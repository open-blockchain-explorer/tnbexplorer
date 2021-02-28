import React, {FC} from 'react';
import {Space, Typography} from 'antd';

const BannerLink: FC<{iconColor: string; link: string; text: string}> = ({iconColor, link, text}) => {
  return (
    <a rel="noreferrer" target="_blank" href={link}>
      <Space style={{lineHeight: '15px', margin: '0px', padding: '0px'}}>
        <div style={{backgroundColor: iconColor, borderRadius: '50%', height: '10px', width: '10px'}} />
        <Typography.Text style={{color: 'white'}}>{text}</Typography.Text>
      </Space>
    </a>
  );
};

export default BannerLink;
