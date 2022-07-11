import React, { useEffect } from 'react';
import { Card, Form, Input } from 'antd';
import { FormItemLayout } from '../../config';
import { TextModuleData } from './moduleClass';

export interface TextConfigProps {
  moduleData: TextModuleData;
}

let MemoConfigForm: React.FC<{
  moduleId: string;
}> = ({ moduleId }) => (
  <Card title="文本配置">
    <Form.Item label="Value" name={[moduleId, 'value']}>
      <Input.TextArea placeholder="请输入文本内容" rows={3} />
    </Form.Item>
    <Form.Item label="别名" name={[moduleId, 'alias']}>
      <Input placeholder="请输入别名" />
    </Form.Item>
  </Card>
);

MemoConfigForm = React.memo(MemoConfigForm);

const TextConfig: React.FC<TextConfigProps> = ({ moduleData }) => {
  const [form] = Form.useForm();
  const moduleId = module.id;
  const { value, alias } = moduleData.props;

  useEffect(() => {
    form.setFieldsValue({ [moduleId]: { value, alias } });
  }, [alias, form, moduleId, value]);

  return (
    <Form form={form} {...FormItemLayout} labelAlign="left">
      <MemoConfigForm moduleId={moduleId} />
    </Form>
  );
};

export default TextConfig;
