export class Question {
  constructor(
    private text: string,
    private options: string[],
    private answer: string
  ) {}

  getText(): string {
    return this.text
  }

  getOptions(): string[] {
    return this.options
  }

  getAnswer(): string {
    return this.answer
  }

  checkAnswer(input: string): boolean {
    if (!this.options.includes(input)) {
      throw new Error('Invalid answer: Answer must be one of the available options.')
    }
    return input === this.answer
  }
}
