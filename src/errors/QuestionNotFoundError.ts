export class QuestionNotFoundError extends Error {
  constructor() {
    super('The question is not in the QuestionBank.')
    this.name = 'QuestionNotFoundError'
  }
}
