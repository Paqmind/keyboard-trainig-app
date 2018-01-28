import React from "react"
import Speedometer from "../../icons/speedometer.png"
import Errors from '../../icons/errors.svg'

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
      <img src={Speedometer} className="speedometer-image" alt="character-per-minute"/>
      <span className="stats">{props.state.charPerMinute}</span>
      <img src={Errors} className="errors-image" alt="errors" />
      <span className="stats">{props.state.errors}</span>
    </div>
  </div>
}

export default OptionalBar