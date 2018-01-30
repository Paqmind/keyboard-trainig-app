const countErrorsPerLine = (exampleLine, errors) => {
  return ((errors * 100) / exampleLine.join("").length).toFixed(2)
}

export default countErrorsPerLine