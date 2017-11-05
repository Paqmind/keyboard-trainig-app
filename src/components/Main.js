import React, { Component } from 'react'
import Rx from 'rxjs'
import MenuBar from './MenuBar'
import Input from './Input'
import ExampleLine from './ExampleLine'
import Keyboard from './Keyboard'
import '../styles/index.css'

class Main extends Component {
  constructor(props) {
    super(props)
    let {words} = this.props.words //массив слов из words.json файла
    this.state = {
      inputValue: '',
      exampleLine: [],
      mode: 'beginner',
      wordsStore: words,
      charCounter: 0 // счетчик для побуквенного сравнения инпута и строки-примера
    }
  }


  onChange = () => {
    let defaultValue = Rx.Observable.of(this.state.inputValue)
    defaultValue.subscribe(e => {
      let beginnerButton = document.getElementById('beginner') // radioButtons для
      let advancedButton = document.getElementById('advanced') // переключения режима

      if (e == '') { // переключение режима доступно только при пустой строке ввода
        beginnerButton.disabled = false
        advancedButton.disabled = false
      } else {
        beginnerButton.disabled = true // когда строка ввода НЕ пуста
        advancedButton.disabled = true // radioButtons задизейблены
      }
    })
  }

  modeSwitcher = () => {
    let mode = Rx.Observable.fromEvent(document.getElementsByName('mode'), 'change')
    mode.subscribe(e => {
      this.setState({mode: e.target.value}) //изменение состояния при переключении radioButtons
    })
  }

  beginnerModeLineGenerator = () => { // метод генерирует строку из случайного повтоярющегося слова
    let {wordsStore} = this.state     // и добавляет эту строку в состояние exampleLine
    let beginnerExampleLine = []
    let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
    for (let i = 0; i < 50; i++) {
      if (beginnerExampleLine.join(' ').length <= 60) {
        beginnerExampleLine.push(randomWord)
      }
    }
    this.setState({exampleLine: beginnerExampleLine})
  }

  advancedModeLineGenerator = () => { // метод генерирует строку из разных случайных слов
    let {wordsStore} = this.state
    let advancedExampleLine = []
    for (let i = 0; i < 50; i++) {
      let randomWord = wordsStore[Math.floor(Math.random() * wordsStore.length)]
      if (advancedExampleLine.join(' ').length <= 60) {
        advancedExampleLine.push(randomWord)
      }
    }
    this.setState({exampleLine: advancedExampleLine})
  }

  keyDownButtonHandler = () => {
    let {inputValue, exampleLine, mode, charCounter} = this.state
    let keyDown = Rx.Observable.fromEvent(document.getElementsByClassName('input'), 'keydown')
    keyDown.subscribe(e => {
      console.log(this.state.exampleLine)
      let nextButton = document.getElementsByClassName(this.state.exampleLine.join(' ').split('')[this.state.charCounter + 1]),
        prevButton = document.getElementsByClassName(this.state.exampleLine.join(' ').split('')[this.state.charCounter]),
        spaceButton = document.getElementsByClassName('spacebar'),
        currentButton = document.getElementsByClassName(e.keyCode)

      if (e.key == this.state.exampleLine.join(' ').split('')[this.state.charCounter]) { //проверка на соответстиве нажатой клавиши и строки-примера
        this.setState({inputValue: this.state.inputValue + e.key}) //если соответствует отображаем в строке инпута
        currentButton[0].classList.add('keydown') // имитация нажатия кнопки на экранной клавиатуре

        if (nextButton.length > 0) { //проверка для подсветки следующей кнопки
          nextButton[0].classList.add('selected-button')
        } else {
          spaceButton[0].classList.add('selected-button')
        }

        if (prevButton.length > 0) { //проверка для удаления подсветки на предыдущей кнопке
          prevButton[0].classList.remove('selected-button')
        } else {
          spaceButton[0].classList.remove('selected-button')
        }

        this.setState({charCounter: this.state.charCounter + 1})

        if (this.state.inputValue == this.state.exampleLine.join(' ')) {
          spaceButton[0].classList.remove('selected-button') // если строка инпута равна строке-примеру
          this.setState({
            charCounter: 0,                                  // обнуляем счетчик
            inputValue: ''                                   // сбрасываем инпут
          })
          if (this.state.mode == 'beginner') {               // в зависимости от режима вызываем
            this.beginnerModeLineGenerator()                 // необходимый метод
          } else if (this.state.mode == 'advanced') {
            this.advancedModeLineGenerator()
          }
        }
      }
    })
  }


  componentWillMount() {
    if (this.state.mode == 'beginner') {
      this.beginnerModeLineGenerator()
    } else if (this.state.mode) {
      this.advancedModeLineGenerator()
    }
  }

  componentDidMount() {

    this.keyDownButtonHandler()

    let keyUp = Rx.Observable.fromEvent(document.getElementsByClassName('input'), 'keyup')



    let mode = Rx.Observable.fromEvent(document.getElementsByName('mode'), 'click')
      mode.subscribe(e => {
        if (e.target.value == 'beginner') {
          this.setState({
            inputValue: '',
            charCounter: 0
          })

          this.beginnerModeLineGenerator()
        } else if (e.target.value == 'advanced') {
          this.setState({
            inputValue: '',
            charCounter: 0
          })
          this.advancedModeLineGenerator()
        }
      })

      keyUp.subscribe(e => {
        let currentButton = document.getElementsByClassName(e.keyCode)
        currentButton[0].classList.remove('keydown') //завершение имитации нажатия клавиши на экранной клавиатуре
      })

  }


  render() {
    let {inputValue, exampleLine} = this.state;
    return <div className="App" onChange={this.onChange}>
      <MenuBar handler={e => this.modeSwitcher(e)}/>
      <Input value={inputValue}/>
      <ExampleLine value={exampleLine}/>
      <Keyboard/>
    </div>
  }
}

export default Main