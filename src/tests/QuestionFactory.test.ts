import { QuestionFactory } from '../QuestionFactory'
import { Question } from '../Question'

describe('QuestionFactory', () => {
  let sut: QuestionFactory

  beforeEach(() => {
    sut = new QuestionFactory()
  })

  it('should create a Question object with the specified properties', () => {
    const questionText = 'What does the term "hoisting" mean in JavaScript?'
    const options = ['Variable declaration', 'Loop optimization', 'Runtime scope']
    const correctAnswer = 'Variable declaration'
    const hints = [
      'It describes a default behavior of JavaScript interpreters.',
      'This term applies to both var and function declarations but not to let and const.',
      'It ensures variables are accessible before initialization.',
      'It moves declarations to the top of their scope.'
    ]

    const question = sut.createQuestion(questionText, options, correctAnswer, hints)

    expect(question).toBeInstanceOf(Question)
    expect(question.getText()).toBe(questionText)
    expect(question.getOptions()).toEqual(options)
    expect(question['answer']).toBe(correctAnswer)
    expect(question['hints']).toEqual(hints)
  })
})
