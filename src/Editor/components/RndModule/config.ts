import { HandleComponent, HandleStyles } from '@draggable-resizable-rotate/react-resizable-pro';
import { MAIN_COLOR } from '../../config';
import { Rect } from '@draggable-resizable-rotate/graphics';
import React from 'react';
import { ModuleClass } from '@/Editor/modules/TypeConstraints';
import { ResizeEnable } from '../Rnd';
import ModuleResizer from '../ModuleResizer';

const { RECT_APEX_ANGLE_DIRECTION, RECT_LINE_DIRECTION, RECT_DIRECT } = Rect;
// Resize 锚点的大小
const ResizeWidth = 5;

// 默认的样式
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


// 通过resizeAxis获取要渲染的变换锚点
export function getEnableByResizeAxis(resizeAxis: ModuleClass<unknown>['resizeAxis']) {
  const axis = resizeAxis;
  const defaultResizing = RECT_DIRECT.reduce((preResult, position) => {
    // eslint-disable-next-line no-param-reassign
    preResult[position] = false;
    return preResult;
  }, {} as any);

  if (!axis || axis === 'both') return true;
  switch (axis) {
    case 'none':
      return false;
    case 'x': {
      defaultResizing.right = true;
      defaultResizing.left = true;
      break;
    }
    case 'y': {
      defaultResizing.top = true;
      defaultResizing.bottom = true;
      break;
    }
  }
  return defaultResizing as ResizeEnable;
}

// 自定义 四边中间 变换 组件
export const ResizeHandleComponent = RECT_LINE_DIRECTION.reduce((preResult, position) => {
  // eslint-disable-next-line no-param-reassign
  preResult[position] = React.createElement(ModuleResizer);
  return preResult;
}, {} as unknown as HandleComponent);
