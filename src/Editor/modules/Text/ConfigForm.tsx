import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '../../config';
import { TextModuleData } from './moduleClass';
import ConfigMemoForm from './ConfigMemoForm';
import { ConfigFormValue } from '../TypeConstraints';

export interface TextConfigFormProps {
  moduleData: TextModuleData;
  onChange: (changeValues: ConfigFormValue) => any;
}

const TextConfigForm: React.FC<TextConfigFormProps> = ({ moduleData, onChange }) => {
  const [form] = Form.useForm();
  const moduleId = moduleData.id;
  const { value, alias } = moduleData.props;

  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, alias } });
  }, [alias, form, moduleId, value]);

  return (
    <Form form={form} {...FormItemLayout} labelAlign="left" onValuesChange={onChange}>
      <ConfigMemoForm moduleId={moduleId} />
    </Form>
  );
};

export default TextConfigForm;
