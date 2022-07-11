import React, { useEffect } from 'react';
import { Form } from 'antd';

import PositionForm from '@/Editor/components/PositionForm';
import { FormItemLayout } from '@/Editor/config';
import { QRCodeModuleData } from './moduleClass';
import { GroupModuleType } from '../TypeConstraints';

export interface QRCodeStyleFormProps {
  mergeModuleDataProps: QRCodeModuleData['props'];
}

const moduleType = GroupModuleType.QRCode;

const QRCodeStyleForm: React.FC<QRCodeStyleFormProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  const { left, top, width, height } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { height, left, top, width } });
  }, [left, top, width, height, form]);

  return (
    <Form form={form} {...FormItemLayout}>
      <PositionForm prefixFormName={[moduleType]} />
    </Form>
  );
};

export default QRCodeStyleForm;
