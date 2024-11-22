export class GameOverError extends Error {
  constructor() {
    super('Game is over.')
    this.name = 'GameOverError'
  }
}
