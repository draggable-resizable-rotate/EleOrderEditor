import React from 'react';
export { ReactComponent as TextSvg } from './text.svg';
export { ReactComponent as VTextSvg } from './v-text.svg';
export { ReactComponent as HTextSvg } from './h-text.svg';
export { ReactComponent as GraphicSvg } from './graphic.svg';
export { ReactComponent as VLineSvg } from './v-line.svg';
export { ReactComponent as HLineSvg } from './h-line.svg';
export { ReactComponent as RectSvg } from './rect.svg';
export { ReactComponent as TableSvg } from './table.svg';
export { ReactComponent as ImageSvg } from './image.svg';
export { ReactComponent as DeleteSvg } from './delete.svg';
export { ReactComponent as AddSvg } from './add.svg';

export const settingSelectedIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h14v14H0z" />
      <path
        d="M12.889 6.418a.304.304 0 0 0-.01-.054v-.01l-.005-.03c-.095-.45-.402-.74-.783-.74h-.063c-.65 0-1.178-.515-1.178-1.145 0-.146.07-.353.099-.426.185-.419-.012-.896-.469-1.14l-1.436-.79-.027-.009C8.91 2.04 8.786 2 8.647 2c-.26 0-.552.117-.733.293-.226.217-.685.541-.958.541-.272 0-.732-.323-.959-.541A1.067 1.067 0 0 0 5.265 2c-.143 0-.264.039-.37.074l-.025.01-1.506.792-.01.005c-.365.223-.513.733-.327 1.138l.002.005.003.005c.03.064.12.28.12.469 0 .632-.53 1.145-1.177 1.145h-.063c-.4 0-.698.286-.783.746l-.006.026v.009c0 .013-.005.03-.01.054C1.08 6.675 1 7.138 1 7.517a6.586 6.586 0 0 0 .123 1.093v.01l.006.03c.095.45.401.74.783.74h.032c.65 0 1.178.515 1.178 1.145a1.4 1.4 0 0 1-.1.426c-.177.394-.009.9.385 1.155l.01.006 1.42.767.026.01c.108.033.23.074.369.074.297 0 .564-.111.732-.293.016-.012.032-.027.05-.043.172-.146.633-.531.936-.531.227 0 .605.23.987.601.193.185.46.293.732.293.185 0 .322-.05.477-.124l.005-.002 1.455-.782.006-.006c.365-.222.514-.732.328-1.137l-.003-.005-.003-.006a.909.909 0 0 1-.095-.438l.003-.013v-.013c0-.633.53-1.145 1.178-1.145h.067c.399 0 .697-.287.783-.746l.005-.026v-.01l.01-.046c.035-.191.115-.638.115-1.047.003-.377-.076-.839-.111-1.036zm-5.89 2.895c-1.03 0-1.864-.81-1.864-1.812 0-1 .834-1.811 1.864-1.811 1.029 0 1.863.81 1.863 1.811s-.834 1.812-1.863 1.812z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export const arrowUpIcon = (
  <svg width="12" height="13" viewBox="0 0 12 13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.792 1.25v8.185l3.398-3.427a.787.787 0 0 1 1.12 0c.309.311.309.817 0 1.129l-4.75 4.79a.787.787 0 0 1-1.12 0L.69 7.137a.803.803 0 0 1 0-1.13.787.787 0 0 1 1.12 0l3.398 3.428V1.25c0-.441.355-.799.792-.799.437 0 .792.358.792.799z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const alignLeftIcon = (
  <svg width="14" height="13" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.4.813C.16.813 0 .65 0 .406 0 .162.16 0 .4 0h13.2c.24 0 .4.163.4.406 0 .244-.16.406-.4.406H.4zm0 2.843c-.24 0-.4-.162-.4-.406 0-.244.16-.406.4-.406h8c.24 0 .4.162.4.406 0 .244-.16.406-.4.406h-8zM.4 6.5c-.24 0-.4-.162-.4-.406 0-.244.16-.407.4-.407h13.2c.24 0 .4.163.4.407 0 .244-.16.406-.4.406H.4zm0 3.25c-.24 0-.4-.162-.4-.406 0-.244.16-.406.4-.406h8c.24 0 .4.162.4.406 0 .244-.16.406-.4.406h-8zM.4 13c-.24 0-.4-.162-.4-.406 0-.244.16-.406.4-.406h13.2c.24 0 .4.162.4.406 0 .244-.16.406-.4.406H.4z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

export const alignCenterIcon = (
  <svg width="14" height="13" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.4.813C.16.813 0 .65 0 .406 0 .162.16 0 .4 0h13.2c.24 0 .4.163.4.406 0 .244-.16.406-.4.406H.4zm3 3c-.24 0-.4-.163-.4-.407C3 3.162 3.16 3 3.4 3h8c.24 0 .4.163.4.406 0 .244-.16.406-.4.406h-8zm-3 3c-.24 0-.4-.163-.4-.407C0 6.162.16 6 .4 6h13.2c.24 0 .4.162.4.406 0 .244-.16.407-.4.407H.4zm3 3c-.24 0-.4-.163-.4-.407C3 9.162 3.16 9 3.4 9h8c.24 0 .4.162.4.406 0 .244-.16.406-.4.406h-8zm-3 3c-.24 0-.4-.163-.4-.407C0 12.162.16 12 .4 12h13.2c.24 0 .4.162.4.406 0 .244-.16.406-.4.406H.4z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

export const hBarCodeIcon = (
  <svg width="24" height="12" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0h3v12H0V0zm3.75 0h1.5v12h-1.5V0zM6 0h.75v12H6V0zm3.75 0h1.5v12h-1.5V0zM12 0h3v12h-3V0zm9.375 0H24v12h-2.625V0zM7.125 0h2.25v12h-2.25V0zm11.25 0h2.25v12h-2.25V0zM17.25 0H18v12h-.75V0zm-1.5 0h.75v12h-.75V0z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

export const vBarCodeIcon = (
  <svg width="12" height="24" viewBox="0 0 12 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 0v3H0V0h12zm0 3.75v1.5H0v-1.5h12zM12 6v.75H0V6h12zm0 3.75v1.5H0v-1.5h12zM12 12v3H0v-3h12zm0 9.375V24H0v-2.625h12zm0-14.25v2.25H0v-2.25h12zm0 11.25v2.25H0v-2.25h12zm0-1.125V18H0v-.75h12zm0-1.5v.75H0v-.75h12z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

export const qrCodeIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.846 13.846h3.077V10.77H20v4.616h-3.077v1.538h-3.077v-1.538H10.77v-4.616h3.077v3.077zM0 10.77h9.23V20H0v-9.23zm3.077 3.077v3.077h3.077v-3.077H3.077zM0 0h9.23v9.23H0V0zm3.077 3.077v3.077h3.077V3.077H3.077zM10.769 0H20v9.23h-9.23V0zm3.077 3.077v3.077h3.077V3.077h-3.077zm3.077 13.846H20V20h-3.077v-3.077zm-6.154 0h3.077V20H10.77v-3.077z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);
