import React, { Component } from "react"
import OptionalBar from "./OptionalBar"
import Input from "./Input"
import ExampleLine from "./ExampleLine"
import Keyboard from "./Keyboard"
import initialKeyboardState from '../initialKeyboardState'
import Footer from './Footer'
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    this.intId = 0                   // интервал для подсчета времени набора одной строки
    this.counter = 1                 // счетчик времени для расчета символов в секунду
    this.errorsCounter = 0           // счетчик ошибок набора в одной строке
    this.subscriptions = []          // массив функций removeEventListeners
    this.exampleLineMaxLength = 15   // максимальное колличество слов в exampleLine
    let { words } = this.props.words // массив слов из words.json файла
    this.state = {
      keyboard: initialKeyboardState,
      btnPressed: 0,
      btnHighlighted: "",
      inputValue: "",
      exampleLine: [],
      mode: "beginner",
      wordsStore: words,
      wrongButtonPressed: false,
      charPerMinute: 0,              // количество символов в минуту
      errors: 0,                     // количество ошибок допущенных в одной строке
      charCounter: 0                 // счетчик для побуквенного сравнения инпута и строки-примера
    }
  }

  beginnerModeLineGenerator = (wordsStore) => { // метод генерирует строку из разных случайных слов
    let beginnerExampleLine = [],
      randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
    for (let i = 0; i < this.exampleLineMaxLength; i++) {
      if (beginnerExampleLine.join(" ").length <= 60) {
        beginnerExampleLine.push(randomWord)
      }
    }
    return beginnerExampleLine
  }

  advancedModeLineGenerator = (wordsStore) => { // метод генерирует строку из случайного повторяющегося слова
    let advancedExampleLine = []
    for (let i = 0; i < this.exampleLineMaxLength; i++) {
      let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
      if (advancedExampleLine.join(" ").length <= 60) {
        advancedExampleLine.push(randomWord)
      }
    }
    return advancedExampleLine
  }

  firstCharButtonSelect = () => {
    let { exampleLine, charCounter } = this.state
    let firstChar = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter])
    firstChar[0].classList.add("key-highlighted")
  }

  exampleLineSelectingCleaner = () => { // снятие выделения уже набранных символов
    let selectedExampleLineChar = document.getElementsByClassName("example-line")
    for (let i = 0; i < selectedExampleLineChar.length; i++) {
      selectedExampleLineChar[i].classList.remove("typed-button")
    }
  }

  selectedButtonsCleaner = () => {
    let buttons = document.getElementsByClassName("key")
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("key-highlighted")) {
        buttons[i].classList.remove("key-highlighted")
      }
    }
  }

  setCountingInterval = () => {                             // запуск интервала для подсчета времени
    if (this.intId == 0) {                                  // набора одной строки
      this.intId = setInterval(() => this.counter++, 1000)
    }
  }

  charPerMinuteCounter = (inputValue, counter) => {          // подсчет символов в минуту
    return Math.round((60 / counter) * inputValue.length)
  }

  errorsPerLineCounter = (exampleLine, errorsCounter) => {   // подсчет ошибок в строке
    return ((errorsCounter * 100) / exampleLine.join("").length).toFixed(2)
  }

  modeSwitcher = (e) => {
    this.setState({ mode: e.target.value }) //изменение состояния при переключении radioButtons
    this.exampleLineInstaller()

    if (e.target.value == "beginner") {
      this.setState({ inputValue: "", charCounter: 0 })
      this.selectedButtonsCleaner()
      this.firstCharButtonSelect() // выделение первой кнопки строки-примера из нового сотояния
      this.exampleLineSelectingCleaner()
      clearInterval(this.intId)
      this.errorsCounter = 0
      this.counter = 1
      this.intId = 0
    } else if (e.target.value == "advanced") {
      this.setState({ inputValue: "", charCounter: 0 })
      this.selectedButtonsCleaner()
      this.firstCharButtonSelect()
      this.exampleLineSelectingCleaner()
      clearInterval(this.intId)
      this.errorsCounter = 0
      this.counter = 1
      this.intId = 0
    }
  }

  keyDownButtonHandler = (e) => {
    let { inputValue, exampleLine, mode, charCounter } = this.state
    let nextButton = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter + 1]),
      prevButton = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter]),
      selectedExampleLineChar = document.getElementsByClassName("example-line"),
      spaceButton = document.getElementsByClassName("spacebar")

    if (e.key == exampleLine.join(" ").split("")[charCounter]) { //проверка на соответстиве нажатой клавиши и строки-примера
      this.setState({ inputValue: inputValue + e.key }) //если соответствует отображаем в строке инпута
      this.setState({btnPressed: e.keyCode}) // имитация нажатия кнопки на экранной клавиатуре
      selectedExampleLineChar[charCounter].classList.add("typed-button") // выделение в строке-примере набранных символов

      this.setCountingInterval()
      this.statsCounter()
      this.setState({wrongButtonPressed: false})

      if (nextButton.length > 0) { //проверка для подсветки следующей кнопки
        nextButton[0].classList.add("key-highlighted")
      } else {
        spaceButton[0].classList.add("key-highlighted")
      }

      if (prevButton.length > 0 && prevButton != nextButton) { //проверка для удаления подсветки на предыдущей кнопке
        prevButton[0].classList.remove("key-highlighted")
      } else {
        spaceButton[0].classList.remove("key-highlighted")
      }

      this.setState({ charCounter: charCounter + 1 })

      if (this.state.inputValue == exampleLine.join(" ")) {
        this.errorsCounter = 0
        clearInterval(this.intId)
        this.intId = 0
        this.counter = 1
        spaceButton[0].classList.remove("key-highlighted") // если строка инпута равна строке-примеру
        this.exampleLineSelectingCleaner()
        this.setState({
          charCounter: 0,                                  // обнуляем счетчик
          inputValue: ""                                   // сбрасываем инпут
        })
        this.exampleLineInstaller()
        this.firstCharButtonSelect()
      }
    } else {
      if (e.keyCode !== 9
        && e.keyCode !== 16
        && e.keyCode !== 17
        && e.keyCode !== 18
        && e.keyCode !== 20
        && e.keyCode !== 91) {
        this.errorsCounter++
        this.statsCounter()
        this.setState({ wrongButtonPressed: true })
      }
    }
  }

  keyUpButtonHandler = () => {
    this.setState({btnPressed: 0}) //завершение имитации нажатия клавиши на экранной клавиатуре
  }

  installModeSwitcherHandler = () => {
    let mode = document.getElementById("mode")
    mode.addEventListener("change", this.modeSwitcher)
    return () => {
      mode.removeEventListener("change", this.modeSwitcher)
    }
  }

  installKeyDownButtonHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener("keydown", this.keyDownButtonHandler)
    return () => {
      input.removeEventListener("keydown", this.keyDownButtonHandler)
    }
  }

  installKeyUpButtonHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener('keyup', this.keyUpButtonHandler)
    return () => {
      input.removeEventListener('keyup', this.keyUpButtonHandler)
    }
  }

  statsCounter = () => {
    let  {inputValue, exampleLine } = this.state
    this.setState({
      charPerMinute: this.charPerMinuteCounter(inputValue, this.counter),
      errors: this.errorsPerLineCounter(exampleLine, this.errorsCounter)
    })
  }

  exampleLineInstaller = () => {
    let { wordsStore, mode } = this.state
    let exampleLine = []
    if (mode == 'beginner') {
      exampleLine = this.beginnerModeLineGenerator(wordsStore)
    } else if (mode == 'advanced') {
      exampleLine = this.advancedModeLineGenerator(wordsStore)
    } else {
      exampleLine = []
    }
    this.setState({ exampleLine })
  }

  componentWillMount() {
    this.exampleLineInstaller()
  }

  componentDidMount() {
    this.firstCharButtonSelect()
    this.subscriptions.push(this.installModeSwitcherHandler())
    this.subscriptions.push(this.installKeyDownButtonHandler())
    this.subscriptions.push(this.installKeyUpButtonHandler())
  }

  componentWillUnmount() {
    for (let i of this.subscriptions) {
      i()
    }
  }

  render() {
    return <div className="App" onChange={this.inputOnChange}>
      <OptionalBar handler={e => this.modeSwitcher(e)} state={this.state} />
      <div className="divider"></div>
      <Input state={this.state} />
      <ExampleLine state={this.state} />
      <Keyboard state={this.state} />
      <Footer/>
    </div>
  }
}

export default Main