import React from "react"
let classNames = require('classnames')

const ExampleLine = (props) => {
  let { exampleLine, inputValue } = props.state
  return <div className="example-line-wrapper">{exampleLine.join(" ").split("").map((item, i) =>
    <span className={classNames({
      "example-line": true,
      "typed-button": inputValue[i] == item
    })} key={i}>{item}</span>
  )}</div>
}

export default ExampleLine