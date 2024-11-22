export class NoMoreQuestionsError extends Error {
  constructor() {
    super('No more questions available.')
    this.name = 'NoMoreQuestionsError'
  }
}
