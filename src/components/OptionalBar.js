import React from "react"
import Speedometer from "../icons/speedometer.png"

const OptionalBar = (props) => {
  return <div className="optional-bar" id="mode">
    <label className="container">Beginner
      <input type="radio" name="radio" value="beginner" onClick={props.handler} defaultChecked={true}/>
      <span className="checkmark"></span>
    </label>
    <label className="container">Advanced
      <input type="radio" name="radio" value="advanced" onClick={props.handler}/>
      <span className="checkmark"></span>
    </label>
    <div className="speed">
      <img src={Speedometer} className="speedometer" alt="character-per-minute"/>
      <span>{props.charPerMinute}</span>
    </div>
  </div>
}

export default OptionalBar