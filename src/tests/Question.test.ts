import { Question } from '../Question'

describe('Question', () => {
  it('should create a question with text, options, and the correct answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.getText()).toBe('What is 2 + 2?')
    expect(question.getOptions()).toEqual(['3', '4', '5'])
    expect(question.getAnswer()).toBe('4')
  })

  it('should validate a correct answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.checkAnswer('4')).toBe(true)
  })

  it('should invalidate an incorrect answer', () => {
    const question = new Question('What is 2 + 2?', ['3', '4', '5'], '4')

    expect(question.checkAnswer('3')).toBe(false)
  })
})
