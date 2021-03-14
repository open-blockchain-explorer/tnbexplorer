import React from 'react';
import {Alert} from 'antd';

const TestnetAlertMessage = () => {
  return (
    <Alert
      message="Displaying Testnet Chain"
      description="Testnet is an alternative blockchain that developers use for testing. 
            Testnet coins do not hold any value. Developers use testnet to experiment with the blockchain without using real coins or worrying about breaking the main chain."
      type="info"
      showIcon
    />
  );
};

export default TestnetAlertMessage;
