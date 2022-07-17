import React, { useEffect } from 'react';
import { Form } from 'antd';

import StyleMemoForm from './StyleMemoForm';
import { FormItemLayout } from '@/Editor/config';
import { LineModuleData } from './moduleClass';
import { GroupModuleType, StyleFormValue } from '../TypeConstraints';
import PositionForm from '@/Editor/components/PositionForm';

export interface LineStyleFormProps {
  mergeModuleDataProps: LineModuleData['props'];
  onChange: (changeValues: StyleFormValue) => void;
}

const moduleType = GroupModuleType.Line;

const LineStyleForm: React.FC<LineStyleFormProps> = ({
  mergeModuleDataProps: mergeProps,
  onChange,
}) => {
  const [form] = Form.useForm();

  const { left, top, width, height, lineType, lineWidth } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({
      [moduleType]: { left, top, width, height, form, lineType, lineWidth },
    });
  }, [form, height, left, lineType, lineWidth, top, width]);

  function formOnChange(changeValues: StyleFormValue) {
    onChange(changeValues);
  }

  return (
    <Form form={form} {...FormItemLayout} onValuesChange={formOnChange}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default LineStyleForm;
