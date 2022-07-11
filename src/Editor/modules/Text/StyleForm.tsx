import React, { useEffect } from 'react';
import { Form } from 'antd';
import PositionForm from '@/Editor/components/PositionForm';

import { FormItemLayout } from '@/Editor/config';
import { TextModuleData } from './moduleClass';
import { GroupModuleType } from '../TypeConstraints';
import StyleMemoForm from './StyleMemoForm';

const moduleType = GroupModuleType.Text;

export interface TextStyleProps {
  mergeModuleDataProps: TextModuleData['props'];
}

const TextStyle: React.FC<TextStyleProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { ...mergeProps } });
  }, [form, mergeProps]);

  return (
    <Form form={form} {...FormItemLayout} labelAlign="left">
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default TextStyle;
