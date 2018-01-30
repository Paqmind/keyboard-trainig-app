const countCharPerMinute = (inputValue, timeCounter) => {
  return Math.round((60 / timeCounter) * inputValue.length)
}

export default countCharPerMinute