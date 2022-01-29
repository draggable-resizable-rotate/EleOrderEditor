import { ReactComponent as ProSvg } from './asset/svg/pro_icon.svg'

export default function App() {
  const state = 4
  return (
    <span>App2 组件 {state} <ProSvg width="18" height="18" /></span>
  )
}