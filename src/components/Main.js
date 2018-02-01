import React, { Component } from "react"
import OptionalBar from "./OptionalBar"
import Input from "./Input"
import ExampleLine from "./exampleLine/ExampleLine"
import exampleLineGenerator from './exampleLine/exampleLineGenerator'
import countCharPerMinute from '../helpers/dialingSpeedCounter'
import countErrorsPerLine from '../helpers/errorsCounter'
import Keyboard from "./keyboard/Keyboard"
import Footer from './Footer'
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    this.timerId = 0                   // interval for counting the time of dialing one line
    this.subscriptions = []            // array of functions removeEventListeners
    const { words } = this.props.words // array of words from words.json file
    this.state = {
      wrongButtonPressed: false,       // indicator of pressed button (rigth/wrong)
      btnHighlighted: null,            // name of highlighted key (q, w, e, r, etc.)
      btnPressed: null,                // code of pressed key
      store: words,                    // store of words for exampleLine
      inputValue: "",                  // user dialing value
      exampleLine: [],                 // array of words rendered now
      exampleLineMaxWords: 15,         // maximum number of words in exampleLine
      exampleLineMaxChars: 60,         // maximum number of chars in exampleLine
      mode: "beginner",                // selected difficulty level (beginner/advanced)
      charCounter: 0,                  // counter for letter-by-letter comparison of intput and example line
      timeCounter: 1,                  // time counter for calculating symbols per second
      charsPerMinute: 0,               // current symbols per second value
      errorsPerLine: 0,                // errors admitted in current example line
      errors: 0,                       // количество ошибок допущенных в одной строке
    }
  }

  modeSwitcherHandler = (e) => {
    this.setState({
      mode: e.target.value,
      inputValue: "",
      charCounter: 0,
      exampleLine: this.setExampleLine(),
      timeCounter: 1,
      errors: 0,
    })
    this.hightLightFirstButton()
    clearInterval(this.timerId)
    this.timerId = 0
  }

  keyDownHandler = (e) => {
    let { inputValue, exampleLine, charCounter, errors } = this.state
    let nextButton = exampleLine[charCounter + 1],
        currButton = exampleLine[charCounter]

    if (e.key == currButton) {
      this.setState({
        inputValue: inputValue + e.key,
        btnPressed: e.keyCode,
        btnHighlighted: nextButton,
        wrongButtonPressed: false,
        charCounter: charCounter + 1
      })

      this.setCountingInterval()
      this.statsCounter()
      this.exampleLineVsInputCompare(this.state.inputValue, exampleLine)

    } else {
      this.statsCounter()
      this.setState({
        wrongButtonPressed: true,
        errors: errors + 1
      })
      setTimeout(() => {
        this.setState({ wrongButtonPressed: false })
      }, 300)
    }
  }

  keyUpHandler = () => {
    this.setState({ btnPressed: null })
  }

  hightLightFirstButton = () => {
    let { exampleLine, charCounter } = this.state
    let firstChar = exampleLine.join(" ")[charCounter]
    this.setState({ btnHighlighted: firstChar })
  }

  exampleLineVsInputCompare = (inputValue, exampleLine) => {
    if (inputValue == exampleLine.join("")) {
      clearInterval(this.timerId)
      this.timerId = 0
      this.setState({
        charCounter: 0,
        inputValue: "",
        exampleLine: this.setExampleLine(),
        timeCounter: 1,
        errors: 0
      })
      this.hightLightFirstButton()
    }
  }

  statsCounter = () => {
    let  {inputValue, exampleLine, errors, timeCounter } = this.state
    this.setState({
      charsPerMinute: countCharPerMinute(inputValue, timeCounter),
      errorsPerLine: countErrorsPerLine(exampleLine, errors)
    })
  }

  installModeSwitcherHandler = () => {
    let mode = document.getElementById("mode")
    mode.addEventListener("change", this.modeSwitcherHandler)
    return () => {
      mode.removeEventListener("change", this.modeSwitcherHandler)
    }
  }

  installKeyDownHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener("keydown", this.keyDownHandler)
    return () => {
      input.removeEventListener("keydown", this.keyDownHandler)
    }
  }

  installKeyUpHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener('keyup', this.keyUpHandler)
    return () => {
      input.removeEventListener('keyup', this.keyUpHandler)
    }
  }

  setExampleLine = () => {
    const {mode, store, exampleLineMaxWords, exampleLineMaxChars} = this.state
    const exampleLine = exampleLineGenerator(mode, store, exampleLineMaxWords, exampleLineMaxChars)
    return exampleLine
  }

  setCountingInterval = () => {
    if (this.timerId == 0) {
      this.timerId = setInterval(() => this.setState({ timeCounter: this.state.timeCounter + 1 }), 1000)
    }
  }

  componentWillMount() {
    this.setState({ exampleLine: this.setExampleLine() })
  }

  componentDidMount() {
    this.hightLightFirstButton()
    this.subscriptions.push(this.installModeSwitcherHandler())
    this.subscriptions.push(this.installKeyDownHandler())
    this.subscriptions.push(this.installKeyUpHandler())
  }

  componentWillUnmount() {
    for (let i of this.subscriptions) {
      i()
    }
  }

  render() {
    return <div className="App">
      <OptionalBar handler={e => this.modeSwitcherHandler(e)} state={this.state} />
      <div className="divider"></div>
      <Input state={this.state} />
      <ExampleLine state={this.state} />
      <Keyboard state={this.state} />
      <Footer/>
    </div>
  }
}

export default Main