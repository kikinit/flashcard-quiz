import { Question } from './Question'
import { QuestionBank } from './QuestionBank'

export class QuizGame {
  private questionBank: QuestionBank

  constructor(questionBank: QuestionBank) {
    this.questionBank = questionBank
  }

  public getNextQuestion(): Question {
    return this.questionBank.getRandomQuestion()
  }
}
