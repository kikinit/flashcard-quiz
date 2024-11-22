import { InvalidAnswerError, NoMoreHintsError } from './errors'

export class Question {
  private hintsUsed: number = 0

  constructor(
    private text: string,
    private options: string[],
    private answer: string,
    private hints: string[]
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
    if (this.hintsUsed >= this.hints.length) {
      throw new NoMoreHintsError()
    }
  
    const hint = this.hints[this.hintsUsed]
    this.hintsUsed++
    return hint
  }

  private getAnswer(): string {
    return this.answer
  }
}
