export class MaxHintsLimitError extends Error {
  constructor() {
    super('Maximum number of hints reached.')
    this.name = 'MaxHintsLimitError'
  }
}
