import React from 'react';
import { Card, Form, Input } from 'antd';

const ConfigMemoForm: React.FC<{
  moduleId: string;
}> = ({ moduleId }) => (
  <Card title="文本配置">
    <Form.Item label="内容" name={[moduleId, 'value']}>
      <Input.TextArea placeholder="请输入文本内容" />
    </Form.Item>
  </Card>
);

export default React.memo(ConfigMemoForm);
