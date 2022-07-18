import { FormProps } from 'antd';

export const MAIN_COLOR = '#1890ff';

// 确定画拖拽选择框的面积
export const SURE_DRAG_SELECT_AREA = 4;

export const FormItemLayout: FormProps = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
  labelAlign: 'left',
};

export const TooltipConfig = {
  color: '#fff',
  overlayInnerStyle: {
    color: '#161A1F',
  },
};

// 默认的初始化 INIT_Z_INDEX
export const INIT_Z_INDEX = 0;
