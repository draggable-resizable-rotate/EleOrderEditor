import React from 'react';
import { QRCodeModuleData } from './moduleClass';
import QRCode from 'qrcode.react';
import { getModuleIdentifier, Identifier } from '../utils/getModuleIdentifier';

interface Props {
  moduleData: QRCodeModuleData;
}

const QRCodeViewComponent: React.FC<Props> = ({ moduleData }) => {
  const { width, height, value } = moduleData.props;
  return (
    <div
      {...getModuleIdentifier(moduleData, Identifier.View)}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <QRCode value={value} size={Math.min(width, height)} />
    </div>
  );
};

export default QRCodeViewComponent;
