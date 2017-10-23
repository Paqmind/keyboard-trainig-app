import React from 'react'

const ExampleLine = (props) => {
  return <div className="exemple-line">{props.value.join(' ')}</div>
}

export default ExampleLine