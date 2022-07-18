import React from 'react';
import { Card, Form, FormInstance, Input, InputNumber, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

// 单元格，符合变量命名规则
const TableCellDataRegExp = /^(\.[a-zA-Z_][0-9a-zA-Z_]*)*$/;
// 数据源，data + 属性访问
const TableSourceDataRegExp = /^data(\.[a-zA-Z_][0-9a-zA-Z_]*)+$/;

const ConfigMemoForm: React.FC<{
  moduleDataId: string;
  form: FormInstance<any>;
}> = ({ moduleDataId, form }) => (
  <Card
    title={
      <Tooltip
        title={
          <div>
            <div>
              表格数据源内容填写规则：
              <br />
              以data.开头，后续所有的访问的属性名都需要满足以下要求：0-9或a-z或A-Z或下划线_，并且不能以数字0-9开头（data.123spu是不符合格式的）
            </div>
            <br />
            <div>
              表格单元格内容填写规则：
              <br />
              在数据源规则的基础上去掉以data.开头
            </div>
          </div>
        }
      >
        <span style={{ cursor: 'pointer' }}>
          表格Value
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </span>
      </Tooltip>
    }
  >
    <Form.Item label="字段数" name={[moduleDataId, 'num']}>
      <InputNumber min={1} precision={0} style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item
      label="表格内容"
      name={[moduleDataId, 'value']}
      rules={[
        {
          required: true,
          message: '请填写表格数据来源',
        },
        {
          validator(rules, value) {
            if (value.length && !TableSourceDataRegExp.test(value)) {
              if (/^data\./.test(value) === false) {
                return Promise.reject('数据源必须以"data."开头');
              }
              return Promise.reject('访问的属性需要符合变量命名');
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Input.TextArea placeholder="请输入文本内容"></Input.TextArea>
    </Form.Item>
    <Form.List name={[moduleDataId, 'cols']}>
      {(fields) =>
        fields.map((field, index) => (
          <div
            style={{
              borderTop: '1px solid #EBECEE',
            }}
            key={index}
          >
            <div style={{ color: 'rgba(22, 24, 35, 0.6)', marginBottom: 12 }}>字段{index + 1}</div>
            <Form.Item
              {...field}
              name={[field.name, 'value']}
              fieldKey={[field.key, 'value']}
              key={`value-${index}`}
              label="内容"
              rules={[
                {
                  validator(rules, value) {
                    if (value.length && !TableCellDataRegExp.test(`.${value}`)) {
                      return Promise.reject('value不需要符合变量命名');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.TextArea placeholder="请输入文本内容" />
            </Form.Item>
            <Form.Item
              {...field}
              name={[field.name, 'alias']}
              fieldKey={[field.key, 'alias']}
              key={`alias-${index}`}
              label="别名"
              rules={[
                {
                  validator(rules, value) {
                    const colValue = form.getFieldValue(moduleDataId).cols[field.key].value;
                    return Promise[!colValue || value.length ? 'resolve' : 'reject']();
                  },
                  message: '请填写别名字段',
                },
              ]}
            >
              <Input placeholder="请输入文本内容" />
            </Form.Item>
          </div>
        ))
      }
    </Form.List>
  </Card>
);

export default React.memo(ConfigMemoForm);
