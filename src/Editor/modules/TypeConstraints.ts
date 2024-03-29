/**
 * Module的类型约束文件
 */
import { DraggableProps } from '@draggable-resizable-rotate/react-draggable-pro';
import React from 'react';
import { ImageModuleData } from './Image/moduleClass';
import { LineModuleData } from './LIne/moduleClass';
import { QRCodeModuleData } from './QRCode/moduleClass';
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

export interface ModuleClass<ModuleType, PropsType extends object = Record<string, unknown>> {
  info: ModuleClassInfo;
  // 被可拖拽、变换、旋转组件包裹的展示的组件内容
  viewComponent: React.FC<{
    moduleData: ModuleData<ModuleType, PropsType>;
  }>;
  configFormComponent?: React.FC<{
    moduleData: ModuleData<ModuleType, PropsType>;
    onChange: (changeValues: ConfigFormValue) => any;
  }>;
  styleFormComponent: React.FC<{
    mergeModuleDataProps: PropsType;
    onChange: (changeValues: StyleFormValue) => any;
  }>;
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
  Table = 'table',
};

// 分组的type
export enum GroupModuleType {
  Line = 'line',
  Text = 'text',
  Rect = 'rect',
  Image = 'image',
  QRCode = 'QR-code',
  Table = 'table',
}

export type StoreModuleData = LineModuleData | TextModuleData | RectModuleData | QRCodeModuleData | ImageModuleData;


export type StyleFormValue = {
  [key in GroupModuleType]: Partial<StoreModuleData['props']>;
}


export type ConfigFormValue = {
  [key: string]: Partial<StoreModuleData['props']>;
}
