import { QuizGame } from './QuizGame'
import { ConsoleUI } from './ConsoleUI'
import { StartCommand } from './StartCommand'
import { UserAction } from './UserAction'
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

  public async playGame(): Promise<void> {
  }

  public handleStartCommand(command: StartCommand): boolean {
    switch (command) {
      case StartCommand.START:
        this.playGame()
        return true
      case StartCommand.EXIT:
        this.ui.displayMessage('Goodbye!')
        return false
      case StartCommand.UNKNOWN:
        this.ui.displayError('Unknown command. Type "s" to play or "q" to quit.')
        return true
    }
  }

  public handleUserAction(action: UserAction): void {
    switch (action) {
      case UserAction.REQUEST_HINT:
          this.requestHint()
          break
      case UserAction.NEXT_QUESTION:
          this.showNextQuestion()
          break
      case UserAction.SUBMIT_ANSWER_1:
      case UserAction.SUBMIT_ANSWER_2:
      case UserAction.SUBMIT_ANSWER_3:
          const answerIndex = parseInt(action.split('_')[2])
          this.handleAnswer(answerIndex.toString())
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
