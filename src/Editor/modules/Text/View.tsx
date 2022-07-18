import React from 'react';
import { getModuleIdentifier, Identifier } from '../utils/getModuleIdentifier';
import { TextModuleData } from './moduleClass';

export interface TextViewProps {
  moduleData: TextModuleData;
}

const TextView: React.FC<TextViewProps> = ({ moduleData }) => {
  // rotate 设置在外层
  const {
    value,
    alias,
    opacity,
    fontFamily,
    fontSize,
    letterSpacing,
    lineHeight,
    color,
    backgroundColor,
    fontWeight,
    direction,
    fontItalic,
    fontUnderline,
    align,
    vAlign,
    orientation,
  } = moduleData.props;

  return (
    <div
      {...getModuleIdentifier(moduleData, Identifier.View)}
      style={{
        width: '100%',
        height: '100%',
        fontSize,
        opacity,
        fontFamily,
        letterSpacing,
        lineHeight: `${lineHeight}px`,
        color,
        backgroundColor,
        fontWeight,
        direction,
        fontStyle: fontItalic ? 'italic' : undefined,
        textDecoration: fontUnderline ? 'underline' : undefined,
        display: 'flex',
        alignItems: vAlign,
        justifyContent: align,
        overflow: 'hidden',
        writingMode: orientation,
      }}
    >
      {alias || value || '请输入文本内容'}
    </div>
  );
};

export default TextView;
