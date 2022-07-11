import React from 'react';
import { Card, Form, InputNumber, Radio, Select, Space } from 'antd';
import { alignCenterIcon, alignLeftIcon } from '../../assets/icon';
import { GroupModuleType } from '../TypeConstraints';
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
            <Form.Item name={[moduleType, 'rotation']} style={{ marginBottom: 0 }}>
              <InputNumber min={0} style={{ width: 126 }} />
            </Form.Item>
            <div className="gray">deg</div>
          </Space>
        </Form.Item>

        <Form.Item label="透明度" name={[moduleType, 'alpha']}>
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
            <div className="gray">pt</div>
          </Space>
        </Form.Item>

        <Form.Item label="字间距">
          <Space align="center">
            <Form.Item name={[moduleType, 'letterSpacing']} style={{ marginBottom: 0 }}>
              <InputNumber min={0} max={100} style={{ width: 126 }} />
            </Form.Item>
            <div className="gray">pt</div>
          </Space>
        </Form.Item>

        <Form.Item label="行高">
          <Space align="center" size={0}>
            <Form.Item
              noStyle
              shouldUpdate={(prev, current) =>
                prev[moduleType].lineHeightUnit !== current[moduleType].lineHeightUnit
              }
            >
              {({ getFieldValue }) => {
                const lineHeightUnit = getFieldValue([moduleType, 'lineHeightUnit']);
                const useMM = lineHeightUnit !== '%';
                const maxLineHeight = useMM ? 100 : 10000;
                return (
                  <Form.Item name={[moduleType, 'lineHeight']} style={{ marginBottom: 0 }}>
                    <InputNumber min={0} max={maxLineHeight} />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <Form.Item name={[moduleType, 'lineHeightUnit']} style={{ marginBottom: 0 }}>
              <Select style={{ width: 68, borderLeftColor: '#E7E8E8' }}>
                <Option value="%">%</Option>
                <Option value="mm">mm</Option>
              </Select>
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="颜色" name={[moduleType, 'colorStyle']} initialValue="default">
          <Select>
            <Option value="default">默认</Option>
            <Option value="reversed">黑底白字</Option>
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
            <Radio.Group
              options={[{ label: '/', value: true }]}
              size="small"
              style={{ borderRight: '#E7E8E8' }}
            />
          </Form.Item>
          <Form.Item name={[moduleType, 'fontUnderline']} noStyle>
            <Radio.Group
              options={[
                { label: <span style={{ textDecoration: 'underline' }}>U</span>, value: true },
              ]}
              size="small"
            />
          </Form.Item>
        </Form.Item>
      </Card>

      <Card title="排列">
        <Form.Item name={[moduleType, 'align']} noStyle>
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio.Button value="left">
              <span>{alignLeftIcon}</span>
            </Radio.Button>
            <Radio.Button value="center">
              <span>{alignCenterIcon}</span>
            </Radio.Button>
            <Radio.Button value="right">
              <span style={{ transform: 'rotate(180deg)' }}>{alignLeftIcon}</span>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={[moduleType, 'valign']} noStyle>
          <Radio.Group optionType="button" buttonStyle="solid" size="small">
            <Radio.Button value="top">
              <span style={{ transform: 'rotate(90deg)' }}>{alignLeftIcon}</span>
            </Radio.Button>
            <Radio.Button value="center">
              <span style={{ transform: 'rotate(90deg)' }}>{alignCenterIcon}</span>
            </Radio.Button>
            <Radio.Button value="bottom">
              <span style={{ transform: 'rotate(270deg)' }}>{alignLeftIcon}</span>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Card>
    </>
  );
};

export default React.memo(StyleMemoForm);