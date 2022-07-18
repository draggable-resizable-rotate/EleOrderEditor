import React, { useEffect } from 'react';
import { Form } from 'antd';
import {
  calculateTableSizeByCols,
  getTdWidthByFontCount,
  TableModuleCol,
  TableModuleData,
  TD_HEIGHT,
} from './moduleClass';
import { FormItemLayout } from '@/Editor/config';
import ConfigMemoForm from './ConfigMemoForm';
import { ConfigFormValue } from '../TypeConstraints';

export interface TableConfigFormProps {
  moduleData: TableModuleData;
  onChange: (changeValues: ConfigFormValue) => any;
}

const TableConfigForm: React.FC<TableConfigFormProps> = ({ moduleData, onChange }) => {
  const [form] = Form.useForm();
  const { id: moduleDataId } = moduleData;
  const moduleDataProps = moduleData.props;
  const { cols, value } = moduleDataProps;

  function onValuesChange(changedValues: any, allValues: any) {
    const newProps = allValues?.[moduleDataId];
    const { num: newNum } = newProps;

    let newCols = newProps.cols as Array<TableModuleCol>;
    if (newNum > newCols.length) {
      newCols = newCols.concat(
        new Array(newNum - newCols.length).fill(0).map(() => ({
          value: '',
          alias: '',
          width: getTdWidthByFontCount(5),
          height: newCols[0]?.height || TD_HEIGHT,
        })),
      );
    }
    if (newNum < newCols.length) {
      newCols = newCols.slice(0, newNum);
    }
    // 整宽发生变化
    const newSize = calculateTableSizeByCols(newCols, 2);
    // 如果是修改列表
    if (changedValues[moduleDataId].num !== undefined) {
      onChange?.({
        [moduleDataId]: {
          value: allValues[moduleDataId].value,
          cols: newCols,
          ...newSize,
        } as Partial<TableModuleData['props']>,
      });
    } else {
      // 校验成功将所有已有表单数据一起提交
      Promise.resolve()
        .then(() => form.validateFields())
        .then(() => {
          onChange?.({
            [moduleDataId]: {
              value: allValues[moduleDataId].value,
              cols: newCols,
              ...newSize,
            } as Partial<TableModuleData['props']>,
          });
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('表格取值校验失败，该表格修改无效无效');
        });
    }
  }

  useEffect(() => {
    form.setFieldsValue({ [moduleDataId]: { cols, value, num: cols.length } });
  }, [cols, value, form, moduleDataId]);

  return (
    <Form form={form} onValuesChange={onValuesChange} {...FormItemLayout} labelCol={{ span: 9 }}>
      <ConfigMemoForm moduleDataId={moduleDataId} form={form} />
    </Form>
  );
};

export default TableConfigForm;
