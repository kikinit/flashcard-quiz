import { Question } from './Question'

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

  public displayQuestion(question: Question) {
    this.output(question.getText())
    question.getOptions().forEach((option, index) => {
      this.output(`${index + 1}. ${option}`)
    })
  }
}
