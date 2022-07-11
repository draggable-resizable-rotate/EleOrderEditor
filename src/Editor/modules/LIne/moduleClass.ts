
import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import LineViewComponent from './ViewComponent';

const BaseLongWidth = 25 * 3;
// const BaseShortWidth = 25 * 3

// 组件基础信息
const info = {
  nameZn: '线',
  name: GroupModuleType.Line,
  groupType: GroupModuleType.Line,
};

export const LineInitProps = {
  zIndex: 0,
  left: 5,
  top: 5,
  width: BaseLongWidth,
  height: 1,
  lineColor: '#000000',
  lineWidth: 1,
  lineType: 'solid',
};

// 线的props
type LineProps = typeof LineInitProps;

const moduleClass: ModuleClass<LineProps> = {
  info,
  viewComponent: () => null,
  initProps: { ...LineInitProps },
  propsKeys: Object.keys(LineInitProps) as Array<keyof LineProps>,
  resizeAxis: 'both',
};

export default moduleClass;

// 横线的moudle data类型
export type LineModuleData = ModuleData<ModuleType.HLine | ModuleType.VLine, LineProps>;

// 横线组件
export const HLineModuleClass: ModuleClass<LineProps> = {
  ...moduleClass,
  info: {
    ...moduleClass.info,
    nameZn: '水平线',
    name: ModuleType.HLine,
  },
  initProps: {
    ...LineInitProps,
    height: 1,
    width: BaseLongWidth,
  },
  viewComponent: LineViewComponent,
  resizeAxis: 'x',
};

// 横线组件
export const VLineModuleClass: ModuleClass<LineProps> = {
  ...moduleClass,
  info: {
    ...moduleClass.info,
    nameZn: '垂直线',
    name: ModuleType.VLine,
  },
  initProps: {
    ...LineInitProps,
    height: BaseLongWidth,
    width: 1,
  },
  viewComponent: LineViewComponent,
  resizeAxis: 'y',
};

