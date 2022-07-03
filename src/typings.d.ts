/**
 * ts 默认检查导入import的数据的类型，如果没有就会报错，因此需要对一些导入的变量进行提前声明
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly HOME_PAGE: string;
  }
}

declare module '*.avif' {
  const SRC: string;
  export default SRC;
}

declare module '*.bmp' {
  const SRC: string;
  export default SRC;
}

declare module '*.gif' {
  const SRC: string;
  export default SRC;
}

declare module '*.jpg' {
  const SRC: string;
  export default SRC;
}

declare module '*.jpeg' {
  const SRC: string;
  export default SRC;
}

declare module '*.png' {
  const SRC: string;
  export default SRC;
}

declare module '*.webp' {
  const SRC: string;
  export default SRC;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const SRC: string;
  export default SRC;
}

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
