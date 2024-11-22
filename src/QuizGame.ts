import { Question } from './Question'
import { QuestionBank } from './QuestionBank'
import { NoCurrentQuestionError } from './errors/NoCurrentQuestionError'

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
      throw new NoCurrentQuestionError()
    }
    return this.currentQuestion.checkAnswer(answer)
  }
}
