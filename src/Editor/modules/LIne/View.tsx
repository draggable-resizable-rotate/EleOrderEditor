import React, { CSSProperties } from 'react';
import { ModuleType } from '../TypeConstraints';
import { getModuleIdentifier, Identifier } from '../utils/getModuleIdentifier';
import { LineModuleData } from './moduleClass';

export interface LineViewProps {
  moduleData: LineModuleData;
}

const LineView: React.FC<LineViewProps> = ({ moduleData }) => {
  const { type, props: propsData } = moduleData;
  const { lineType, lineWidth } = propsData;
  const style: CSSProperties = {};
  if (type === ModuleType.VLine) {
    style.borderLeft = `${lineWidth}pt ${lineType} black`;
  } else {
    style.borderTop = `${lineWidth}pt ${lineType} black`;
  }
  return (
    <div
      {...getModuleIdentifier(moduleData, Identifier.View)}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    ></div>
  );
};

export default LineView;
