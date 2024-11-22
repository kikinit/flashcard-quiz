import { Question } from './Question'
import { QuestionBank } from './QuestionBank'
import { Scoreboard } from './Scoreboard'
import { GameState } from './GameState'
import { NoCurrentQuestionError, GameOverError } from './errors'

export class QuizGame {
  private readonly CORRECT_ANSWER_REWARD = 1
  private questionBank: QuestionBank
  private currentQuestion: Question | null = null
  private gameState: GameState = GameState.PLAYING
  private scoreboard: Scoreboard = new Scoreboard()
  
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
      this.scoreboard.increaseScore(this.CORRECT_ANSWER_REWARD)
    }
    return isCorrect
  }

  public getScore(): number {
    return this.scoreboard.getScore()
  }

  public isGameOver(): boolean {
    return this.gameState === GameState.GAME_OVER
  }

  public restart(): void {
    this.gameState = GameState.PLAYING
    this.scoreboard.resetScore()
    this.currentQuestion = null
    this.questionBank.resetAttemptedQuestions()
  }  
}
