import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'
import { NoCurrentQuestionError } from '../errors'

describe('QuizGame', () => {
  let questionBank: QuestionBank
  let sut: QuizGame

  // Grouped data for question A.
  const questionA = {
    text: 'What does the term "hoisting" mean in JavaScript?',
    options: ['Variable declaration', 'Loop optimization', 'Runtime scope'],
    correctAnswer: 'Variable declaration',
  }

  // Grouped data for question B.
  const questionB = {
    text: 'Which HTTP status code is used when a resource is successfully created?',
    options: ['200', '201', '204'],
    correctAnswer: '201',
  }

  beforeEach(() => {
    // Create questions using the grouped data.
    const question1 = new Question(questionA.text, questionA.options, questionA.correctAnswer)
    const question2 = new Question(questionB.text, questionB.options, questionB.correctAnswer)

    // Initialize QuestionBank and add questions.
    questionBank = new QuestionBank()
    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)

    // Initialize the QuizGame system under test.
    sut = new QuizGame(questionBank)
  })

  it('should fetch a random question from the QuestionBank', () => {
    const question = sut.getNextQuestion()
    expect([
      new Question(questionA.text, questionA.options, questionA.correctAnswer),
      new Question(questionB.text, questionB.options, questionB.correctAnswer),
    ]).toContainEqual(question)
  })

  it('should validate a submitted answer for the current question', () => {
    jest.spyOn(sut, 'getNextQuestion').mockImplementation(() => {
      sut['currentQuestion'] = new Question(questionA.text, questionA.options, questionA.correctAnswer)
      return sut['currentQuestion']
    })

    sut.getNextQuestion()

    expect(sut.checkAnswer(questionA.correctAnswer)).toBe(true)
    expect(sut.checkAnswer(questionA.options[1])).toBe(false)
  })

  it('should throw a NoCurrentQuestionError if checkAnswer is called without a current question', () => {
    expect(() => {
      sut.checkAnswer('Some answer')
    }).toThrow(NoCurrentQuestionError)
  })
})
