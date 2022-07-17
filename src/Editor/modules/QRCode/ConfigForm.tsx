import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import { QRCodeModuleData } from './moduleClass';
import ConfigMemoForm from './ConfigMemoForm';
import { ConfigFormValue } from '../TypeConstraints';

export interface QRCodeConfigFormProps {
  moduleData: QRCodeModuleData;
  onChange: (changeValues: ConfigFormValue) => any;
}

const QRCodeConfigForm: React.FC<QRCodeConfigFormProps> = ({ moduleData, onChange }) => {
  const [form] = Form.useForm();
  const moduleId = moduleData.id;
  const { value, type } = moduleData.props;

  // 关联需要更新的数据
  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, type } });
  }, [value, type, moduleId, form]);

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={onChange}>
      <ConfigMemoForm moduleId={moduleId} />
    </Form>
  );
};

export default QRCodeConfigForm;
