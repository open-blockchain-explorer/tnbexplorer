import React, {FC, ReactNode, useEffect, useState} from 'react';
import QrCode from 'qrcode';

interface QrProps {
  className?: string;
  margin?: number;
  text: string;
  width?: number;
}

const Qr: FC<QrProps> = ({margin = 1, text, width, className}) => {
  const [qr, setQr] = useState<ReactNode | null>(null);

  useEffect(() => {
    const generateQR = async (): Promise<void> => {
      const url = await QrCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin,
      });
      setQr(<img alt="QR Code" src={url} className={className} style={{width: width ?? '100%'}} />);
    };

    generateQR();
  }, [margin, text, width, className]);

  return <>{qr}</>;
};

export default Qr;
