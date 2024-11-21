import { Question } from './Question'

export class QuestionBank {
  private questions: Question[] = []

  public addQuestion(question: Question): void {
    this.questions.push(question)
  }

  public getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * this.questions.length)
    return this.questions[randomIndex]
  }

  public removeQuestion(question: Question): void {
    this.questions = this.questions.filter(q => q !== question)
  }
}
