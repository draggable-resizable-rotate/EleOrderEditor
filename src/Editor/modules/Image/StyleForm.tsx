import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import PositionForm from '@/Editor/components/PositionForm';
import { ImageModuleData } from './moduleClass';
import { GroupModuleType } from '../TypeConstraints';
import StyleMemoForm from './StyleMemoForm';

export interface ImageStyleFormProps {
  mergeModuleDataProps: ImageModuleData['props'];
}

const moduleType = GroupModuleType.Image;

const ImageStyleForm: React.FC<ImageStyleFormProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  const { left, top, width, height, opacity } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { height, left, top, width, opacity } });
  }, [left, top, width, height, opacity, form]);

  return (
    <Form form={form} {...FormItemLayout}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default ImageStyleForm;
