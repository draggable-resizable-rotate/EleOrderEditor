import { GraphicSvg, HLineSvg, HTextSvg, TextSvg, VLineSvg, VTextSvg, RectSvg, TableSvg, ImageSvg } from '@/Editor/assets/icon';
import React from 'react';

// 默认的展示 菜单项的顺序
export const defaultShowCategoryArr = ['text', 'graphic', 'image'];


export interface Category {
  title: string;
  key: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: Category[];
}

// 文本菜单
export const TextCategory: Category = {
  title: '文本',
  key: 'text',
  icon: TextSvg,
  children: [
    {
      title: '横排文本',
      key: 'h-text',
      icon: HTextSvg,
    },
    {
      title: '竖排文本',
      key: 'v-text',
      icon: VTextSvg,
    },
  ],
};

// 图形菜单
export const GraphicCategory: Category = {
  key: 'graphic',
  title: '图形',
  icon: GraphicSvg,
  children: [
    {
      title: '垂直线',
      key: 'v-line',
      icon: VLineSvg,
    },
    {
      title: '水平线',
      key: 'h-line',
      icon: HLineSvg,
    },
    {
      title: '矩形',
      key: 'rect',
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
  key: 'image',
  title: '图片',
  icon: ImageSvg,
};


// 菜单项的映射
export const CategoryMap: {
  [key: string]: Category
} = {
  text: TextCategory,
  graphic: GraphicCategory,
  image: ImageCategory,
};
