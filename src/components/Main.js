import React, { Component } from "react"
import OptionalBar from "./optionalBar/OptionalBar"
import Input from "./Input"
import ExampleLine from "./exampleLine/ExampleLine"
import exampleLineGenerator from './exampleLine/exampleLineGenerator'
import Keyboard from "./keyboard/Keyboard"
import initialKeyboardState from './keyboard/initialKeyboardState'
import Footer from './Footer'
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    /*this.intId = 0                   // интервал для подсчета времени набора одной строки
    this.counter = 1                 // счетчик времени для расчета символов в секунду
    this.errorsCounter = 0           // счетчик ошибок набора в одной строке*/
    this.subscriptions = []          // массив функций removeEventListeners
    let { words } = this.props.words // массив слов из words.json файла
    this.state = {
      keyboard: initialKeyboardState,
      btnPressed: null,
      btnHighlighted: null,
      inputValue: "",
      exampleLine: [],
      exampleLineMaxWords: 15,       // максимальное колличество слов в exampleLine
      exampleLineMaxChars: 60,       // максимальное колличество символов в exampleLine
      mode: "beginner",
      wordsStore: words,
      wrongButtonPressed: false,
      charPerMinute: 0,              // количество символов в минуту
      errors: 0,                     // количество ошибок допущенных в одной строке
      charCounter: 0                 // счетчик для побуквенного сравнения инпута и строки-примера
    }
  }

  firstCharButtonHightlighting = () => {
    let { exampleLine, charCounter } = this.state
    let firstChar = exampleLine.join(" ")[charCounter]
    this.setState({btnHighlighted: firstChar})
  }

  /*setCountingInterval = () => {                             // запуск интервала для подсчета времени
    if (this.intId == 0) {                                  // набора одной строки
      this.intId = setInterval(() => this.counter++, 1000)
    }
  }

  charPerMinuteCounter = (inputValue, counter) => {          // подсчет символов в минуту
    return Math.round((60 / counter) * inputValue.length)
  }

  errorsPerLineCounter = (exampleLine, errorsCounter) => {   // подсчет ошибок в строке
    return ((errorsCounter * 100) / exampleLine.join("").length).toFixed(2)
  }*/

  modeSwitcherHandler = (e) => {
    this.setState({
      mode: e.target.value,   //изменение режима при переключении radioButtons
      inputValue: "",
      charCounter: 0,
      exampleLine: this.setExampleLine()
    })
    this.firstCharButtonHightlighting()

    /*if (e.target.value == "beginner") {
      clearInterval(this.intId)
      this.errorsCounter = 0
      this.counter = 1
      this.intId = 0
    } else if (e.target.value == "advanced") {
      clearInterval(this.intId)
      this.errorsCounter = 0
      this.counter = 1
      this.intId = 0
    }*/
  }

  keyDownHandler = (e) => {
    let { inputValue, exampleLine, charCounter} = this.state
    let nextButton = exampleLine.join(" ").split("")[charCounter + 1]

    if (e.key == exampleLine.join(" ").split("")[charCounter]) {
      this.setState({
        inputValue: inputValue + e.key,
        btnPressed: e.keyCode,
        btnHighlighted: nextButton,
        wrongButtonPressed: false,
        charCounter: charCounter + 1
      })

      //this.setCountingInterval()
      //this.statsCounter()

      if (this.state.inputValue == exampleLine.join(" ")) {
        /*this.errorsCounter = 0
        clearInterval(this.intId)
        this.intId = 0
        this.counter = 1*/
        this.setState({
          charCounter: 0,                                  // обнуляем счетчик
          inputValue: "",                                  // сбрасываем инпут
          exampleLine: this.setExampleLine()
        })
        this.firstCharButtonHightlighting()
      }
    } else {
      if (e.keyCode !== 9
        && e.keyCode !== 16
        && e.keyCode !== 17
        && e.keyCode !== 18
        && e.keyCode !== 20
        && e.keyCode !== 91) {
        /*this.errorsCounter++
        this.statsCounter()*/
        this.setState({ wrongButtonPressed: true })
        setTimeout(() => {
          this.setState({wrongButtonPressed: false})
        }, 300)
      }
    }
  }

  keyUpHandler = () => {
    this.setState({btnPressed: null}) //завершение имитации нажатия клавиши на экранной клавиатуре
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
    const {mode, wordsStore, exampleLineMaxWords, exampleLineMaxChars} = this.state
    const exampleLine = exampleLineGenerator(mode, wordsStore, exampleLineMaxWords, exampleLineMaxChars)
    return exampleLine
  }

  /*statsCounter = () => {
    let  {inputValue, exampleLine } = this.state
    this.setState({
      charPerMinute: this.charPerMinuteCounter(inputValue, this.counter),
      errors: this.errorsPerLineCounter(exampleLine, this.errorsCounter)
    })
  }*/

  componentWillMount() {
    this.setState({exampleLine: this.setExampleLine()})
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