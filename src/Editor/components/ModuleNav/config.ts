import { GraphicSvg, HLineSvg, HTextSvg, TextSvg, VLineSvg, VTextSvg, RectSvg, ImageSvg, CodeSvg, QRCodeSvg } from '@/Editor/assets/icon';
import { ModuleType } from '@/Editor/modules/TypeConstraints';
import React from 'react';

export enum MainCategoryName {
  Text = 'text',
  Graphic = 'graphic',
  Image = 'image',
  Code = 'code'
}


// 默认的展示 菜单项的顺序
export const defaultShowCategoryArr = [
  MainCategoryName.Text,
  MainCategoryName.Graphic,
  MainCategoryName.Image,
  MainCategoryName.Code,
];


export interface Category {
  title: string;
  key: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: Category[];
}

// 文本菜单
export const TextCategory: Category = {
  title: '文本',
  key: MainCategoryName.Text,
  icon: TextSvg,
  children: [
    {
      title: '横排文本',
      key: ModuleType.HText,
      icon: HTextSvg,
    },
    {
      title: '竖排文本',
      key: ModuleType.VText,
      icon: VTextSvg,
    },
  ],
};

// 图形菜单
export const GraphicCategory: Category = {
  key: MainCategoryName.Graphic,
  title: '图形',
  icon: GraphicSvg,
  children: [
    {
      title: '垂直线',
      key: ModuleType.VLine,
      icon: VLineSvg,
    },
    {
      title: '水平线',
      key: ModuleType.HLine,
      icon: HLineSvg,
    },
    {
      title: '矩形',
      key: ModuleType.Rect,
      icon: RectSvg,
    },
    // {
    //   title: '表格',
    //   key: 'table',
    //   icon: TableSvg,
    // },
  ],
};

// 图片菜单
export const ImageCategory: Category = {
  key: MainCategoryName.Image,
  title: '图片',
  icon: ImageSvg,
};

// 码菜单
export const QRCodeCategory: Category = {
  key: MainCategoryName.Code,
  title: '二维码',
  icon: CodeSvg,
  children: [
    {
      title: '二维码',
      key: ModuleType.QRCode,
      icon: QRCodeSvg,
    },
  ],
};


// 菜单项的映射
export const CategoryMap: {
  [key: string]: Category
} = {
  [MainCategoryName.Text]: TextCategory,
  [MainCategoryName.Graphic]: GraphicCategory,
  [MainCategoryName.Image]: ImageCategory,
  [MainCategoryName.Code]: QRCodeCategory,
};
