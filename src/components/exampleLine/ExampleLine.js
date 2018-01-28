import React from "react"

const ExampleLine = (props) => {
  return <div className="example-line-wrapper">{props.state.exampleLine.join(" ").split("").map((item, i) =>
    <span className="example-line" key={i}>{item}</span>
  )}</div>
}

export default ExampleLine