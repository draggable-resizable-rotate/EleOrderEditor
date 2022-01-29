export default function App() {
  const state = 4
  console.log('加载polyfill')
  console.log(Array.from('123'))
  return (
    <span>App2 组件 {state}</span>
  )
}