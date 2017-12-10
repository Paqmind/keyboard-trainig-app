import React from "react"

const OptionalBar = (props) => {
  return <div className="optional-bar" id="mode">
    <div className="radio-buttons">
      <input type="radio" id="beginner" name="mode" value="beginner" onClick={props.handler} defaultChecked={true} />
      <label htmlFor="beginner">beginner</label>
      <input type="radio" id="advanced" name="mode" value="advanced" onClick={props.handler} />
      <label htmlFor="advanced">advanced</label>
    </div>
  </div>
}

export default OptionalBar