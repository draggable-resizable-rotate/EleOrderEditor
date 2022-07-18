import React, { useEffect } from 'react';
import { Form } from 'antd';
import { FormItemLayout } from '@/Editor/config';
import { TableModuleData } from './moduleClass';
import { GroupModuleType, StyleFormValue } from '../TypeConstraints';
import PositionForm from '@/Editor/components/PositionForm';
import StyleMemoForm from './StyleMemoForm';

export interface TableStyleFormProps {
  mergeModuleDataProps: TableModuleData['props'];
  onChange: (changeValues: StyleFormValue) => void;
}

const moduleType = GroupModuleType.Table;

const TableStyleForm: React.FC<TableStyleFormProps> = ({
  mergeModuleDataProps: mergeProps,
  onChange,
}) => {
  const [form] = Form.useForm();

  const { left, top, width, height, hasBorder } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({ [moduleType]: { height, left, top, width, hasBorder } });
  }, [left, top, width, height, hasBorder, form]);

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={onChange}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default TableStyleForm;
