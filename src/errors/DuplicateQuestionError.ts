export class DuplicateQuestionError extends Error {
  constructor() {
    super('The question is already in the QuestionBank.')
    this.name = 'DuplicateQuestionError'
  }
}
