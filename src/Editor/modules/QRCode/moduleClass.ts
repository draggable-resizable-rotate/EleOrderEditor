import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import QRCodeConfigForm from './ConfigForm';
import QRCodeStyleForm from './StyleForm';
import QRCodeView from './View';

const BaseLongWidth = 25 * 3;
// const BaseShortWidth = 25 * 3

// 组件基础信息
const info = {
  nameZn: '二维码',
  name: ModuleType.QRCode,
  groupType: GroupModuleType.QRCode
};

export const QRCodeInitProps = {
  zIndex: 0,
  left: 5,
  top: 5,
  width: BaseLongWidth,
  height: BaseLongWidth,
  value: '',
  // 码式，当前暂时只支持 qrcode
  type: 'qrcode',
  // 备用属性
  primary: '',
  mode: '',
  rotation: 0,
};

type QRCodeProps = typeof QRCodeInitProps;
// 横线的module data类型
export type QRCodeModuleData = ModuleData<ModuleType.QRCode, QRCodeProps>;


const QRCodeModuleClass: ModuleClass<ModuleType.QRCode, QRCodeProps> = {
  info,
  viewComponent: QRCodeView,
  configFormComponent: QRCodeConfigForm,
  initProps: { ...QRCodeInitProps },
  resizeAxis: 'both',
  propsKeys: Object.keys(QRCodeInitProps) as Array<keyof QRCodeProps>,
  lockAspectRatio: true,
  styleFormComponent: QRCodeStyleForm,
};

export default QRCodeModuleClass;

