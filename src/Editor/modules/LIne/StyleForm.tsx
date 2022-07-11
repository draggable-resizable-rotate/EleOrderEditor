import React, { useEffect } from 'react';
import { Form } from 'antd';

import StyleMemoForm from './StyleMemoForm';
import { FormItemLayout } from '@/Editor/config';
import { LineModuleData } from './moduleClass';
import { GroupModuleType } from '../TypeConstraints';
import PositionForm from '@/Editor/components/PositionForm';

interface LineStyleFormProps {
  mergeModuleDataProps: LineModuleData['props'];
}

const moduleType = GroupModuleType.Line;

const LineStyleForm: React.FC<LineStyleFormProps> = ({ mergeModuleDataProps: mergeProps }) => {
  const [form] = Form.useForm();

  const { left, top, width, height, lineType, lineWidth } = mergeProps;

  useEffect(() => {
    form.setFieldsValue({
      [moduleType]: { left, top, width, height, form, lineType, lineWidth },
    });
  }, [form, height, left, lineType, lineWidth, top, width]);

  return (
    <Form form={form} {...FormItemLayout}>
      <PositionForm prefixFormName={[moduleType]} />
      <StyleMemoForm />
    </Form>
  );
};

export default LineStyleForm;
