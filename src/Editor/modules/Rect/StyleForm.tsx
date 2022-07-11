import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '../../config';
import { RectModuleData } from './moduleClass';
import StyleMemoForm from './StyleMemoForm';
import { GroupModuleType } from '../TypeConstraints';
import PositionForm from '@/Editor/components/PositionForm';

export interface RectConfigFormProps {
  mergeModuleDataProps: RectModuleData['props'];
}

const moduleType = GroupModuleType.Rect;

const RectConfigForm: React.FC<RectConfigFormProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  const { lineWidth, lineType, fillColor, left, top, width, height } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({
      [moduleType]: { lineWidth, lineType, fillColor, left, top, width, height },
    });
  }, [lineWidth, lineType, fillColor, form, left, top, width, height]);

  return (
    <Form form={form} {...FormItemLayout}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default RectConfigForm;
