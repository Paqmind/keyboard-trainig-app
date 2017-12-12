import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
const json = require('./words.json')

ReactDOM.render(
  <Main words={json}/>,
  document.getElementById('app')
)