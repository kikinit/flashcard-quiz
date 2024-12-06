import { Question } from './Question'
import { StartCommand } from './StartCommand'
import { UserAction } from './UserAction'
import { ConsoleUIError } from './errors'

export class ConsoleUI {
  private input: (callback: (input: string) => void) => void
  private output: (message: string) => void

  constructor(
    input = (callback: (input: string) => void) => {
      process.stdin.on('data', (chunk: Buffer | string) => {
        const input = chunk.toString().trim()
        callback(input)
      })
    },
    output = console.log
  ) {
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

  public displayHint(message: string): void {
    this.handleErrors(() => {
      this.output(message)
    })
  }

  public handleUserInput(): UserAction {
    let userInput = ''
    this.handleErrors(() => {
      this.input((input) => {
        userInput = input.trim().toLowerCase()
      })
    })
  
    switch (userInput) {
      case 'h':
        return UserAction.REQUEST_HINT
      default:
        return UserAction.UNKNOWN
    }
  }

  public showAnswerFeedback(isCorrect: boolean): void {
    this.handleErrors(() => {
      this.output(isCorrect ? 'Correct!' : 'Wrong answer!')
    })
  }

  public displayEndGame(score: number): void {
    this.handleErrors(() => {
      this.output(`Game over! Your final score is ${score}.`)
      this.output('Type "r" to restart or "q" to quit.')
    })
  }

  public restartGame(): void {
    this.handleErrors(() => {
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
