import React from 'react';
import { TextModuleData } from './moduleClass';

interface Props {
  moduleData: TextModuleData;
}

const TextViewComponent: React.FC<Props> = ({ moduleData }) => {
  const { id } = moduleData;
  // rotate 设置在外层
  const {
    value,
    alias,
    opacity,
    fontFamily,
    fontSize,
    letterSpacing,
    lineHeight,
    lineHeightUnit,
    color,
    backgroundColor,
    fontWeight,
    direction,
    fontItatlic,
    fontUnderline,
    align,
    valign,
    orientation,
  } = moduleData.props;

  return (
    <div
      id={`${id}-view`}
      style={{
        width: '100%',
        height: '100%',
        fontSize,
        opacity,
        fontFamily,
        letterSpacing,
        lineHeight: lineHeight ? `${lineHeight}${lineHeightUnit}` : 'normal',
        color,
        backgroundColor,
        fontWeight,
        direction,
        fontStyle: fontItatlic ? 'italic' : undefined,
        textDecoration: fontUnderline ? 'underline' : undefined,
        display: 'flex',
        alignItems: valign,
        justifyContent: align,
        overflow: 'hidden',
        writingMode: orientation,
      }}
    >
      {alias || value || '请输入文本内容'}
    </div>
  );
};

export default TextViewComponent;
