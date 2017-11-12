import React from 'react'

const OptianalBar = (props) => {
    return <div >
        <
        input type = "radio"
    id = "beginner"
    name = "mode"
    value = "beginner"
    onClick = { props.handler }
    defaultChecked = { true }
    /> <
    label htmlFor = "beginner" > beginner < /label> <
        input type = "radio"
    id = "advanced"
    name = "mode"
    value = "advanced"
    onClick = { props.handler }
    /> <
    label htmlFor = "advanced" > advanced < /label> <
        /div>
}

export default OptianalBar