import { Scoreboard } from '../Scoreboard'

describe('Scoreboard', () => {
  let scoreboard: Scoreboard

  beforeEach(() => {
    scoreboard = new Scoreboard()
  })

  it('should start with a score of 0', () => {
    expect(scoreboard.getScore()).toBe(0)
  })

  it('should increase the score by a given amount', () => {
    scoreboard.increaseScore(10)
    expect(scoreboard.getScore()).toBe(10)
  })
})
