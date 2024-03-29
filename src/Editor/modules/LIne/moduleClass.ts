
import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import LineStyleForm from './StyleForm';
import LineView from './View';

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
export type LineProps = typeof LineInitProps;

// 横线的module data类型
export type LineModuleData = ModuleData<ModuleType.HLine | ModuleType.VLine, LineProps>;

type LineModuleClassType = ModuleClass<ModuleType.HLine | ModuleType.VLine, LineProps>

const LineModuleClass: LineModuleClassType = {
  info,
  viewComponent: LineView,
  initProps: { ...LineInitProps },
  propsKeys: Object.keys(LineInitProps) as Array<keyof LineProps>,
  resizeAxis: 'both',
  styleFormComponent: LineStyleForm,
};

export default LineModuleClass;


// 横线组件
export const HLineModuleClass: LineModuleClassType = {
  ...LineModuleClass,
  info: {
    ...LineModuleClass.info,
    nameZn: '水平线',
    name: ModuleType.HLine,
  },
  initProps: {
    ...LineInitProps,
    height: 1,
    width: BaseLongWidth,
  },
  resizeAxis: 'x',
};


// 竖线组件
export const VLineModuleClass: LineModuleClassType = {
  ...LineModuleClass,
  info: {
    ...LineModuleClass.info,
    nameZn: '垂直线',
    name: ModuleType.VLine,
  },
  initProps: {
    ...LineInitProps,
    height: BaseLongWidth,
    width: 1,
  },
  resizeAxis: 'y',
};
