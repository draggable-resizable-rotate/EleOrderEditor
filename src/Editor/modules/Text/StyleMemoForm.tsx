import React from 'react';
import { Card, Form, InputNumber, Radio, Select, Space } from 'antd';
import { AlignCenter, AlignLeft } from '../../assets/icon';
import { GroupModuleType } from '../TypeConstraints';
import Checkbox from './Checkbox';

const { Option } = Select;

const FontFamilyOptions = [
  {
    value: 'SimSun',
    label: '宋体',
  },
  {
    value: 'SimHei',
    label: '黑体',
  },
  {
    value: 'Arial',
    label: 'Arial',
  },
  {
    value: 'Times New Roman',
    label: 'Times New Roman',
  },
  {
    value: 'Tahoma',
    label: 'Tahoma',
  },
  {
    value: 'webdings',
    label: 'webdings',
  },
  {
    value: 'Arial Black',
    label: 'Arial Black',
  },
  {
    value: 'Arial Narrow',
    label: 'Arial Narrow',
  },
  {
    value: 'Arial Unicode MS',
    label: 'Arial Unicode MS',
  },
];

const moduleType = GroupModuleType.Text;

const StyleMemoForm: React.FC = () => {
  return (
    <>
      <Card title="文本" bodyStyle={{ paddingBottom: 1 }}>
        <Form.Item label="旋转角度">
          <Space align="center">
            <Form.Item name={[moduleType, 'rotate']} style={{ marginBottom: 0 }}>
              <InputNumber min={0} style={{ width: 126 }} />
            </Form.Item>
            <div className="gray">deg</div>
          </Space>
        </Form.Item>

        <Form.Item label="透明度" name={[moduleType, 'opacity']}>
          <InputNumber min={0} max={1} style={{ width: '100%' }} step={0.1} precision={1} />
        </Form.Item>

        <Form.Item label="字体" name={[moduleType, 'fontFamily']}>
          <Select options={FontFamilyOptions}></Select>
        </Form.Item>

        <Form.Item label="字号">
          <Space align="center">
            <Form.Item name={[moduleType, 'fontSize']} style={{ marginBottom: 0 }}>
              <InputNumber min={0} max={100} style={{ width: 126 }} />
            </Form.Item>
            <div className="gray">px</div>
          </Space>
        </Form.Item>

        <Form.Item label="字间距">
          <Space align="center">
            <Form.Item name={[moduleType, 'letterSpacing']} style={{ marginBottom: 0 }}>
              <InputNumber min={0} max={100} style={{ width: 126 }} />
            </Form.Item>
            <div className="gray">px</div>
          </Space>
        </Form.Item>

        <Form.Item label="行高" name={[moduleType, 'lineHeight']}>
          <InputNumber min={0} max={10000} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="颜色" name={[moduleType, 'color']} initialValue="default">
          <Select>
            <Option value="#ffffff">白色</Option>
            <Option value="#000000">黑色</Option>
          </Select>
        </Form.Item>

        <Form.Item label="背景颜色" name={[moduleType, 'backgroundColor']} initialValue="default">
          <Select>
            <Option value="#ffffff">白色</Option>
            <Option value="#000000">黑色</Option>
          </Select>
        </Form.Item>

        <Form.Item label="字体粗细" name={[moduleType, 'fontWeight']}>
          <Select>
            <Option value="normal">normal</Option>
            <Option value="bold">bold</Option>
            <Option value="light">light</Option>
          </Select>
        </Form.Item>

        <Form.Item label="输出方向" name={[moduleType, 'direction']}>
          <Select>
            <Option value="ltr">ltr</Option>
            <Option value="rtl">rtl</Option>
          </Select>
        </Form.Item>

        <Form.Item label="样式">
          <Form.Item name={[moduleType, 'fontItatlic']} noStyle>
            <Checkbox>/</Checkbox>
          </Form.Item>
          <Form.Item name={[moduleType, 'fontUnderline']} noStyle>
            <Checkbox>
              <span style={{ textDecoration: 'underline' }}>U</span>
            </Checkbox>
          </Form.Item>
        </Form.Item>
      </Card>

      <Card title="排列">
        <Form.Item name={[moduleType, 'align']} noStyle>
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio.Button value="flex-start">
              <AlignLeft />
            </Radio.Button>
            <Radio.Button value="center">
              <AlignCenter />
            </Radio.Button>
            <Radio.Button value="flex-end">
              <AlignLeft style={{ transform: 'rotate(180deg)' }} />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={[moduleType, 'valign']} noStyle>
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio.Button value="flex-start">
              <AlignLeft style={{ transform: 'rotate(90deg)' }} />
            </Radio.Button>
            <Radio.Button value="center">
              <AlignCenter style={{ transform: 'rotate(90deg)' }} />
            </Radio.Button>
            <Radio.Button value="flex-end">
              <AlignLeft style={{ transform: 'rotate(270deg)' }} />
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Card>
    </>
  );
};

export default React.memo(StyleMemoForm);
