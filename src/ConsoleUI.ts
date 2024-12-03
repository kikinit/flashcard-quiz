import { Question } from './Question'

export class ConsoleUI {
  displayQuestion(question: Question) {
    console.log(question.getText())
    question.getOptions().forEach((option, index) => {
      console.log(`${index + 1}. ${option}`)
    })
  }
}
