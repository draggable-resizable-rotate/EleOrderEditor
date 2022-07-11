import { GroupModuleType, ModuleClass, ModuleData, ModuleType } from '../TypeConstraints';
import QRCodeConfigForm, { QRCodeConfigFormProps } from './ConfigForm';
import QRCodeView, { QRCodeViewProps } from './View';

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

const QRCodeModuleClass: ModuleClass<QRCodeProps, QRCodeViewProps, QRCodeConfigFormProps> = {
  info,
  viewComponent: QRCodeView,
  configFormComponent: QRCodeConfigForm,
  initProps: { ...QRCodeInitProps },
  resizeAxis: 'both',
  propsKeys: Object.keys(QRCodeInitProps) as Array<keyof QRCodeProps>,
  lockAspectRatio: true,
};

export default QRCodeModuleClass;

// 横线的moudle data类型
export type QRCodeModuleData = ModuleData<ModuleType.QRCode, QRCodeProps>;
