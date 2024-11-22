import { Question } from './Question'
import { QuestionBank } from './QuestionBank'

export class QuizGame {
  private questionBank: QuestionBank
  private currentQuestion: Question | null = null

  constructor(questionBank: QuestionBank) {
    this.questionBank = questionBank
  }

  public getNextQuestion(): Question {
    this.currentQuestion = this.questionBank.getRandomQuestion()
    return this.currentQuestion
  }

  public checkAnswer(answer: string): boolean {
    if (!this.currentQuestion) {
      throw new Error('No current question to check an answer against.')
    }
    return this.currentQuestion.checkAnswer(answer)
  }
}
