import { ElementRect } from '@draggable-resizable-rotate/react-resizable-pro';
import { Position, Size } from './index';

export type Box = Pick<ElementRect, 'left' | 'right' | 'top' | 'bottom'>

// 判断两个水平矩形是否相交
export const boxesIntersect = (boxA: Box, boxB: Box) => boxA.left <= boxB.right
  && boxA.right >= boxB.left
  && boxA.top <= boxB.bottom
  && boxA.bottom >= boxB.top;

// 根据size和position创建Box
export function createBox(position: Position, size: Size) {
  return {
    ...position,
    right: position.left + size.width,
    bottom: position.top + size.height,
  }
}
