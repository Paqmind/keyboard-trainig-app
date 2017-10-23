import React, { Component } from 'react'
import Rx from 'rxjs'
import Input from './Input'
import ExampleLine from './ExampleLine'
import Keyboard from './Keyboard'
import '../styles/index.css'

class Main extends Component {
  constructor(props) {
    super(props)
    let {words} = this.props.words
    this.state = {
      inputValue: '',
      exampleLine: words
    }
  }

  componentDidMount() {
    let {inputValue, exampleLine} = this.state
    let keyDown = Rx.Observable.fromEvent(document, 'keydown'),
      keyUp = Rx.Observable.fromEvent(document, 'keyup'),
      charCounter = 0,
      exampleArray = exampleLine.join(' ').split(''), //массив для побуквенного сравнения с инпутом
      spaceButton = document.getElementsByClassName('spacebar')

    keyDown.subscribe(e => {
      let nextButton = document.getElementsByClassName(exampleArray[charCounter + 1]),
        prevButton = document.getElementsByClassName(exampleArray[charCounter]),
        currentButton = document.getElementsByClassName(e.keyCode)

      if (e.key == exampleArray[charCounter]) { //проверка на соответстиве нажатой клавиши и строки-примера
        this.setState({inputValue: this.state.inputValue + e.key}) //если соответствует отображаем в строке инпута
        currentButton[0].classList.add('keydown') // имитация нажатия кнопки на экранной клавиатуре

      if (prevButton.length > 0) { //проверка для удаления подсветки на предыдущей кнопке
        prevButton[0].classList.remove('selected-button')
      } else {
        spaceButton[0].classList.remove('selected-button')
      }

      if (nextButton.length > 0) { //проверка для подсветки следующей кнопки
        nextButton[0].classList.add('selected-button')
      } else {
        spaceButton[0].classList.add('selected-button')
      }

      charCounter++
      }
    })

    keyUp.subscribe(e => {
      let currentButton = document.getElementsByClassName(e.keyCode)
      currentButton[0].classList.remove('keydown') //завершение имитации нажатия клавиши на экранной клавиатуре
    })
  }


  render() {
    let {inputValue, exampleLine} = this.state
    return <div className="App">
      <Input value={inputValue}/>
      <ExampleLine value={exampleLine}/>
      <Keyboard/>
    </div>
  }
}

export default Main