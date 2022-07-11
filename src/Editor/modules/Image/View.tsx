import React from 'react';
import { getModuleIdentifier, Identifier } from '../utils/getModuleIdentifier';
import { ImageModuleData } from './moduleClass';

export interface ImageViewProps {
  moduleData: ImageModuleData;
}

const ImageView: React.FC<ImageViewProps> = ({ moduleData }) => {
  const { src, opacity } = moduleData.props;

  return (
    <div
      {...getModuleIdentifier(moduleData, Identifier.View)}
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

export default ImageView;
