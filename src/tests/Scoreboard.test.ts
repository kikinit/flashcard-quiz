import { Scoreboard } from '../Scoreboard'

describe('Scoreboard', () => {
  let sut: Scoreboard

  beforeEach(() => {
    sut = new Scoreboard()
  })

  it('should start with a score of 0', () => {
    expect(sut.getScore()).toBe(0)
  })

  it('should increase the score by a given amount', () => {
    sut.increaseScore(10)
    expect(sut.getScore()).toBe(10)
  })

  it('should reset the score to 0', () => {
    sut.increaseScore(10)
    sut.resetScore()
    expect(sut.getScore()).toBe(0)
  })
})
