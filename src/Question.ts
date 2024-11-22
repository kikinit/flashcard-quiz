import { InvalidAnswerError } from './errors/InvalidAnswerError'

export class Question {
  constructor(
    private text: string,
    private options: string[],
    private answer: string
  ) {}

  public getText(): string {
    return this.text
  }

  public getOptions(): string[] {
    return this.options
  }

  public checkAnswer(input: string): boolean {
    if (!this.options.includes(input)) {
      throw new InvalidAnswerError(input, this.options)
    }
    return input === this.getAnswer()
  }

  public getHint(): string {
    const randomIndex = Math.floor(Math.random() * this.answer.length)
    return this.answer[randomIndex]
  }

  private getAnswer(): string {
    return this.answer
  }
}
