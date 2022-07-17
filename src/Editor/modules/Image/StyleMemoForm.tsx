import React from 'react';
import { Card, Form, InputNumber, Space } from 'antd';
import { GroupModuleType } from '../TypeConstraints';

const moduleType = GroupModuleType.Image;

const StyleMemoForm: React.FC = () => {
  return (
    <Card title="其它">
      <Form.Item label="透明度" style={{ marginBottom: '0' }}>
        <Space align="center">
          <Form.Item noStyle name={[moduleType, 'opacity']}>
            <InputNumber min={0} max={1} style={{ width: '100%' }} step={0.1} />
          </Form.Item>
          <span className="gray">%</span>
        </Space>
      </Form.Item>
    </Card>
  );
};

export default StyleMemoForm;
