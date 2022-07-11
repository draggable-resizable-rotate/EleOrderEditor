import { Card, Form, InputNumber } from 'antd';
import { FormItemProps } from 'antd/es/form';
import React, { ReactNode } from 'react';

interface PositionFormProps {
  prefixFormName: string[];
}

export const ExtraDom = ({ text }: { text: ReactNode }) => (
  <div style={{ textAlign: 'center', fontSize: 12, marginTop: -2 }}>{text}</div>
);

interface CustomFormItemProps {
  formItemProps?: FormItemProps;
}

const CustomFormItem = ({ formItemProps }: CustomFormItemProps) => (
  <Form.Item
    style={{ marginBottom: 0 }}
    {...formItemProps}
    extra={<ExtraDom text={formItemProps?.extra} />}
  >
    <InputNumber min={0} precision={2} step={1} style={{ width: 74 }} />
  </Form.Item>
);

const PositionForm: React.FC<PositionFormProps> = ({ prefixFormName = [] }) => (
  <Card title="位置排列" bodyStyle={{ paddingBottom: 2 }}>
    <Form.Item label="位置" style={{ marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CustomFormItem
          formItemProps={{
            name: [...prefixFormName, 'left'],
            extra: 'x',
          }}
        />
        <CustomFormItem
          formItemProps={{
            name: [...prefixFormName, 'top'],
            extra: 'y',
          }}
        />
      </div>
    </Form.Item>
    <Form.Item label="大小" style={{ marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CustomFormItem
          formItemProps={{
            name: [...prefixFormName, 'width'],
            extra: '宽度',
          }}
        />
        <CustomFormItem
          formItemProps={{
            name: [...prefixFormName, 'height'],
            extra: '高度',
          }}
        />
      </div>
    </Form.Item>
  </Card>
);

export default React.memo(PositionForm);
