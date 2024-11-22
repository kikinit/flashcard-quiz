import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { DuplicateQuestionError, QuestionNotFoundError, NoMoreQuestionsError } from '../errors'

describe('QuestionBank', () => {
  let sut: QuestionBank

  // Question data.
  const questionA = {
    text: 'What does the term "hoisting" mean in JavaScript?',
    options: ['Variable declaration', 'Loop optimization', 'Runtime scope'],
    correctAnswer: 'Variable declaration',
    wrongAnswer: 'Loop optimization',
    hints: [
      'It describes a default behavior of JavaScript interpreters.',
      'This term applies to both var and function declarations but not to let and const.',
      'It ensures variables are accessible before initialization.',
      'It moves declarations to the top of their scope.'
    ]
  }

  const questionB = {
    text: 'Which HTTP status code is used when a resource is successfully created?',
    options: ['200', '201', '204'],
    correctAnswer: '201',
    wrongAnswer: '204',
    hints: [
      'It signifies the successful creation of a resource, such as a new database entry.',
      'It is commonly used in REST APIs to indicate resource creation.',
      'This status code is often associated with creating new resources via POST requests.',
      'This code lies between 200 OK and 204 No Content.'
    ]
  }

  const questionC = {
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

  let question1: Question
  let question2: Question
  let question3: Question

  beforeEach(() => {
    question1 = new Question(
      questionA.text,
      questionA.options,
      questionA.correctAnswer,
      questionA.hints
    )
    question2 = new Question(
      questionB.text,
      questionB.options,
      questionB.correctAnswer,
      questionB.hints
    )
    question3 = new Question(
      questionC.text,
      questionC.options,
      questionC.correctAnswer,
      questionC.hints
    )

    sut = new QuestionBank()
    sut.addQuestion(question1)
    sut.addQuestion(question2)
    sut.addQuestion(question3)
  })

  it('should return a random question from the bank', () => {
    const randomQuestion = sut.getRandomQuestion()
    expect([question1, question2, question3]).toContain(randomQuestion)
  })

  it('should remove a question from the QuestionBank', () => {
    sut.removeQuestion(question2)

    // Verify question2 is removed.
    const randomQuestion = sut.getRandomQuestion()
    expect(randomQuestion).not.toBe(question2)

    // Verify question1 and question3 are still present.
    expect([question1, question3]).toContain(randomQuestion)
  })

  it('should throw a DuplicateQuestionError if a duplicate question is added', () => {
    expect(() => {
      sut.addQuestion(question1)
      sut.addQuestion(question1) // Add duplicate.
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
    const emptyQuestionBank = new QuestionBank()

    // Attempting to fetch a random question from an empty QuestionBank.
    expect(() => emptyQuestionBank.getRandomQuestion()).toThrow(NoMoreQuestionsError)
  })
})
