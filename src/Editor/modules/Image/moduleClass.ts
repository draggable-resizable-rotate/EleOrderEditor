import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import ImageStyleForm from './StyleForm';
import ImageView from './View';

const BaseLongWidth = 25 * 3;

// 组件基础信息
const info = {
  nameZn: '图片',
  name: GroupModuleType.Image,
  groupType: GroupModuleType.Image,
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
// 横线的moudle data类型
export type ImageModuleData = ModuleData<ModuleType.Image, ImageProps>;

const ImageModuleClass: ModuleClass<ModuleType.Image, ImageProps> = {
  info,
  viewComponent: ImageView,
  initProps: { ...ImageInitProps },
  propsKeys: Object.keys(ImageInitProps) as Array<keyof ImageProps>,
  resizeAxis: 'both',
  styleFormComponent: ImageStyleForm
};

export default ImageModuleClass;


