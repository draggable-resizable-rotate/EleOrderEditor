import React from 'react';

import { Card, Form, Input } from 'antd';

const ConfigMemoForm: React.FC<{
  moduleId: string;
}> = ({ moduleId }) => (
  <Card title="文本配置">
    <Form.Item label="内容" name={[moduleId, 'value']}>
      <Input.TextArea placeholder="请输入文本内容" rows={3} />
    </Form.Item>
    <Form.Item label="别名" name={[moduleId, 'alias']}>
      <Input placeholder="请输入别名" />
    </Form.Item>
  </Card>
);

export default React.memo(ConfigMemoForm);
