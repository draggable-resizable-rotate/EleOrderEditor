import { ElementRect } from '@draggable-resizable-rotate/react-resizable-pro';
import { Position, Size } from '../components/Rnd';
type GuidePosition = Omit<
  ElementRect, 'x' | 'y' | 'width' | 'height'
> & {
  hCenter: number;
  vCenter: number;
}

export const H_POSITION_KEYS: Array<'top' | 'bottom' | 'vCenter'> = ['top', 'bottom', 'vCenter'];
export const V_POSITION_KEYS: Array<'left' | 'right' | 'hCenter'> = ['left', 'right', 'hCenter'];
const POSITION_KEYS = [...H_POSITION_KEYS, ...V_POSITION_KEYS];

export type GuideLineMap = {
  [key in keyof GuidePosition]: { start: number; end: number, distance: number } | undefined
}

export function findGuideLines(
  currentData: Position & Size,
  contrastDataList: Array<Position & Size>,
): GuideLineMap {
  const currentDataGuidePosition = formatPropsToGuidePosition(currentData);

  const guideLineMap: GuideLineMap = {
    // 水平方向
    'top': undefined,
    'bottom': undefined,
    'vCenter': undefined,
    // 垂直方向
    'left': undefined,
    'right': undefined,
    'hCenter': undefined
  };

  // 聚合一次
  contrastDataList.forEach((contrastData) => {
    const thisDataGuidePosition = formatPropsToGuidePosition(contrastData);
    const { left, right, top, bottom, vCenter, hCenter } = thisDataGuidePosition;
    // 三条水平线对比
    const hData = [top, bottom, vCenter];
    const vData = [left, right, hCenter];

    POSITION_KEYS.forEach((direction) => {
      let directionData: number[] = [];
      let minValueProperty: keyof GuidePosition = 'left';
      let maxValueProperty: keyof GuidePosition = 'left';
      if (H_POSITION_KEYS.includes(direction as any)) {
        directionData = hData;
        minValueProperty = 'left';
        maxValueProperty = 'right';
      }
      if (V_POSITION_KEYS.includes(direction as any)) {
        directionData = vData;
        minValueProperty = 'top';
        maxValueProperty = 'bottom';
      }

      // 能和 direction 重合
      if (directionData.includes(currentDataGuidePosition[direction])) {
        const guideLineMapDirectionData = guideLineMap[direction];
        if (guideLineMapDirectionData !== undefined) {
          // 水平方向的直线求最小left，和最大right
          Object.assign(guideLineMapDirectionData, {
            start: Math.min(thisDataGuidePosition[minValueProperty], guideLineMapDirectionData.start),
            end: Math.max(thisDataGuidePosition[maxValueProperty], guideLineMapDirectionData.end),
          });
        } else {
          guideLineMap[direction] = {
            start: Math.min(thisDataGuidePosition[minValueProperty], currentDataGuidePosition[minValueProperty]),
            end: Math.max(thisDataGuidePosition[maxValueProperty], currentDataGuidePosition[maxValueProperty]),
            distance: currentDataGuidePosition[direction]
          };
        }
      }
    });
  });

  return guideLineMap;
}

export function formatPropsToGuidePosition(props: Position & Size): GuidePosition {
  const { left, top, width, height } = props;
  return {
    left: left,
    right: left + width,
    top: top,
    bottom: top + height,
    hCenter: left + width / 2,
    vCenter: top + height / 2,
  };
}
