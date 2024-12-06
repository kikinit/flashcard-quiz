import { Question } from './Question'
import { QuizGame } from './QuizGame'
import { StartCommand } from './StartCommand'
import { ConsoleUIError } from './errors'

export class ConsoleUI {
  private game: QuizGame
  private input: (callback: (input: string) => void) => void
  private output: (message: string) => void

  constructor(
    game: QuizGame,
    input = (callback: (input: string) => void) => {
      process.stdin.on('data', (chunk: Buffer | string) => {
        const input = chunk.toString().trim()
        callback(input)
      })
    },
    output = console.log
  ) {
    this.game = game
    this.input = input
    this.output = output
  }
  
  public start(): StartCommand {
    this.output('Welcome to the Quiz Game!')
    this.output('Type "s" to start or "q" to quit.')

    let command: StartCommand = StartCommand.UNKNOWN

    this.input((userInput) => {
      if (userInput === 's') {
        command = StartCommand.START
      } else if (userInput === 'q') {
        this.output('Goodbye!')
        command = StartCommand.EXIT
      } else {
        this.output('Unknown command. Type "s" to play or "q" to quit.')
      }
    })
    return command
  }

  public displayQuestion(question: Question) {
    this.handleErrors(() => {
      this.output(question.getText())
      question.getOptions().forEach((option, index) => {
        this.output(`${index + 1}. ${option}`)
      })
    })
  }

  public requestHint(): void {
    this.handleErrors(() => {
      const hint = this.game.requestHint()
      this.output(`Hint: ${hint}`)
    })
  }

  public showAnswerFeedback(isCorrect: boolean): void {
    this.handleErrors(() => {
      this.output(isCorrect ? 'Correct!' : 'Wrong answer!')
    })
  }

  public restartGame(): void {
    this.handleErrors(() => {
      this.game.restart()
      this.output('Game has been restarted. You can start again!')
    })
  }

  public displayError(message: string): void {
    this.handleErrors(() => {
      this.output(message)
    })
  }
  
  private handleErrors(fn: () => void): void {
    try {
      fn()
    } catch (error) {
      const message = error instanceof Error ? error.message : undefined
      throw new ConsoleUIError(message)
    }
  }
}
