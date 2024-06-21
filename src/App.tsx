import React, { useState } from 'react';
import "./app.scss"
import testImage from './assets/test.png';
function App() {
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return (
    <>
      <h2>webpack5+react+ts 333333333</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
          <input type="text" />
          <img src={testImage} />
    </>
  )
}
export default App
