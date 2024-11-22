import { Question } from '../Question'
import { InvalidAnswerError } from '../errors'

describe('Question', () => {
  it('should create a question with text, options, and a correct answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.getText()).toBe('What is 2 + 2?')
    expect(question.getOptions()).toEqual(['3', '4', '5'])
  })

  it('should validate a correct answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.checkAnswer('4')).toBe(true)
  })

  it('should invalidate an incorrect answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.checkAnswer('3')).toBe(false)
  })

  it('should throw an InvalidAnswerError if the provided answer is not in the options', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')
  
    expect(() => question.checkAnswer('7')).toThrow(InvalidAnswerError)
  })

  it('should return a random letter from the correct answer as a hint', () => {
    const correctAnswer = 'Paris'
    const question = new Question(
      'What is the capital of France?',
      ['Berlin', 'Stockholm', correctAnswer],
      correctAnswer
    )
    const hint = question.getHint()
  
    expect(correctAnswer.includes(hint)).toBe(true)
  })
})
