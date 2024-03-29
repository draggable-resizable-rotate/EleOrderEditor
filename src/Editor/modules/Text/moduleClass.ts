import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import TextView from './View';
import TextConfigForm from './ConfigForm';
import TextStyleForm from './StyleForm';

const BaseLongWidth = 25 * 3;
const BaseShortWidth = 15 * 3;

// 组件基础信息
const info = {
  name: GroupModuleType.Text,
  nameZn: '文本',
  groupType: GroupModuleType.Text
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
  Vertical = 'vertical-lr'
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
  vAlign: FlexAlign.Start,
  rotate: 0,
  direction: TextDirection.Left,
  color: '#000000',
  backgroundColor: '#ffffff',
  fontFamily: 'SimHei',
  fontSize: 8,
  fontWeight: 'normal',
  fontItalic: false,
  fontUnderline: false,
  lineHeight: null,
  letterSpacing: 0,
  alias: '',
  value: '',
};

// 线的props
type TextProps = typeof TextInitProps;
type TextModuleClassType = ModuleClass<ModuleType.HText | ModuleType.VText, TextProps>
// 横线的module data类型
export type TextModuleData = ModuleData<ModuleType.HText | ModuleType.VText, TextProps>;

const TextModuleClass: TextModuleClassType = {
  info,
  initProps: { ...TextInitProps },
  propsKeys: Object.keys(TextInitProps) as Array<keyof TextProps>,
  viewComponent: TextView,
  resizeAxis: 'both',
  configFormComponent: TextConfigForm,
  styleFormComponent: TextStyleForm,
};

export default TextModuleClass;

export const HTextModuleClass: TextModuleClassType = {
  ...TextModuleClass,
  initProps: {
    ...TextInitProps,
    orientation: TextOrientation.Horizontal,
    width: BaseLongWidth,
    height: BaseShortWidth,
  },
  info: {
    ...TextModuleClass.info,
    name: ModuleType.HText,
    nameZn: '横向文本'
  }
};

export const VTextModuleClass: TextModuleClassType = {
  ...TextModuleClass,
  initProps: {
    ...TextInitProps,
    orientation: TextOrientation.Vertical,
    width: BaseShortWidth,
    height: BaseLongWidth,
  },
  info: {
    ...TextModuleClass.info,
    name: ModuleType.VText,
    nameZn: '竖向文本'
  }
};
