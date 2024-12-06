export class QuizControllerError extends Error {
  constructor(customErrorMessage: string = '[QuizControllerError] An unknown error occurred') {
    super(customErrorMessage)
    this.name = 'QuizControllerError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QuizControllerError)
    }
  }
}
