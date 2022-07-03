import React from 'react';
import { RectModuleData } from './moduleClass';

interface Props {
  moduleData: RectModuleData;
}

const RectViewComponent: React.FC<Props> = ({ moduleData }) => {
  const { id } = moduleData;
  const { lineWidth, lineType, fillColor } = moduleData.props;

  return (
    <div
      id={`${id}-view`}
      style={{
        width: '100%',
        height: '100%',
        border: `${lineWidth}pt ${lineType} black`,
        backgroundColor: fillColor || 'transparent',
      }}
    ></div>
  );
};

export default RectViewComponent;
