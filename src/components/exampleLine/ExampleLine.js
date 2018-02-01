import React from "react"
import classNamesGenerator from './classNames'

const ExampleLine = (props) => {
  const { exampleLine, inputValue } = props.state
  return <div className="example-line-wrapper">{exampleLine.map((item, i) =>
    <span className={classNamesGenerator(inputValue, item, i)} key={i}>{item}</span>
  )}</div>
}

export default ExampleLine