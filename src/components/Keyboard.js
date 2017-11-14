import React from 'react'

const Keyboard = () => {
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
      <li><a href="#" className="key tab 9" id="tab"><span>tab</span></a></li>
      <li><a href="#" className="key q 81"><span>q</span></a></li>
      <li><a href="#" className="key w 87"><span>w</span></a></li>
      <li><a href="#" className="key e 69"><span>e</span></a></li>
      <li><a href="#" className="key r 82"><span>r</span></a></li>
      <li><a href="#" className="key t 84"><span>t</span></a></li>
      <li><a href="#" className="key y 89"><span>y</span></a></li>
      <li><a href="#" className="key u 85"><span>u</span></a></li>
      <li><a href="#" className="key i 73"><span>i</span></a></li>
      <li><a href="#" className="key o 79"><span>o</span></a></li>
      <li><a href="#" className="key p 80"><span>p</span></a></li>
      <li><a href="#" className="key square-bracket 219 alt"><b></b><span>[</span></a></li>
      <li><a href="#" className="key square-bracket 221 alt"><b>}</b><span>]</span></a></li>
      <li><a href="#" className="key slash 220 alt"><b>|</b><span>\</span></a></li>
    </ul>
    <ul className="cf" id="asdfg">
      <li><a href="#" className="key caps 20 alt" id="caps"><b></b><span>caps lock</span></a></li>
      <li><a href="#" className="key a 65"><span>a</span></a></li>
      <li><a href="#" className="key s 83"><span>s</span></a></li>
      <li><a href="#" className="key d 68"><span>d</span></a></li>
      <li><a href="#" className="key f 70"><span>f</span></a></li>
      <li><a href="#" className="key g 71"><span>g</span></a></li>
      <li><a href="#" className="key h 72"><span>h</span></a></li>
      <li><a href="#" className="key j 74"><span>j</span></a></li>
      <li><a href="#" className="key k 75"><span>k</span></a></li>
      <li><a href="#" className="key l 76"><span>l</span></a></li>
      <li><a href="#" className="key 186 alt"><b>:</b><span>;</span></a></li>
      <li><a href="#" className="key 222 alt"><b>"</b><span>'</span></a></li>
      <li><a href="#" className="key 13 alt" id="enter"><span>return</span></a></li>
    </ul>
    <ul className="cf" id="zxcvb">
      <li><a href="#" className="key 16 shiftleft"><span>Shift</span></a></li>
      <li><a href="#" className="key z 90"><span>z</span></a></li>
      <li><a href="#" className="key x 88"><span>x</span></a></li>
      <li><a href="#" className="key c 67"><span>c</span></a></li>
      <li><a href="#" className="key v 86"><span>v</span></a></li>
      <li><a href="#" className="key b 66"><span>b</span></a></li>
      <li><a href="#" className="key n 78"><span>n</span></a></li>
      <li><a href="#" className="key m 77"><span>m</span></a></li>
      <li><a href="#" className="key 188 alt"><b>&lt;</b><span>,</span></a></li>
      <li><a href="#" className="key 190 alt"><b>&gt;</b><span>.</span></a></li>
      <li><a href="#" className="key 191 alt"><b>?</b><span>/</span></a></li>
      <li><a href="#" className="key 16 shiftright"><span>Shift</span></a></li>
    </ul>
    <ul className="cf" id="bottomrow">
      <li><a href="#" className="key fn" id="fn"><span>fn</span></a></li>
      <li><a href="#" className="key control 17" id="control"><span>control</span></a></li>
      <li><a href="#" className="key option" id="optionleft"><span>option</span></a></li>
      <li><a href="#" className="key command" id="commandleft"><span>command</span></a></li>
      <li><a href="#" className="key spacebar 32" id="spacebar"><span></span></a></li>
      <li><a href="#" className="key command" id="commandright"><span>command</span></a></li>
      <li><a href="#" className="key option" id="optionright"><span>option</span></a></li>
      <ol className="cf">
        <li><a href="#" className="key arrow 373" id="left"><span>&#9668;</span></a></li>
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