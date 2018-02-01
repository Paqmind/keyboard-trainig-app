const classNames = require('classnames')

const classNamesGenerator = (state) => {
  return classNames({
    "input": true,
    "mistaken-button": state.wrongButtonPressed,
    "correct-input-line": state.correctInputLine
  })
}

export default classNamesGenerator