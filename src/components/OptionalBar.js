import React from "react"
import Speedometer from "../icons/speedometer.png"
import Errors from '../icons/errors.svg'

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
      <img src={Speedometer} className="speedometer-image" alt="dialing-speed" title="chars per minute"/>
      <span className="stats">{props.state.charsPerMinute}</span>
      <img src={Errors} className="errors-image" alt="errors" title="errors per line percentage" />
      <span className="stats">{props.state.errorsPerLine}</span>
    </div>
  </div>
}

export default OptionalBar