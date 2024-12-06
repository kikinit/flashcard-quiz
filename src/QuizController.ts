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

  private handleErrors<T>(fn: () => T): T {
    try {
      return fn()
    } catch (error) {
      const message = error instanceof Error ? error.message : undefined
      throw new QuizControllerError(message)
    }
  }  
}
