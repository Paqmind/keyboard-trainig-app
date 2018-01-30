import React, { Component } from "react"
import OptionalBar from "./OptionalBar"
import Input from "./Input"
import ExampleLine from "./exampleLine/ExampleLine"
import exampleLineGenerator from './exampleLine/exampleLineGenerator'
import Keyboard from "./keyboard/Keyboard"
import Footer from './Footer'
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    this.timerId = 0                   // интервал для подсчета времени набора одной строки
    this.subscriptions = []            // массив функций removeEventListeners
    const { words } = this.props.words // массив слов из words.json файла
    this.state = {
      wrongButtonPressed: false,
      btnHighlighted: null,
      btnPressed: null,
      store: words,
      inputValue: "",
      exampleLine: [],
      exampleLineMaxWords: 15,         // максимальное колличество слов в exampleLine
      exampleLineMaxChars: 60,         // максимальное колличество символов в exampleLine
      mode: "beginner",
      charCounter: 0,                  // счетчик для побуквенного сравнения инпута и строки-примера
      timeCounter: 1,                  // счетчик времени для расчета символов в секунду
      charsPerMinute: 0,
      errorsPerLine: 0,
      errors: 0,                       // количество ошибок допущенных в одной строке
    }
  }

  firstCharButtonHightlighting = () => {
    let { exampleLine, charCounter } = this.state
    let firstChar = exampleLine.join(" ")[charCounter]
    this.setState({ btnHighlighted: firstChar })
  }

  charPerMinuteCounter = (inputValue, timeCounter) => {          // подсчет символов в минуту
    return Math.round((60 / timeCounter) * inputValue.length)
  }

  errorsPerLineCounter = (exampleLine, errors) => {   // подсчет ошибок в строке
    return ((errors * 100) / exampleLine.join("").length).toFixed(2)
  }

  modeSwitcherHandler = (e) => {
    this.setState({
      mode: e.target.value,   //изменение режима при переключении radioButtons
      inputValue: "",
      charCounter: 0,
      exampleLine: this.setExampleLine(),
      timeCounter: 1,
      errors: 0,
    })
    this.firstCharButtonHightlighting()
    clearInterval(this.timerId)
    this.timerId = 0
  }

  keyDownHandler = (e) => {
    let { inputValue, exampleLine, charCounter, errors } = this.state
    let nextButton = exampleLine.join(" ").split("")[charCounter + 1]

    if (e.key == exampleLine.join(" ").split("")[charCounter]) {
      this.setState({
        inputValue: inputValue + e.key,
        btnPressed: e.keyCode,
        btnHighlighted: nextButton,
        wrongButtonPressed: false,
        charCounter: charCounter + 1,
        userStartedTyping: true
      })

      this.setCountingInterval()
      this.statsCounter()
      this.exampleLineVsInputCompare(this.state.inputValue, exampleLine)

    } else {
      if (e.keyCode !== 9
        && e.keyCode !== 16
        && e.keyCode !== 17
        && e.keyCode !== 18
        && e.keyCode !== 20
        && e.keyCode !== 91) {
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
  }

  keyUpHandler = () => {
    this.setState({ btnPressed: null }) //завершение имитации нажатия клавиши на экранной клавиатуре
  }

  exampleLineVsInputCompare = (inputValue, exampleLine) => {
    if (inputValue == exampleLine.join(" ")) {
      clearInterval(this.timerId)
      this.timerId = 0
      this.setState({
        charCounter: 0,                                  // обнуляем счетчик
        inputValue: "",                                  // сбрасываем инпут
        exampleLine: this.setExampleLine(),
        userStartedTyping: false,
        timeCounter: 1,
        errors: 0
      })
      this.firstCharButtonHightlighting()
    }
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

  statsCounter = () => {
    let  {inputValue, exampleLine, errors, timeCounter } = this.state
    this.setState({
      charsPerMinute: this.charPerMinuteCounter(inputValue, timeCounter),
      errorsPerLine: this.errorsPerLineCounter(exampleLine, errors)
    })
  }

  componentWillMount() {
    this.setState({ exampleLine: this.setExampleLine() })
  }

  componentDidMount() {
    this.firstCharButtonHightlighting()
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
    return <div className="App" onChange={this.inputOnChange}>
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