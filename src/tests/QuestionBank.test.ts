import { QuestionBank } from '../QuestionBank'
import { QuestionFactory } from '../QuestionFactory'
import { Question } from '../Question'
import {
  DuplicateQuestionError,
  QuestionNotFoundError,
  NoMoreQuestionsError
} from '../errors'

describe('QuestionBank', () => {
  let sut: QuestionBank
  let factory: jest.Mocked<QuestionFactory>
  let mockQuestionA: Question
  let mockQuestionB: Question
  let mockQuestionC: Question

  const questionDataA = {
    text: 'What does the term "hoisting" mean in JavaScript?',
    options: ['Variable declaration', 'Loop optimization', 'Runtime scope'],
    correctAnswer: 'Variable declaration',
    hints: [
      'It describes a default behavior of JavaScript interpreters.',
      'This term applies to both var and function declarations but not to let and const.',
      'It ensures variables are accessible before initialization.',
      'It moves declarations to the top of their scope.'
    ]
  }

  const questionDataB = {
    text: 'Which HTTP status code is used when a resource is successfully created?',
    options: ['200', '201', '204'],
    correctAnswer: '201',
    hints: [
      'It signifies the successful creation of a resource, such as a new database entry.',
      'It is commonly used in REST APIs to indicate resource creation.',
      'This status code is often associated with creating new resources via POST requests.',
      'This code lies between 200 OK and 204 No Content.'
    ]
  }

  const questionDataC = {
    text: 'In SOLID design principles, what does the `S` stand for?',
    options: ['Single responsibility', 'Simple design', 'System dependency'],
    correctAnswer: 'Single responsibility',
    hints: [
      'It is essential for reducing unexpected side effects in software behavior.',
      'By adhering to this, you ensure changes to one part of the system do not cascade unnecessarily.',
      'It is about keeping classes focused, often expressed as having one reason to change.',
      'This principle focuses on ensuring each module has a clear and specific purpose.'
    ]
  }

  beforeEach(() => {
    mockQuestionA = new Question(
      questionDataA.text,
      questionDataA.options,
      questionDataA.correctAnswer,
      questionDataA.hints
    )
    mockQuestionB = new Question(
      questionDataB.text,
      questionDataB.options,
      questionDataB.correctAnswer,
      questionDataB.hints
    )
    mockQuestionC = new Question(
      questionDataC.text,
      questionDataC.options,
      questionDataC.correctAnswer,
      questionDataC.hints
    )

    // Mock the QuestionFactory.
    factory = {
      createQuestion: jest.fn((text, options, correctAnswer, hints) => {
        if (text === questionDataA.text) return mockQuestionA
        if (text === questionDataB.text) return mockQuestionB
        if (text === questionDataC.text) return mockQuestionC
        return new Question(text, options, correctAnswer, hints)
      })
    }

    sut = new QuestionBank(factory)
    sut.addQuestion(
      questionDataA.text,
      questionDataA.options,
      questionDataA.correctAnswer,
      questionDataA.hints
    )
    sut.addQuestion(
      questionDataB.text,
      questionDataB.options,
      questionDataB.correctAnswer,
      questionDataB.hints
    )
    sut.addQuestion(
      questionDataC.text,
      questionDataC.options,
      questionDataC.correctAnswer,
      questionDataC.hints
    )
  })

  it('should return a random question from the bank', () => {
    const randomQuestion = sut.getRandomQuestion()
    expect([mockQuestionA, mockQuestionB, mockQuestionC]).toContain(randomQuestion)
  })

  it('should remove a question from the QuestionBank', () => {
    sut.removeQuestion(mockQuestionB)

    const remainingQuestions = [mockQuestionA, mockQuestionC]
    const randomQuestion = sut.getRandomQuestion()

    expect(randomQuestion).not.toBe(mockQuestionB)
    expect(remainingQuestions).toContain(randomQuestion)
  })

  it('should throw a DuplicateQuestionError if a duplicate question is added', () => {
    expect(() => {
      sut.addQuestion(
        questionDataA.text,
        questionDataA.options,
        questionDataA.correctAnswer,
        questionDataA.hints
      )
    }).toThrow(DuplicateQuestionError)
  })

  it('should throw a QuestionNotFoundError if attempting to remove a question that does not exist', () => {
    const nonExistentQuestion = new Question(
      'What is Node.js primarily used for?',
      ['Frontend', 'Backend', 'Mobile apps'],
      'Backend',
      [
        'It uses a single-threaded, non-blocking model to handle concurrent connections efficiently.',
        'This technology is well-suited for real-time applications like chat and collaboration tools.',
        'Its ecosystem includes popular frameworks like Express.js.',
        'It allows JavaScript to be used beyond the browser.'
      ]
    )

    expect(() => {
      sut.removeQuestion(nonExistentQuestion)
    }).toThrow(QuestionNotFoundError)
  })

  it('should throw NoMoreQuestionsError when there are no questions left', () => {
    sut.removeQuestion(mockQuestionA)
    sut.removeQuestion(mockQuestionB)
    sut.removeQuestion(mockQuestionC)

    expect(() => sut.getRandomQuestion()).toThrow(NoMoreQuestionsError)
  })
})
