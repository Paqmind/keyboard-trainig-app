import React from 'react'

const ExampleLine = (props) => {
  return <div className="example-line">{props.value.join(' ')}</div>
}

export default ExampleLine