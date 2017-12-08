import React from "react"

const Input = (props) => {
  return <input type="text" className="input" id="input" value={props.value} autoFocus={true}/>
}

export default Input