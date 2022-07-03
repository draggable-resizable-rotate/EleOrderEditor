import { HandleStyles } from '@draggable-resizable-rotate/react-resizable-pro';
import { MAIN_COLOR } from '../../config';
import { Rect } from '@draggable-resizable-rotate/graphics';
import React from 'react';

const { RECT_APEX_ANGLE_DIRECTION, RECT_LINE_DIRECTION } = Rect;
// Resize 锚点的大小
const ResizeWidth = 5;

export const DefaultResizeStyle: React.CSSProperties = {
  position: 'absolute',
  width: `${ResizeWidth}px`,
  height: `${ResizeWidth}px`,
  border: `1px solid ${MAIN_COLOR}`,
  borderRadius: '1px',
};

// 顶角锚点元素的初始样式
export const ApexAngleHandleStyles = RECT_APEX_ANGLE_DIRECTION
  .reduce((preResult, value) => {
    const firstProperty = value.includes('top') ? 'top' : 'bottom';
    const secondProperty = (value).replace(firstProperty, '').toLowerCase();
    // eslint-disable-next-line no-param-reassign
    preResult[value] = {
      ...DefaultResizeStyle,
      [firstProperty]: -ResizeWidth / 2,
      [secondProperty]: -ResizeWidth / 2,
      background: '#fff',
    };
    return preResult;
  }, {} as unknown as HandleStyles);

// 四边锚点元素的初始样式
export const LineHandleStyles = RECT_LINE_DIRECTION.reduce((preResult, value) => {
  if (value === 'right' || value === 'left') {
    // eslint-disable-next-line no-param-reassign
    preResult[value] = {
      width: ResizeWidth,
      [value]: -ResizeWidth / 2,
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    preResult[value] = {
      height: ResizeWidth,
      [value]: -ResizeWidth / 2,
    };
  }

  return preResult;
}, {} as unknown as HandleStyles);


