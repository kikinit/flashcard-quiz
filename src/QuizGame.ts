import { Question } from './Question'
import { QuestionBank } from './QuestionBank'
import { NoCurrentQuestionError} from './errors'

export class QuizGame {
  private questionBank: QuestionBank
  private currentQuestion: Question | null = null
  private score: number = 0

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
    const isCorrect = this.currentQuestion.checkAnswer(answer)
    if (isCorrect) {
      this.score++
    }
    return isCorrect
  }

  public getScore(): number {
    return this.score
  }
}
