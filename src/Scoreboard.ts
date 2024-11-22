export class Scoreboard {
  private score: number = 0

  public getScore(): number {
    return this.score
  }

  public increaseScore(amount: number): void {
    this.score += amount
  }

  public resetScore(): void {
    this.score = 0
  }
}
