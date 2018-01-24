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
    this.exampleLineMaxLength = 15   // максимальное колличество слов в exampleLine
    let { words } = this.props.words // массив слов из words.json файла
    this.state = {
      keyboard: [
        [
          {caption: "tab", pressed: false, hightlighted: false, code: 9, className: "key tab 9", id: "tab"},
          {caption: "Q", pressed: false, hightlighted: false, code: 81, className: "key q 81"},
          {caption: "W", pressed: false, hightlighted: false, code: 87, className: "key w 87"},
          {caption: "E", pressed: false, hightlighted: false, code: 69, className: "key e 69"},
          {caption: "R", pressed: false, hightlighted: false, code: 82, className: "key r 82"},
          {caption: "T", pressed: false, hightlighted: false, code: 84, className:"key t 84"},
          {caption: "Y", pressed: false, hightlighted: false, code: 89, className: "key y 89"},
          {caption: "U", pressed: false, hightlighted: false, code: 85, className: "key u 85"},
          {caption: "I", pressed: false, hightlighted: false, code: 73, className: "key i 73"},
          {caption: "O", pressed: false, hightlighted: false, code: 79, className: "key o 79"},
          {caption: "P", pressed: false, hightlighted: false, code: 80, className: "key p 80"},
          {caption: "[", pressed: false, hightlighted: false, code: 219, className: "key square-bracket 219 alt"},
          {caption: "]", pressed: false, hightlighted: false, code: 221, className: "key square-bracket 221 alt"},
          {caption: "\\", pressed: false, hightlighted: false, code: 220, className: "key slash 220 alt"}
        ],
        [
          {caption: "caps", pressed: false, hightlighted: false, code: 20, className: "key caps 20 alt", id: "caps"},
          {caption: "A", pressed: false, hightlighted: false, code: 65, className: "key a 65"},
          {caption: "S", pressed: false, hightlighted: false, code: 83, className: "key s 83"},
          {caption: "D", pressed: false, hightlighted: false, code: 68, className: "key d 68"},
          {caption: "F", pressed: false, hightlighted: false, code: 70, className: "key f 70"},
          {caption: "G", pressed: false, hightlighted: false, code: 71, className:"key g 71"},
          {caption: "H", pressed: false, hightlighted: false, code: 72, className: "key h 72"},
          {caption: "J", pressed: false, hightlighted: false, code: 74, className: "key j 74"},
          {caption: "K", pressed: false, hightlighted: false, code: 75, className: "key k 75"},
          {caption: "L", pressed: false, hightlighted: false, code: 76, className: "key l 76"},
          {caption: ":", pressed: false, hightlighted: false, code: 186, className: "key 186 alt"},
          {caption: "'", pressed: false, hightlighted: false, code: 222, className: "key 222 alt"},
          {caption: "return", pressed: false, hightlighted: false, code: 13, className: "key 13 alt", id: "enter"}
        ],
        [
          {caption: "shift", pressed: false, hightlighted: false, code: 16, className: "key 16 shiftleft"},
          {caption: "Z", pressed: false, hightlighted: false, code: 90, className: "key z 90"},
          {caption: "X", pressed: false, hightlighted: false, code: 88, className: "key x 88"},
          {caption: "C", pressed: false, hightlighted: false, code: 67, className: "key c 67"},
          {caption: "V", pressed: false, hightlighted: false, code: 86, className: "key v 86"},
          {caption: "B", pressed: false, hightlighted: false, code: 66, className: "key b 66"},
          {caption: "N", pressed: false, hightlighted: false, code: 78, className: "key n 78"},
          {caption: "M", pressed: false, hightlighted: false, code: 77, className: "key m 77"},
          {caption: ",", pressed: false, hightlighted: false, code: 188, className: "key 188 alt"},
          {caption: ".", pressed: false, hightlighted: false, code: 190, className: "key 190 alt"},
          {caption: "/", pressed: false, hightlighted: false, code: 191, className: "key 191 alt"},
          {caption: "shift", pressed: false, hightlighted: false, code: 61, className: "key 16 shiftright"},
        ]
      ],
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
      spaceButton = document.getElementsByClassName("spacebar"),
      currentButton = document.getElementsByClassName(e.keyCode)

    if (e.key == exampleLine.join(" ").split("")[charCounter]) { //проверка на соответстиве нажатой клавиши и строки-примера
      this.setState({ inputValue: inputValue + e.key }) //если соответствует отображаем в строке инпута
      currentButton[0].classList.add("keydown") // имитация нажатия кнопки на экранной клавиатуре
      selectedExampleLineChar[charCounter].classList.add("pressed-button") // выделение в строке-примере набранных символов

      this.setCountingInterval()
      this.statsCounter()
      this.setState({wrongButtonPressed: false})

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
        this.errorsCounter++
        this.statsCounter()
        this.setState({ wrongButtonPressed: true })
      }
    }
  }

  keyUpButtonHandler = (e) => {
    let currentButton = document.getElementsByClassName(e.keyCode)
    currentButton[0].classList.remove("keydown") //завершение имитации нажатия клавиши на экранной клавиатуре
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