import React, { useEffect } from 'react';
import { Card, Form, Input } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import { QRCodeModuleData } from './moduleClass';

export interface QRCodeConfigProps {
  moduleData: QRCodeModuleData;
}

let MemoConfigForm: React.FC<{
  moduleId: string;
}> = ({ moduleId }) => (
  <Card title="文本配置">
    <Form.Item label="内容" name={[moduleId, 'value']}>
      <Input.TextArea placeholder="请输入文本内容" />
    </Form.Item>
  </Card>
);
MemoConfigForm = React.memo(MemoConfigForm);

const QRCodeConfig: React.FC<QRCodeConfigProps> = ({ moduleData }) => {
  const [form] = Form.useForm();
  const moduleId = module.id;
  const { value, type } = moduleData.props;

  // 关联需要更新的数据
  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, type } });
  }, [value, type, moduleId, form]);

  return (
    <Form form={form} {...FormItemLayout} labelAlign="left">
      <MemoConfigForm moduleId={moduleId} />
    </Form>
  );
};

export default QRCodeConfig;
