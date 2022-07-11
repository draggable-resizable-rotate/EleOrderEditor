import React from 'react';
import { getModuleIdentifier, Identifier } from '../utils/getModuleIdentifier';
import { RectModuleData } from './moduleClass';

export interface RectViewProps {
  moduleData: RectModuleData;
}

const RectView: React.FC<RectViewProps> = ({ moduleData }) => {
  const { lineWidth, lineType, fillColor } = moduleData.props;

  return (
    <div
      {...getModuleIdentifier(moduleData, Identifier.View)}
      style={{
        width: '100%',
        height: '100%',
        border: `${lineWidth}pt ${lineType} black`,
        backgroundColor: fillColor || 'transparent',
      }}
    ></div>
  );
};

export default RectView;
