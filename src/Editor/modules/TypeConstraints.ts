/**
 * Module的类型约束文件
 */
import { DraggableProps } from '@draggable-resizable-rotate/react-draggable-pro';
import { LineModuleData } from './LIne/moduleClass';
import { RectModuleData } from './Rect/moduleClass';
import { TextModuleData } from './Text/moduleClass';

// 可缩放的属性
export type ResizeAxis = DraggableProps['axis'];

// 每个模块组件的类型
export type ModuleData<ModuleType, PropsType extends object = Record<string, unknown>> = {
  id: string;
  type: ModuleType;
  // 待定
  props: PropsType;
};

interface ModuleClassInfo {
  nameZn: string;
  name: string;
  groupType: GroupModuleType;
}

export interface ModuleClass<PropsType, ViewComponentProps, ConfigFormComponentProps = Record<string, unknown>> {
  info: ModuleClassInfo;
  // 被可拖拽、变换、旋转组件包裹的展示的组件内容
  viewComponent: React.FC<ViewComponentProps>;
  configFormComponent?: React.FC<ConfigFormComponentProps>;
  // 初始化属性
  initProps: PropsType;
  // 属性键
  propsKeys: Array<keyof PropsType>;
  // 允许缩放的方向
  resizeAxis: NonNullable<ResizeAxis>;
  lockAspectRatio?: boolean;
}

export enum ModuleType {
  // 线
  HLine = 'h-line',
  VLine = 'v-line',
  // 文本
  HText = 'h-text',
  VText = 'v-text',
  Rect = 'rect',
  Image = 'image',
  QRCode = 'QR-code',
};

// 分组的type
export enum GroupModuleType {
  Line = 'line',
  Text = 'text',
  Rect = 'rect',
  Image = 'image',
  QRCode = 'QR-code',
}

export type StoreModuleData = LineModuleData | TextModuleData | RectModuleData;
