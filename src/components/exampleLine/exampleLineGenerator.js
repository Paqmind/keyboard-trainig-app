export default function exampleLineGenerator(mode, wordsStore, maxWords, maxChars) {
  let exampleLine = []
  let randomWord = ""

  if (mode == "beginner") {
    randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
    for (let i = 0; i < maxWords; i++) {
      if (exampleLine.join(" ").length <= maxChars) exampleLine.push(randomWord)
    }
  } else if (mode == "advanced") {
    for (let i = 0; i < maxWords; i++) {
      randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
      if (exampleLine.join(" ").length <= maxChars) exampleLine.push(randomWord)
    }
  } else {
    exampleLine = []
  }

  return exampleLine
}