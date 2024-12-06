import { QuizGame } from './QuizGame'
import { ConsoleUI } from './ConsoleUI'
import { QuizControllerError } from './errors'
import { UserAction } from './UserAction'

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

  public handleUserAction(action: UserAction, input?: string): void {
    switch (action) {
      case UserAction.REQUEST_HINT:
        this.requestHint()
        break
      case UserAction.NEXT_QUESTION:
        this.showNextQuestion()
        break
      case UserAction.SUBMIT_ANSWER:
        if (input) {
          this.handleAnswer(input)
        } else {
          this.ui.displayError('No answer provided')
        }
        break
      case UserAction.UNKNOWN:
      default:
        this.ui.displayError('Unknown command')
        break
    }
  }
  
  public showNextQuestion(): void {
    this.handleErrors(() => {
      if (this.game.isGameOver()) {
        this.endGame()
      } else {
        const nextQuestion = this.game.getNextQuestion()
        this.ui.displayQuestion(nextQuestion)
      }
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
