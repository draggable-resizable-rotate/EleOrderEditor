import React, { useEffect } from 'react';
import { Form } from 'antd';

import PositionForm from '@/Editor/components/PositionForm';
import { FormItemLayout } from '@/Editor/config';
import { QRCodeModuleData } from './moduleClass';
import { GroupModuleType, StyleFormValue } from '../TypeConstraints';

export interface QRCodeStyleFormProps {
  mergeModuleDataProps: QRCodeModuleData['props'];
  onChange: (changeValues: StyleFormValue) => void;
}

const moduleType = GroupModuleType.QRCode;

const QRCodeStyleForm: React.FC<QRCodeStyleFormProps> = ({
  mergeModuleDataProps: mergeProps,
  onChange,
}) => {
  const [form] = Form.useForm();

  const { left, top, width, height } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { height, left, top, width } });
  }, [left, top, width, height, form]);

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={onChange}>
      <PositionForm prefixFormName={[moduleType]} />
    </Form>
  );
};

export default QRCodeStyleForm;
