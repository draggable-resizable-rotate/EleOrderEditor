import React from 'react';
import { Card, Form, InputNumber, Select, Space } from 'antd';
import { GroupModuleType } from '../TypeConstraints';

const { Option } = Select;

const moduleType = GroupModuleType.Rect;

const StyleMemoForm: React.FC = () => (
  <>
    <Card title="边框">
      <Form.Item label="类型" style={{ marginBottom: 0 }}>
        <Space align="center">
          <Form.Item name={[moduleType, 'lineType']} style={{ marginBottom: 22 }}>
            <Select style={{ width: 74 }}>
              <Option value="solid">实线</Option>
              <Option value="dashed">虚线</Option>
            </Select>
          </Form.Item>
          <Form.Item name={[moduleType, 'lineWidth']} style={{ marginBottom: 0 }} extra="大小">
            <InputNumber min={0} max={100} style={{ width: 74 }} />
          </Form.Item>
        </Space>
      </Form.Item>
    </Card>

    <Card title="背景">
      <Form.Item label="类型" style={{ marginBottom: 0 }} name={[moduleType, 'fillColor']}>
        <Select>
          <Option value="">无填充</Option>
          <Option value="#000">有填充</Option>
        </Select>
      </Form.Item>
    </Card>
  </>
);

export default React.memo(StyleMemoForm);
