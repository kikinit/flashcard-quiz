import { Scoreboard } from '../Scoreboard'

describe('Scoreboard', () => {
  let scoreboard: Scoreboard

  beforeEach(() => {
    scoreboard = new Scoreboard()
  })

  it('should start with a score of 0', () => {
    expect(scoreboard.getScore()).toBe(0)
  })
})
