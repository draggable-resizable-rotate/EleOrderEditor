import { ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import TextViewComponent from './ViewComponent';


const BaseLongWidth = 25 * 3
const BaseShortWidth = 15 * 3

// 组件基础信息
const info = {
  name: 'text',
  nameZn: '文本',
};

// 文本水平的方向
export enum TextDirection {
  // 从左向右
  Left = 'ltr',
  // 从右向左
  Right = 'rtl'
}

// 文本朝向
export enum TextOrientation {
  Horizontal = 'initial',
  Vertical = 'vertical-rl'
}

// flex的对齐方式
export enum FlexAlign {
  Start = 'flex-start',
  Center = 'center',
  End = 'flex-end',
}

// 文本初始化属性
export const TextInitProps = {
  zIndex: 0,
  left: 100,
  top: 100,
  width: BaseLongWidth,
  height: BaseShortWidth,
  // 文本的文档流方向
  orientation: TextOrientation.Horizontal,
  opacity: 1,
  align: FlexAlign.Start,
  valign: FlexAlign.Start,
  rotate: 0,
  direction: TextDirection.Left,
  color: 'default',
  backgroundColor: 'default',
  fontFamily: 'default',
  fontSize: 8,
  fontWeight: 'normal',
  fontItatlic: false,
  fontUnderline: false,
  lineHeight: null,
  lineHeightUnit: 'mm',
  letterSpacing: 0,
  alias: '',
  value: '',
};

// 线的props
type TextProps = typeof TextInitProps;

const moduleClass: ModuleClass<TextProps> = {
  info,
  initProps: { ...TextInitProps },
  propsKeys: Object.keys(TextInitProps) as Array<keyof TextProps>,
  viewComponent: TextViewComponent,
  resizeAxis: 'both',
};

export default moduleClass;

// 横线的moudle data类型
export type TextModuleData = ModuleData<ModuleType.HLine | ModuleType.VLine, TextProps>;

export const HTextModuleClass: ModuleClass<TextProps> = {
  ...moduleClass,
  initProps: {
    ...TextInitProps,
    orientation: TextOrientation.Horizontal,
    width: BaseLongWidth,
    height: BaseShortWidth,
  },
};

export const VTextModuleClass: ModuleClass<TextProps> = {
  ...moduleClass,
  initProps: {
    ...TextInitProps,
    orientation: TextOrientation.Horizontal,
    width: BaseShortWidth,
    height: BaseLongWidth,
  },
};
