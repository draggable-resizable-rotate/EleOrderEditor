import { Size } from '@/Editor/components/Rnd';
import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import TableConfigForm from './ConfigForm';
import TableStyleForm from './StyleForm';
import TableViewComponent from './ViewComponent';

// 一个文字大概是 3 mm
export const FONT_SIZE = 14;
export const MARGIN_SPACE = 1.5;
export const TD_HEIGHT = 20;

export interface TableModuleCol {
  value: string;
  alias: string;
  width: number;
  height: number;
}

// 初始的 cols
export const DEFAULT_COLS: TableModuleCol[] = (new Array(3)).fill(0)
  .map(() => ({
    value: '',
    alias: '',
    width: getTdWidthByFontCount(5),
    height: TD_HEIGHT,
  }));


// 组件基础信息
const info = {
  name: ModuleType.Rect,
  nameZn: '矩形',
  groupType: GroupModuleType.Table
};



export const TableInitProps = {
  zIndex: 0,
  left: 5,
  top: 5,
  value: '',
  cols: DEFAULT_COLS,
  // 计算初始化宽高
  ...calculateTableSizeByCols(DEFAULT_COLS, 2),
  hasBorder: true,
};


// 表格的props
export type TableProps = typeof TableInitProps;


// 横线的module data类型
export type TableModuleData = ModuleData<ModuleType.Table, TableProps>;


const TableModuleClass: ModuleClass<ModuleType.Table, TableProps> = {
  info,
  initProps: { ...TableInitProps },
  propsKeys: Object.keys(TableInitProps) as Array<keyof TableProps>,
  viewComponent: TableViewComponent,
  styleFormComponent: TableStyleForm,
  configFormComponent: TableConfigForm,
  resizeAxis: 'none',
};

export default TableModuleClass;

// 获取td应该展示的宽度，根据
export function getTdWidthByFontCount(count: number) {
  return FONT_SIZE * count + MARGIN_SPACE * 2;
}

// 通过cols计算table的size
export function calculateTableSizeByCols(cols: TableModuleCol[], rowLength: number) {
  const size: Size = {
    width: 0,
    height: 0,
  };

  return cols.reduce((prev, col) => {
    size.width = size.width + col.width;
    size.height = col.height * rowLength;
    return prev;
  }, size);
}
