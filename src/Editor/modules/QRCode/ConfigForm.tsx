import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import { QRCodeModuleData } from './moduleClass';
import ConfigMemoForm from './ConfigMemoForm';

export interface QRCodeConfigFormProps {
  moduleData: QRCodeModuleData;
}

const QRCodeConfigForm: React.FC<QRCodeConfigFormProps> = ({ moduleData }) => {
  const [form] = Form.useForm();
  const moduleId = module.id;
  const { value, type } = moduleData.props;

  // 关联需要更新的数据
  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, type } });
  }, [value, type, moduleId, form]);

  return (
    <Form form={form} {...FormItemLayout}>
      <ConfigMemoForm moduleId={moduleId} />
    </Form>
  );
};

export default QRCodeConfigForm;
