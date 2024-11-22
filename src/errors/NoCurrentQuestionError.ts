export class NoCurrentQuestionError extends Error {
  constructor() {
    super('No current question to check an answer against.')
    this.name = 'NoCurrentQuestionError'
  }
}
