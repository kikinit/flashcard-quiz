import { Question } from './Question'
import { QuestionBank } from './QuestionBank'
import { GameState } from './GameState'
import { NoCurrentQuestionError, GameOverError } from './errors'

export class QuizGame {
  private questionBank: QuestionBank
  private currentQuestion: Question | null = null
  private score: number = 0
  private gameState: GameState = GameState.PLAYING

  constructor(questionBank: QuestionBank) {
    this.questionBank = questionBank
  }

  public getNextQuestion(): Question {
    if (this.gameState === GameState.GAME_OVER) {
      throw new GameOverError()
    }

    this.currentQuestion = this.questionBank.getRandomQuestion()
  
    if (!this.questionBank.hasMoreQuestions()) {
      this.gameState = GameState.GAME_OVER 
    }
  
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

  public isGameOver(): boolean {
    return this.gameState === GameState.GAME_OVER
  }

  public restart(): void {
    this.gameState = GameState.PLAYING
    this.score = 0
    this.currentQuestion = null
    this.questionBank.resetAttemptedQuestions()
  }  
}
