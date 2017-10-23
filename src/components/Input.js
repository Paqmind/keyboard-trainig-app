import React from 'react'

const Input = (props) => {
  return <input type="text" className="input" value={props.value} autoFocus={true}/>
}

export default Input