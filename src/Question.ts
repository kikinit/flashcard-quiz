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
      throw new Error('Invalid answer: Answer must be one of the available options.')
    }
    return input === this.getAnswer()
  }

  public getHint(): string {
    return this.answer.charAt(0)
  }

  private getAnswer(): string {
    return this.answer
  }
}
