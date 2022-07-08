import React from 'react';
import { DefaultResizeStyle } from '../RndModule/config';

// 四边 中间变换 元素渲染
const ResizerComponent = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <span
      style={{
        ...DefaultResizeStyle,
        background: '#ffffff',
      }}
    ></span>
  </div>
);

export default ResizerComponent;
