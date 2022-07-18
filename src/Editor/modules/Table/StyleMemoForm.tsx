import React from 'react';
import { Card, Form, Radio } from 'antd';
import { GroupModuleType } from '../TypeConstraints';

const moduleType = GroupModuleType.Table;

const StyleMemoForm: React.FC = () => (
  <>
    <Card title="边框">
      <Form.Item label="类型" name={[moduleType, 'hasBorder']}>
        <Radio.Group>
          <Radio value={true}>显示</Radio>
          <Radio value={false}>隐藏</Radio>
        </Radio.Group>
      </Form.Item>
    </Card>
  </>
);

export default React.memo(StyleMemoForm);
