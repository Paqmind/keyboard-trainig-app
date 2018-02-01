import React from "react"
import classNamesGenerator from './classNames'

const Input = (props) => {
  return <input type="text"
                className={classNamesGenerator(props.state)}
                id="input"
                value={props.state.inputValue}
                autoFocus={true}
  />
}

export default Input