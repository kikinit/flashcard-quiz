import { Question } from './Question'

export class QuestionBank {
  private questions: Question[] = []

  addQuestion(question: Question): void {
    this.questions.push(question)
  }

  getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * this.questions.length)
    return this.questions[randomIndex]
  }
}
