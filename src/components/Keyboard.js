import React from 'react'
import classNamesGenerator from './btnClassnamesGenerator'

const Keyboard = props => {
  return <div id="keyboard">
    <ul className="cf" id="numbers">
      <li><a href="#" className="key tilda 192"><b>~</b><span>`</span></a></li>
      <li><a href="#" className="key one 49"><b>!</b><span>1</span></a></li>
      <li><a href="#" className="key two 50"><b>@</b><span>2</span></a></li>
      <li><a href="#" className="key three 51"><b>#</b><span>3</span></a></li>
      <li><a href="#" className="key four 52"><b>$</b><span>4</span></a></li>
      <li><a href="#" className="key five 53"><b>%</b><span>5</span></a></li>
      <li><a href="#" className="key six 54"><b>^</b><span>6</span></a></li>
      <li><a href="#" className="key seven 55"><b>&amp;</b><span>7</span></a></li>
      <li><a href="#" className="key eight 56"><b>*</b><span>8</span></a></li>
      <li><a href="#" className="key nine 57"><b>(</b><span>9</span></a></li>
      <li><a href="#" className="key zero 48"><b>)</b><span>0</span></a></li>
      <li><a href="#" className="key minus 189 alt"><b>_</b><span>-</span></a></li>
      <li><a href="#" className="key equals 187"><b>+</b><span>=</span></a></li>
      <li><a href="#" className="key delete 46" id="delete"><span>Delete</span></a></li>
    </ul>
    <ul className="cf" id="qwerty">
      {
        props.state.keyboard[0].map((obj) => {
          return <li key={obj.code}>
            <a href="#" className={classNamesGenerator(props.state, obj)} id={obj.id || null}>
              <span>{obj.caption}</span>
            </a>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="asdfg">
      {
        props.state.keyboard[1].map((obj) => {
          return <li key={obj.code}>
            <a href="#" className={classNamesGenerator(props.state, obj)} id={obj.id || null}>
              <span>{obj.caption}</span>
            </a>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="zxcvb">
      {
        props.state.keyboard[2].map((obj) => {
          return <li key={obj.code}>
            <a href="#" className={classNamesGenerator(props.state, obj)} id={obj.id || null}>
              <span>{obj.caption}</span>
            </a>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="bottomrow">
      {
        props.state.keyboard[3].map((obj) => {
          return <li key={obj.key}>
            <a href="#" className={classNamesGenerator(props.state, obj)} id={obj.id || null}>
              <span>{obj.caption}</span>
            </a>
          </li>
        })
      }
      <ol className="cf">
        <li><a href="#" className="key arrow 37" id="left"><span>&#9668;</span></a></li>
        <li>
          <a href="#" className="key arrow 38" id="up"><span>&#9650;</span></a>
          <a href="#" className="key arrow 40" id="down"><span>&#9660;</span></a>
        </li>
        <li><a href="#" className="key arrow 39" id="right"><span>&#9658;</span></a></li>
      </ol>
    </ul>
  </div>
}

export default Keyboard