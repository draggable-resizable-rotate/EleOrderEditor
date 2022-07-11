import { ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import ImageViewComponent from './ViewComponent';

const BaseLongWidth = 25 * 3;

// 组件基础信息
const info = {
  nameZn: '图片组件',
  name: 'image',
};

export const ImageInitProps = {
  zIndex: 0,
  left: 5,
  top: 5,
  width: BaseLongWidth,
  height: BaseLongWidth,
  src: '',
  opacity: 1,
  rotate: 0,
};

// 线的props
type ImageProps = typeof ImageInitProps;

const moduleClass: ModuleClass<ImageProps> = {
  info,
  viewComponent: ImageViewComponent,
  initProps: { ...ImageInitProps },
  propsKeys: Object.keys(ImageInitProps) as Array<keyof ImageProps>,
  resizeAxis: 'both',
};

export default moduleClass;

// 横线的moudle data类型
export type ImageModuleData = ModuleData<ModuleType.Image, ImageProps>;
