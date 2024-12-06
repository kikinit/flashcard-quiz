import { InvalidAnswerError, NoMoreHintsError } from './errors/index.js'

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
    const optionIndex = parseInt(input) - 1 // Convert input to 0-based index.
    if (isNaN(optionIndex) || optionIndex < 0 || optionIndex >= this.options.length) {
      throw new InvalidAnswerError(input, this.options)
    }
    return this.options[optionIndex] === this.getAnswer()
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
    const answerIndex = parseInt(this.answer) - 1
    return this.options[answerIndex]
  }
}
