let classNames = require('classnames')

export default function classNamesGenerator(inputValue, item, i) {
  return classNames({
    "example-line": true,
    "typed-button": inputValue[i] == item
  })
}