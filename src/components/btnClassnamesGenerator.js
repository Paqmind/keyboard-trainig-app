const classNames = require('classnames')

export default function classNamesGenerator(props, obj) {
 return classNames({
   "key": true,
   [`${obj.caption}`]: true,
   [`${obj.className}`]: !!obj.className,
   [`${obj.code}`]: true,
   "key-highlighted": props.btnHighlighted == obj.code,
   "key-pressed": props.btnPressed == obj.code
 })
}