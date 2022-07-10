import React from 'react';
import { ImageModuleData } from './moduleClass';

interface Props {
  moduleData: ImageModuleData;
}

const ImageViewComponent: React.FC<Props> = ({ moduleData }) => {
  const { src, opacity } = moduleData.props;

  return (
    <div
      className="image"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: opacity,
      }}
    >
      <img draggable="false" style={{ width: '100%', height: '100%' }} src={src} />
    </div>
  );
};

export default ImageViewComponent;
