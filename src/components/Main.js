import React, { Component } from "react"
import OptionalBar from "./OptionalBar"
import Input from "./Input"
import ExampleLine from "./ExampleLine"
import Keyboard from "./Keyboard"
import Footer from './Footer'
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    this.intId = 0                   // интервал для подсчета времени набора одной строки
    this.counter = 1                 // счетчик времени для расчета символов в секунду
    this.errorsCounter = 0           // счетчик ошибок набора в одной строке
    this.subscriptions = []          // массив функций removeEventListeners
    let { words } = this.props.words // массив слов из words.json файла
    this.state = {
      inputValue: "",
      exampleLine: [],
      mode: "beginner",
      wordsStore: words,
      charPerMinute: 0,              // количество символов в минуту
      errors: 0,                     // количество ошибок допущенных в одной строке
      charCounter: 0                 // счетчик для побуквенного сравнения инпута и строки-примера
    }
  }

  beginnerModeLineGenerator = (wordsStore) => { // метод генерирует строку из разных случайных слов
    let beginnerExampleLine = [],
      randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
    for (let i = 0; i < 50; i++) {
      if (beginnerExampleLine.join(" ").length <= 60) {
        beginnerExampleLine.push(randomWord)
      }
    }
    return beginnerExampleLine
  }

  advancedModeLineGenerator = (wordsStore) => { // метод генерирует строку из случайного повторяющегося слова
    let advancedExampleLine = []
    for (let i = 0; i < 50; i++) {
      let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
      if (advancedExampleLine.join(" ").length <= 60) {
        advancedExampleLine.push(randomWord)
      }
    }
    return advancedExampleLine
  }

  exampleLineInstaller = () => {
    let { wordsStore, mode } = this.state
    let exampleLine = []
    if (mode == 'beginner') {
      exampleLine = this.beginnerModeLineGenerator(wordsStore)
    } else if (mode == 'advanced') {
      exampleLine = this.advancedModeLineGenerator(wordsStore)
    }
    this.setState({ exampleLine })
  }

  firstCharButtonSelect = () => {
    let { exampleLine, charCounter } = this.state
    let firstChar = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter])
    firstChar[0].classList.add("selected-button")
  }

  exampleLineSelectingCleaner = () => { // снятие выделения уже набранных символов
    let selectedExampleLineChar = document.getElementsByClassName("example-line")
    for (let i = 0; i < selectedExampleLineChar.length; i++) {
      selectedExampleLineChar[i].classList.remove("pressed-button")
    }
  }

  selectedButtonsCleaner = () => {
    let buttons = document.getElementsByClassName("key")
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("selected-button")) {
        buttons[i].classList.remove("selected-button")
      }
    }
  }

  setCountingInterval = () => {                             // запуск интервала для подсчета времени
    if (this.intId == 0) {                                  // набора одной строки
      this.intId = setInterval(() => this.counter++, 1000)
    }
  }

  /*charPerMinuteCounter = () => {                                // отключение интервала
    let { inputValue } = this.state                            // и подсчет символов в минуту
    let stringLength = inputValue.length,
        time = this.counter,
        charPerMinute = Math.round((60 / time) * stringLength)
    this.setState({charPerMinute: charPerMinute})
  }

  errorsPerLineCounter = () => {
    let { exampleLine } = this.state
    let stringLength = exampleLine.join("").length,
        errors = this.errorsCounter,
        errorsPerLine = (errors * 100) / stringLength
    this.setState({ errors: errorsPerLine.toFixed(2) })
  }*/

  charPerMinuteCounter = (inputValue, counter) => {
    return Math.round((60 / counter) * inputValue.length)
  }

  errorsPerLineCounter = (exampleLine, errorsCounter) => {
    return ((errorsCounter * 100) / exampleLine.join("").length).toFixed(2)
  }

  statsCounter = () => {
    let {inputValue, exampleLine} = this.state
    this.setState({
      charPerMinute: this.charPerMinuteCounter(inputValue, this.counter),
      errors: this.errorsPerLineCounter(exampleLine, this.errorsCounter)
    })
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

  installModeSwitcherHandler = () => {
    let mode = document.getElementById("mode")
    mode.addEventListener("change", this.modeSwitcher)
    return () => {
      mode.removeEventListener("change", this.modeSwitcher)
    }
  }

  keyDownButtonHandler = (e) => {
    let { inputValue, exampleLine, mode, charCounter } = this.state
    let nextButton = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter + 1]),
      prevButton = document.getElementsByClassName(exampleLine.join(" ").split("")[charCounter]),
      selectedExampleLineChar = document.getElementsByClassName("example-line"),
      spaceButton = document.getElementsByClassName("spacebar"),
      currentButton = document.getElementsByClassName(e.keyCode)

    if (e.key == exampleLine.join(" ").split("")[charCounter]) { //проверка на соответстиве нажатой клавиши и строки-примера
      this.setState({ inputValue: inputValue + e.key }) //если соответствует отображаем в строке инпута
      currentButton[0].classList.add("keydown") // имитация нажатия кнопки на экранной клавиатуре
      selectedExampleLineChar[charCounter].classList.add("pressed-button") // выделение в строке-примере набранных символов

      this.setCountingInterval()
      //this.charPerMinuteCounter()
      this.statsCounter()

      if (nextButton.length > 0) { //проверка для подсветки следующей кнопки
        nextButton[0].classList.add("selected-button")
      } else {
        spaceButton[0].classList.add("selected-button")
      }

      if (prevButton.length > 0 && prevButton != nextButton) { //проверка для удаления подсветки на предыдущей кнопке
        prevButton[0].classList.remove("selected-button")
      } else {
        spaceButton[0].classList.remove("selected-button")
      }

      this.setState({ charCounter: charCounter + 1 })

      if (this.state.inputValue == exampleLine.join(" ")) {
        this.errorsCounter = 0
        clearInterval(this.intId)
        this.intId = 0
        this.counter = 1
        spaceButton[0].classList.remove("selected-button") // если строка инпута равна строке-примеру
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
        this.wrongButtonHandler()
        this.errorsCounter++
        this.statsInstaller()
      }
    }
  }

  installKeyDownButtonHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener("keydown", this.keyDownButtonHandler)
    return () => {
      input.removeEventListener("keydown", this.keyDownButtonHandler)
    }
  }

  keyUpButtonHandler = (e) => {
    let currentButton = document.getElementsByClassName(e.keyCode)
    currentButton[0].classList.remove("keydown") //завершение имитации нажатия клавиши на экранной клавиатуре
  }

  installKeyUpButtonHandler = () => {
    let input = document.getElementById("input")
    input.addEventListener('keyup', this.keyUpButtonHandler)
    return () => {
      input.removeEventListener('keyup', this.keyUpButtonHandler)
    }
  }

  wrongButtonHandler = () => {
    document.getElementById("input").style.backgroundColor = 'yellow'
    setTimeout(() => {
      document.getElementById("input").style.backgroundColor = ""
    }, 300)
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
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i]()
    }
  }

  render() {
    return <div className="App" onChange={this.inputOnChange}>
      <OptionalBar handler={e => this.modeSwitcher(e)} state={this.state} />
      <div className="divider"></div>
      <Input state={this.state} />
      <ExampleLine state={this.state} />
      <Keyboard />
      <Footer/>
    </div>
  }
}

export default Main