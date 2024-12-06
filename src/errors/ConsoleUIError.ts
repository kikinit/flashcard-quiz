export class ConsoleUIError extends Error {
  constructor(customErrorMessage: string = '[ConsoleUIError] An unknown error occurred') {
    super(customErrorMessage)
    this.name = 'ConsoleUIError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConsoleUIError)
    }
  }
}
