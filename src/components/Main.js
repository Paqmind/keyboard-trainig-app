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
    let { words } = this.props.words // массив слов из words.json файла
    this.state = {
      inputValue: "",
      exampleLine: [],
      mode: "beginner",
      wordsStore: words,
      charPerMinute: 0,        // количество символов в минуту
      errors: 0,               // количество ошибок допущенных в одной строке
      charCounter: 0                 // счетчик для побуквенного сравнения инпута и строки-примера
    }
  }

  beginnerModeLineGenerator = () => { // метод генерирует строку из случайного повтоярющегося слова
    let { wordsStore } = this.state   // и добавляет эту строку в состояние exampleLine
    let beginnerExampleLine = [],
        randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
    for (let i = 0; i < 50; i++) {
      if (beginnerExampleLine.join(" ").length <= 60) {
        beginnerExampleLine.push(randomWord)
      }
    }
    this.setState({ exampleLine: beginnerExampleLine })
  }

  advancedModeLineGenerator = () => { // метод генерирует строку из разных случайных слов
    let { wordsStore } = this.state
    let advancedExampleLine = []
    for (let i = 0; i < 50; i++) {
      let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
      if (advancedExampleLine.join(" ").length <= 60) {
        advancedExampleLine.push(randomWord)
      }
    }
    this.setState({ exampleLine: advancedExampleLine })
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

  charPerMinuteCounter = () => {                                // отключение интервала
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
  }

  modeSwitcher = () => {
    document.getElementById("mode").addEventListener("change", e => {
      this.setState({ mode: e.target.value }) //изменение состояния при переключении radioButtons

      if (e.target.value == "beginner") {
        this.setState({ inputValue: "", charCounter: 0 })
        this.selectedButtonsCleaner()
        this.beginnerModeLineGenerator()
        this.firstCharButtonSelect() // выделение первой кнопки строки-примера из нового сотояния
        this.exampleLineSelectingCleaner()
        clearInterval(this.intId)
        this.errorsCounter = 0
        this.counter = 1
        this.intId = 0
      } else if (e.target.value == "advanced") {
        this.setState({ inputValue: "", charCounter: 0 })
        this.selectedButtonsCleaner()
        this.advancedModeLineGenerator()
        this.firstCharButtonSelect()
        this.exampleLineSelectingCleaner()
        clearInterval(this.intId)
        this.errorsCounter = 0
        this.counter = 1
        this.intId = 0
      }
    })
  }

  keyDownButtonHandler = () => {
    document.getElementById("input").addEventListener("keydown", e => {
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
        this.charPerMinuteCounter()

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
          if (mode == "beginner") {                          // в зависимости от режима вызываем
            this.beginnerModeLineGenerator()                 // необходимый метод
            this.firstCharButtonSelect()
          } else if (mode == "advanced") {
            this.advancedModeLineGenerator()
            this.firstCharButtonSelect()
          }
        }
      } else {
        if (e.keyCode!== 9
          && e.keyCode !== 16
          && e.keyCode !== 17
          && e.keyCode !== 18
          && e.keyCode !== 20
          && e.keyCode !== 91) {
          this.wrongButtonHandler()
          this.errorsCounter++
          this.errorsPerLineCounter()
        }
      }
    })
  }

  keyUpButtonHandler = () => {
    document.getElementById("input").addEventListener('keyup', e => {
      let currentButton = document.getElementsByClassName(e.keyCode)
      currentButton[0].classList.remove("keydown") //завершение имитации нажатия клавиши на экранной клавиатуре
    })
  }

  wrongButtonHandler = () => {
    document.getElementById("input").style.backgroundColor = 'yellow'
    let timerId = setTimeout(() => {
      document.getElementById("input").style.backgroundColor = ""
      clearTimeout(timerId)
    }, 300)
  }

  componentWillMount() {
    if (this.state.mode == "beginner") {
      this.beginnerModeLineGenerator()
    } else if (this.state.mode =="advanced") {
      this.advancedModeLineGenerator()
    }
  }

  componentDidMount() {
    this.firstCharButtonSelect()
    this.modeSwitcher()
    this.keyDownButtonHandler()
    this.keyUpButtonHandler()
  }

  render() {
    let { inputValue, exampleLine, charPerMinute, errors } = this.state;
    return <div className="App" onChange={this.inputOnChange}>
      <OptionalBar handler={e => this.modeSwitcher(e)} charPerMinute={charPerMinute} errors={errors} />
      <div className="divider"></div>
      <Input value={inputValue} />
      <ExampleLine value={exampleLine} />
      <Keyboard />
      <Footer/>
    </div>
  }
}

export default Main