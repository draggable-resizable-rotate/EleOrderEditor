import React, { useEffect } from 'react';
import { Form } from 'antd';
import PositionForm from '@/Editor/components/PositionForm';

import { FormItemLayout } from '@/Editor/config';
import { TextModuleData } from './moduleClass';
import { GroupModuleType } from '../TypeConstraints';
import StyleMemoForm from './StyleMemoForm';

const moduleType = GroupModuleType.Text;

export interface TextStyleFormProps {
  mergeModuleDataProps: TextModuleData['props'];
}

const TextStyleForm: React.FC<TextStyleFormProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { ...mergeProps } });
  }, [form, mergeProps]);

  return (
    <Form form={form} {...FormItemLayout}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default TextStyleForm;
