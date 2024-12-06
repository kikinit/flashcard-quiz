import { QuizGame } from './QuizGame'
import { ConsoleUI } from './ConsoleUI'
import { QuizControllerError } from './errors'

export class QuizController {
  private game: QuizGame
  private ui: ConsoleUI

  constructor(game: QuizGame, ui: ConsoleUI) {
    this.game = game
    this.ui = ui
  }

  public start(): void {
    this.handleErrors(() => {
      this.ui.start()
    })
  }

  public startGame(): void {
    this.handleErrors(() => {
      const nextQuestion = this.game.getNextQuestion()
      this.ui.displayQuestion(nextQuestion)
    })
  }

  public showNextQuestion(): void {
    this.handleErrors(() => {
      const nextQuestion = this.game.getNextQuestion()
      this.ui.displayQuestion(nextQuestion)
    })
  }
 
  public handleAnswer(input: string): boolean {
    return this.handleErrors(() => {
      const isCorrect = this.game.checkAnswer(input)
      return isCorrect
    })
  }

  public requestHint(): void {
    this.handleErrors(() => {
      const hint = this.game.requestHint()
      this.ui.displayHint(`Hint: ${hint}`)
    })
  }

  public endGame(): void {
    this.handleErrors(() => {
      const score = this.game.getScore()
      this.ui.displayEndGame(score)
    })
  }

  public restartGame(): void {
    this.handleErrors(() => {
      this.game.restart()
      this.ui.restartGame()
    })
  }

  private handleErrors<T>(fn: () => T): T {
    try {
      return fn()
    } catch (error) {
      const message = error instanceof Error ? error.message : undefined

      this.ui.displayError(message || 'An unexpected error occurred')

      throw new QuizControllerError(message)
    }
  }  
}
