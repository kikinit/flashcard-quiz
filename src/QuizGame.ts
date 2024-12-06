import { Question } from './Question'
import { QuestionBank } from './QuestionBank'
import { Scoreboard } from './Scoreboard'
import { GameState } from './GameState'
import { NoCurrentQuestionError, GameOverError, MaxHintsLimitError } from './errors'

export class QuizGame {
  private readonly CORRECT_ANSWER_REWARD = 10
  private readonly HINT_PENALTY = 2
  private readonly MAX_HINTS = 4
  private hintsUsed: number = 0
  private questionBank: QuestionBank
  private currentQuestion: Question | null = null
  private gameState: GameState = GameState.PLAYING
  private scoreboard: Scoreboard

  constructor(questionBank: QuestionBank, scoreboard: Scoreboard) {
    this.questionBank = questionBank
    this.scoreboard = scoreboard
  }

  public addQuestion(questionData: {
    text: string,
    options: string[],
    correctAnswer: string,
    hints: string[]
  }): void {
    this.questionBank.addQuestion(
      questionData.text,
      questionData.options,
      questionData.correctAnswer,
      questionData.hints
    )
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
    const currentQuestion = this.ensureCurrentQuestion()
    const isCorrect = currentQuestion.checkAnswer(answer)
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

  public requestHint(): string {
    const currentQuestion = this.ensureCurrentQuestion()

    if (this.hintsUsed >= this.MAX_HINTS) {
      throw new MaxHintsLimitError()
    }

    this.hintsUsed++
    const hint = currentQuestion.getHint()
    const remainingReward = this.CORRECT_ANSWER_REWARD - this.hintsUsed * this.HINT_PENALTY
    const adjustedReward = Math.max(remainingReward, 2)
    this.scoreboard.resetScore()
    this.scoreboard.increaseScore(adjustedReward)

    return hint
  }

  private ensureCurrentQuestion(): Question {
    if (!this.currentQuestion) {
      throw new NoCurrentQuestionError()
    }
    return this.currentQuestion
  }
}
