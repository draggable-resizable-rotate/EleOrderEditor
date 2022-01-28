import './index.css'
import add from './utils/add'
import style from './index.module.css'
import './index.less'
import React from 'react';
import ReactDOM from 'react-dom';

console.log('aaa')

if(module.hot) {
  module.hot.accept('./utils/add', function() {
    console.log('热更新')
  })
}


const button = document.createElement('button')
button.innerHTML = '0'
button.className = style.button
button.addEventListener('click', function() {
  console.log(add(1, 2))
})

document.body.append(button)



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {
  return (
    <span>App 组件</span>
  )
}