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
    return input === this.answer
  }
}
