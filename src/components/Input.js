import React from "react"

const Input = (props) => {
  return <input type="text"
                className={`input ${props.state.wrongButtonPressed == false ? "correct-button" : "mistaken-button"}`}
                id="input"
                value={props.state.inputValue}
                autoFocus={true}
  />
}

export default Input