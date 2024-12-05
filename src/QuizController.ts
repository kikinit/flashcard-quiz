import { QuizGame } from './QuizGame'
import { ConsoleUI } from './ConsoleUI'

export class QuizController {
  private game: QuizGame
  private ui: ConsoleUI

  constructor(game: QuizGame, ui: ConsoleUI) {
    this.game = game
    this.ui = ui
  }

  public start(): void {
    this.ui.start()
  }
}
