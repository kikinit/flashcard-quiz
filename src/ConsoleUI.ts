import { Question } from './Question.js'
import { StartCommand } from './StartCommand.js'
import { UserAction } from './UserAction.js'
import { ConsoleUIError } from './errors/index.js'

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

    let userInput = ''
    this.input((input) => {
        userInput = input.trim().toLowerCase()
    })

    switch (userInput) {
        case 's':
            return StartCommand.START
        case 'q':
            return StartCommand.EXIT
        default:
            return StartCommand.UNKNOWN
    }
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

  public getUserInput(): UserAction {
    let userInput = ''
    this.handleErrors(() => {
      this.input((input) => {
        userInput = input.trim().toLowerCase()
      })
    })
  
    switch (userInput) {
      case 'h':
        return UserAction.REQUEST_HINT
      case 'n':
        return UserAction.NEXT_QUESTION
      case '1':
        return UserAction.SUBMIT_ANSWER_1
      case '2':
        return UserAction.SUBMIT_ANSWER_2
      case '3':
        return UserAction.SUBMIT_ANSWER_3
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

  public displayMessage(message: string): void {
    this.handleErrors(() => {
      this.output(message)
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
