import React, { useEffect } from 'react';
import { Form } from 'antd';
import PositionForm from '@/Editor/components/PositionForm';

import { FormItemLayout } from '@/Editor/config';
import { TextModuleData } from './moduleClass';
import { GroupModuleType, StyleFormValue } from '../TypeConstraints';
import StyleMemoForm from './StyleMemoForm';

const moduleType = GroupModuleType.Text;

export interface TextStyleFormProps {
  mergeModuleDataProps: TextModuleData['props'];
  onChange: (changeValues: StyleFormValue) => void;
}

const TextStyleForm: React.FC<TextStyleFormProps> = ({
  mergeModuleDataProps: mergeProps,
  onChange,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { ...mergeProps } });
  }, [form, mergeProps]);

  function formOnChange(changeValues: StyleFormValue) {
    onChange(changeValues);
  }

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={formOnChange}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default TextStyleForm;
