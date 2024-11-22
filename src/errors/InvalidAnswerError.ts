export class InvalidAnswerError extends Error {
  constructor(invalidAnswer: string, availableOptions: string[]) {
    super(`Invalid answer: "${invalidAnswer}" is not one of the available options: ${availableOptions.join(', ')}`)
    this.name = 'InvalidAnswerError'
  }
}
