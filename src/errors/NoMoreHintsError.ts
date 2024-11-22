export class NoMoreHintsError extends Error {
  constructor() {
    super('No more hints available.')
    this.name = 'NoMoreHintsError'
  }
}
