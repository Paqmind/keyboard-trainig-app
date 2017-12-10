import React, { Component } from "react"
import OptionalBar from "./OptionalBar"
import Input from "./Input"
import ExampleLine from "./ExampleLine"
import Keyboard from "./Keyboard"
import "../styles/index.css"

class Main extends Component {
  constructor(props) {
    super(props)
    let { words } = this.props.words //массив слов из words.json файла
    this.state = {
      inputValue: "",
      exampleLine: [],
      mode: "beginner",
      wordsStore: words,
      charCounter: 0 // счетчик для побуквенного сравнения инпута и строки-примера
    }
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
      } else if (e.target.value == "advanced") {
        this.setState({ inputValue: "", charCounter: 0 })
        this.selectedButtonsCleaner()
        this.advancedModeLineGenerator()
        this.firstCharButtonSelect()
        this.exampleLineSelectingCleaner()
      }
    })
  }

  beginnerModeLineGenerator = () => { // метод генерирует строку из случайного повтоярющегося слова
    let { wordsStore } = this.state     // и добавляет эту строку в состояние exampleLine
    let beginnerExampleLine = []
    let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
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

  exampleLineSelectingCleaner = () => { // снятие выделения строки-примера желтым цветом
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
        selectedExampleLineChar[charCounter].classList.add("pressed-button") // выделение в строке-примере набранных символов желтым цветом

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
      }
    })
  }

  keyUpButtonHandler = () => {
    document.getElementById("input").addEventListener('keyup', e => {
      let currentButton = document.getElementsByClassName(e.keyCode)
      currentButton[0].classList.remove("keydown") //завершение имитации нажатия клавиши на экранной клавиатуре
    })
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
    let { inputValue, exampleLine } = this.state;
    return <div className="App" onChange={this.inputOnChange}>
      <OptionalBar handler={e => this.modeSwitcher(e)}/>
      <Input value={inputValue} />
      <ExampleLine value={exampleLine} />
      <Keyboard />
    </div>
  }
}

export default Main