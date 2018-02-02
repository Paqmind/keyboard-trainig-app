import React from 'react'
import keys from './keys'
import classNamesGenerator from './classNames'

const Keyboard = props => {
  return <div id="keyboard">
    <ul className="cf" id="numbers">
      <li><div className="key tilda 192"><b>~</b><span>`</span></div></li>
      <li><div className="key one 49"><b>!</b><span>1</span></div></li>
      <li><div className="key two 50"><b>@</b><span>2</span></div></li>
      <li><div className="key three 51"><b>#</b><span>3</span></div></li>
      <li><div className="key four 52"><b>$</b><span>4</span></div></li>
      <li><div className="key five 53"><b>%</b><span>5</span></div></li>
      <li><div className="key six 54"><b>^</b><span>6</span></div></li>
      <li><div className="key seven 55"><b>&amp;</b><span>7</span></div></li>
      <li><div className="key eight 56"><b>*</b><span>8</span></div></li>
      <li><div className="key nine 57"><b>(</b><span>9</span></div></li>
      <li><div className="key zero 48"><b>)</b><span>0</span></div></li>
      <li><div className="key minus 189 alt"><b>_</b><span>-</span></div></li>
      <li><div className="key equals 187"><b>+</b><span>=</span></div></li>
      <li><div className="key delete 46" id="delete"><span>Delete</span></div></li>
    </ul>
    <ul className="cf" id="qwerty">
      {
        keys[0].map((obj) => {
          return <li key={obj.code}>
            <div className={classNamesGenerator(props.state, obj)} id={obj.id || null}
                 data-key={obj.value || obj.caption}>
              <span data-key={obj.value || obj.caption}>{obj.caption}</span>
            </div>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="asdfg">
      {
        keys[1].map((obj) => {
          return <li key={obj.code}>
            <div className={classNamesGenerator(props.state, obj)} id={obj.id || null}
                 data-key={obj.value || obj.caption}>
              <span data-key={obj.value || obj.caption}>{obj.caption}</span>
            </div>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="zxcvb">
      {
        keys[2].map((obj) => {
          return <li key={obj.code}>
            <div className={classNamesGenerator(props.state, obj)} id={obj.id || null}
                 data-key={obj.value || obj.caption}>
              <span data-key={obj.value || obj.caption}>{obj.caption}</span>
            </div>
          </li>
        })
      }
    </ul>
    <ul className="cf" id="bottomrow">
      {
        keys[3].map((obj) => {
          return <li key={obj.key}>
            <div className={classNamesGenerator(props.state, obj)} id={obj.id || null}
                 data-key={obj.value || obj.caption}>
              <span data-key={obj.value || obj.caption}>{obj.caption}</span>
            </div>
          </li>
        })
      }
      <ol className="cf">
        <li><div className="key arrow 37" id="left"><span>&#9668;</span></div></li>
        <li>
          <div className="key arrow 38" id="up"><span>&#9650;</span></div>
          <div className="key arrow 40" id="down"><span>&#9660;</span></div>
        </li>
        <li><div className="key arrow 39" id="right"><span>&#9658;</span></div></li>
      </ol>
    </ul>
  </div>
}
export default Keyboard
