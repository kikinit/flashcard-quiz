import { Question } from '../Question'
import { InvalidAnswerError, NoMoreHintsError } from '../errors'

describe('Question', () => {
  let sut: Question

  const questionData = {
    text: 'What is the capital is is known for its iconic river, the Seine',
    options: ['Berlin', 'Stockholm', 'Paris'],
    correctAnswer:'3',
    hints: [
      'Many famous writers and philosophers, such as Victor Hugo and Jean-Paul Sartre, called this city home.',
      'It has neighborhoods like Montmartre and Le Marais, famous for their unique charm.',
      'This city is often associated with love and romantic getaways.',
      'Its name starts with "P".'
    ]
  }

  beforeEach(() => {
    sut = new Question(
      questionData.text,
      questionData.options,
      questionData.correctAnswer,
      questionData.hints
    )
  })

  it('should create a question with text, options, and a correct answer', () => {
    expect(sut.getText()).toBe(questionData.text)
    expect(sut.getOptions()).toEqual(questionData.options)
  })

  it('should validate a correct answer', () => {
    expect(sut.checkAnswer(questionData.correctAnswer)).toBe(true)
  })

  it('should invalidate an incorrect answer', () => {
    expect(sut.checkAnswer('2')).toBe(false)
  })

  it('should throw an InvalidAnswerError if the provided answer is not in the options', () => {
    expect(() => sut.checkAnswer('New York')).toThrow(InvalidAnswerError)
  })

  it('should return hints in sequential order and throw an error if all hints are used', () => {
    // Check sequential hints.
    expect(sut.getHint()).toBe(questionData.hints[0])
    expect(sut.getHint()).toBe(questionData.hints[1])
    expect(sut.getHint()).toBe(questionData.hints[2])
    expect(sut.getHint()).toBe(questionData.hints[3])

    // Check for error when all hints are used.
    expect(() => sut.getHint()).toThrow(NoMoreHintsError)
  })
})
