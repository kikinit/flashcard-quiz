import { Question } from './Question'
import { DuplicateQuestionError, QuestionNotFoundError } from './errors'

export class QuestionBank {
  private questions: Question[] = []

  public addQuestion(question: Question): void {
    if (this.questions.includes(question)) {
      throw new DuplicateQuestionError()
    }
    this.questions.push(question)
  }
  

  public getRandomQuestion(): Question {
    const randomIndex = Math.floor(Math.random() * this.questions.length)
    return this.questions[randomIndex]
  }

  public removeQuestion(question: Question): void {
    if (!this.questions.includes(question)) {
      throw new QuestionNotFoundError()
    }
    this.questions = this.questions.filter(q => q !== question)
  }
}
