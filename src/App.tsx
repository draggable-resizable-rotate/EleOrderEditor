import React from 'react';
import { ReactComponent as ProSvg } from './asset/svg/pro_icon.svg'
import style from './index.module.css'

interface Props {
  title?: 'b'
}

export default function App(props: Props) {
  const {title} = props
  return (
    <span className={style.app}>外部的title是 {title} <ProSvg width="18" height="18" /></span>
  )
}