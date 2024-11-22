import { Question } from '../Question'
import { InvalidAnswerError } from '../errors'

describe('Question', () => {
  let sut: Question
  const correctAnswer = 'Paris'

  beforeEach(() => {
    sut = new Question(
      'What is the capital of France?',
      ['Berlin', 'Stockholm', correctAnswer],
      correctAnswer
    )
  })

  it('should create a question with text, options, and a correct answer', () => {
    expect(sut.getText()).toBe('What is the capital of France?')
    expect(sut.getOptions()).toEqual(['Berlin', 'Stockholm', correctAnswer])
  })

  it('should validate a correct answer', () => {
    expect(sut.checkAnswer(correctAnswer)).toBe(true)
  })

  it('should invalidate an incorrect answer', () => {
    expect(sut.checkAnswer('Berlin')).toBe(false)
  })

  it('should throw an InvalidAnswerError if the provided answer is not in the options', () => {
    expect(() => sut.checkAnswer('New York')).toThrow(InvalidAnswerError)
  })

  it('should return a random letter from the correct answer as a hint', () => {
    const hint = sut.getHint()
    expect(correctAnswer.includes(hint)).toBe(true)
  })
})
