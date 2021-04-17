import React, {FC, ReactNode, useEffect, useState} from 'react';
import QrCode from 'qrcode';

interface QrProps {
  className?: string;
  margin?: number;
  text: string;
  width?: number;
}

const Qr: FC<QrProps> = ({margin = 1, text, width = 140}) => {
  const [qr, setQr] = useState<ReactNode | null>(null);

  useEffect(() => {
    const generateQR = async (): Promise<void> => {
      const url = await QrCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin,
        width,
      });
      setQr(<img alt="QR Code" src={url} />);
    };

    generateQR();
  }, [margin, text, width]);

  return <>{qr}</>;
};

export default Qr;
