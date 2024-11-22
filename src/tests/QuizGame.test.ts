import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'
import { NoCurrentQuestionError, NoMoreQuestionsError } from '../errors'

describe('QuizGame', () => {
  let questionBank: QuestionBank
  let sut: QuizGame

  // Grouped data for question A.
  const questionA = {
    text: 'What does the term "hoisting" mean in JavaScript?',
    options: ['Variable declaration', 'Loop optimization', 'Runtime scope'],
    correctAnswer: 'Variable declaration',
    wrongAnswer: 'Loop optimization',
  }

  // Grouped data for question B.
  const questionB = {
    text: 'Which HTTP status code is used when a resource is successfully created?',
    options: ['200', '201', '204'],
    correctAnswer: '201',
    wrongAnswer: '204',
  }

  beforeEach(() => {
    // Initialize QuestionBank and QuizGame.
    questionBank = new QuestionBank()
    sut = new QuizGame(questionBank)
  })

  // Helper for mocking getNextQuestion.
  const setupMockedCurrentQuestion = (question: Question) => {
    jest.spyOn(sut, 'getNextQuestion').mockImplementation(() => {
      sut['currentQuestion'] = question
      return question
    })
  }

  it('should fetch a random question from the QuestionBank', () => {
    const question1 = new Question(questionA.text, questionA.options, questionA.correctAnswer)
    const question2 = new Question(questionB.text, questionB.options, questionB.correctAnswer)

    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)

    const question = sut.getNextQuestion()
    expect([question1, question2]).toContainEqual(question)
  })

  it('should validate a submitted answer for the current question', () => {
    const mockedQuestion = new Question(questionA.text, questionA.options, questionA.correctAnswer)
    setupMockedCurrentQuestion(mockedQuestion)

    sut.getNextQuestion()

    expect(sut.checkAnswer(questionA.correctAnswer)).toBe(true)
    expect(sut.checkAnswer(questionA.wrongAnswer)).toBe(false)
  })

  it('should throw a NoCurrentQuestionError if checkAnswer is called without a current question', () => {
    expect(() => {
      sut.checkAnswer('Some answer')
    }).toThrow(NoCurrentQuestionError)
  })

  it('should track the player score based on correct and incorrect answers', () => {
    const mockedQuestion = new Question(questionA.text, questionA.options, questionA.correctAnswer)
    setupMockedCurrentQuestion(mockedQuestion)

    // Ensure the score starts at 0.
    expect(sut.getScore()).toBe(0)

    // Simulate a correct answer.
    sut.getNextQuestion()
    sut.checkAnswer(questionA.correctAnswer)
    expect(sut.getScore()).toBe(1)

    // Simulate a wrong answer.
    sut.checkAnswer(questionA.wrongAnswer)
    expect(sut.getScore()).toBe(1)
  })

  it('should end the game when all questions are attempted', () => {
    const question1 = new Question(questionA.text, questionA.options, questionA.correctAnswer)
    const question2 = new Question(questionB.text, questionB.options, questionB.correctAnswer)
    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)
  
    sut.getNextQuestion()
    sut.getNextQuestion()
    
    // Attempting to fetch another question should indicate the game is over.
    expect(() => sut.getNextQuestion()).toThrow(NoMoreQuestionsError)
  })
  
})
