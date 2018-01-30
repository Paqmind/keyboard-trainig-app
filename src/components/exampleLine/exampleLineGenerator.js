export default function exampleLineGenerator(mode, store, maxWords, maxChars) {
  let exampleLine = []
  let randomWord = ""

  if (mode == "beginner") {
    randomWord = store[Math.floor(Math.random() * store.length)]
    for (let i = 0; i < maxWords; i++) {
      if (exampleLine.join(" ").length <= maxChars) exampleLine.push(randomWord)
    }
  } else if (mode == "advanced") {
    for (let i = 0; i < maxWords; i++) {
      randomWord = store[Math.floor(Math.random() * store.length)]
      if (exampleLine.join(" ").length <= maxChars) exampleLine.push(randomWord)
    }
  } else {
    exampleLine = []
  }

  return exampleLine
}