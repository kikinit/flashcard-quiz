import { Question } from '../Question'

describe('Question', () => {
  it('should create a question with text, options, and the correct answer', () => {
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

  it('should throw an error if the provided answer is not in the options', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')
  
    expect(() => question.checkAnswer('7')).toThrow(
      'Invalid answer: Answer must be one of the available options.'
    )
  })

  it('should return the first letter of the correct answer as a hint', () => {
    const question = new Question(
      'What is the capital of France?',
      ['Berlin', 'Stockholm', 'Paris'],
      'Paris'
    )
  
    expect(question.getHint()).toBe('P')
  })
  
})
