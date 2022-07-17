import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import PositionForm from '@/Editor/components/PositionForm';
import { ImageModuleData } from './moduleClass';
import { GroupModuleType, StyleFormValue } from '../TypeConstraints';
import StyleMemoForm from './StyleMemoForm';

export interface ImageStyleFormProps {
  mergeModuleDataProps: ImageModuleData['props'];
  onChange: (changeValues: StyleFormValue) => void;
}

const moduleType = GroupModuleType.Image;

const ImageStyleForm: React.FC<ImageStyleFormProps> = ({
  mergeModuleDataProps: mergeProps,
  onChange,
}) => {
  const [form] = Form.useForm();

  const { left, top, width, height, opacity } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { height, left, top, width, opacity } });
  }, [left, top, width, height, opacity, form]);

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={onChange}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default ImageStyleForm;
