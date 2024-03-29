
import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import RectStyleForm from './StyleForm';
import RectViewComponent from './ViewComponent';

const BaseLongWidth = 25 * 3;
// const BaseShortWidth = 25 * 3

// 组件基础信息
const info = {
  name: ModuleType.Rect,
  nameZn: '矩形',
  groupType: GroupModuleType.Rect
};

export const RectInitProps = {
  zIndex: 0,
  left: 5,
  top: 5,
  width: BaseLongWidth,
  height: BaseLongWidth,
  lineColor: '#fff',
  lineWidth: 1,
  lineType: 'solid',
  fillColor: '',
};

// 线的props
type RectProps = typeof RectInitProps;

// 横线的module data类型
export type RectModuleData = ModuleData<ModuleType.Rect, RectProps>;

const RectModuleClass: ModuleClass<ModuleType.Rect, RectProps> = {
  info,
  initProps: { ...RectInitProps },
  propsKeys: Object.keys(RectInitProps) as Array<keyof RectProps>,
  viewComponent: RectViewComponent,
  styleFormComponent: RectStyleForm,
  resizeAxis: 'both',
};

export default RectModuleClass;

