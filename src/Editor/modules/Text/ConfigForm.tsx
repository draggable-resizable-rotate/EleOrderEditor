import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '../../config';
import { TextModuleData } from './moduleClass';
import ConfigMemoForm from './ConfigMemoForm';

export interface TextConfigFormProps {
  moduleData: TextModuleData;
}

const TextConfigForm: React.FC<TextConfigFormProps> = ({ moduleData }) => {
  const [form] = Form.useForm();
  const moduleId = module.id;
  const { value, alias } = moduleData.props;

  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, alias } });
  }, [alias, form, moduleId, value]);

  return (
    <Form form={form} {...FormItemLayout} labelAlign="left">
      <ConfigMemoForm moduleId={moduleId} />
    </Form>
  );
};

export default TextConfigForm;
