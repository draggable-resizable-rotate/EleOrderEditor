import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd';
import React from 'react';

const Checkbox = (
  props: CheckboxProps & {
    value?: boolean;
    onChange?: (value: boolean) => void;
  },
) => {
  const { value, onChange, ...cleanProps } = props;
  return (
    <AntdCheckbox
      checked={value}
      onChange={(event) => {
        onChange?.(event.target.checked);
      }}
      {...cleanProps}
    />
  );
};

export default Checkbox;
