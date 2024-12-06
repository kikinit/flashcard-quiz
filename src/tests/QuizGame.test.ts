import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'
import { QuestionFactory } from '../QuestionFactory'
import { Scoreboard } from '../Scoreboard'
import { NoCurrentQuestionError, GameOverError, MaxHintsLimitError } from '../errors'

describe('QuizGame', () => {
  let questionBank: QuestionBank
  let factory: jest.Mocked<QuestionFactory>
  let sut: QuizGame
  let scoreboard: Scoreboard

  // Mocked questions.
  let mockQuestionA: Question
  let mockQuestionB: Question

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
    text: 'What is the purpose of HTTP status codes?',
    options: ['Error signaling', 'Response status', 'Both'],
    correctAnswer: 'Both',
    hints: [
      'They help indicate the outcome of HTTP requests.',
      'They are part of the response from a web server.',
      'Codes like 404 are examples.',
      'They can also indicate redirection.'
    ]
  }

  // Helper to mock the current question
  const setupMockedCurrentQuestion = (question: Question) => {
    jest.spyOn(questionBank, 'getRandomQuestion').mockImplementation(() => question)
    sut.getNextQuestion()
  }

  beforeEach(() => {
    // Create mocked questions
    mockQuestionA = new Question(
      questionA.text,
      questionA.options,
      questionA.correctAnswer,
      questionA.hints
    )
    mockQuestionB = new Question(
      questionB.text,
      questionB.options,
      questionB.correctAnswer,
      questionB.hints
    )

    // Mock the factory. If text content is equal to existing mockQuestion, it returns the actual Question instead of creating a new. This way references to the same objects can be retrieved and utilized.
    factory = {
      createQuestion: jest.fn((text, options, correctAnswer, hints) => {
        if (text === questionA.text) return mockQuestionA
        if (text === questionB.text) return mockQuestionB
        return new Question(text, options, correctAnswer, hints)
      })
    }

    // Create an instance of Scoreboard.
    scoreboard = new Scoreboard()

    // Inject the mocked factory.
    questionBank = new QuestionBank(factory)
    sut = new QuizGame(questionBank, factory, scoreboard)

    // Add questions to the bank.
    questionBank.addQuestion(
      questionA.text,
      questionA.options,
      questionA.correctAnswer,
      questionA.hints
    )
    questionBank.addQuestion(
      questionB.text,
      questionB.options,
      questionB.correctAnswer,
      questionB.hints
    )
  })

  it('should fetch a random question from the QuestionBank', () => {
    const randomQuestion = sut.getNextQuestion()
    expect([mockQuestionA, mockQuestionB]).toContain(randomQuestion)
  })

  it('should validate a submitted answer for the current question', () => {
    setupMockedCurrentQuestion(mockQuestionA)

    expect(sut.checkAnswer(questionA.correctAnswer)).toBe(true)
    expect(sut.checkAnswer(questionA.wrongAnswer)).toBe(false)
  })

  it('should throw a NoCurrentQuestionError if checkAnswer is called without a current question', () => {
    expect(() => {
      sut.checkAnswer('Some answer')
    }).toThrow(NoCurrentQuestionError)
  })

  it('should track the player score based on correct and incorrect answers', () => {
    setupMockedCurrentQuestion(mockQuestionA)

    expect(sut.getScore()).toBe(0)

    sut.checkAnswer(questionA.correctAnswer)
    expect(sut.getScore()).toBe(10)

    sut.checkAnswer(questionA.wrongAnswer)
    expect(sut.getScore()).toBe(10)
  })

  it('should transition to GAME_OVER state after fetching the last question', () => {
    sut.getNextQuestion()
    sut.getNextQuestion()
    expect(sut.isGameOver()).toBe(true)
  })

  it('should prevent fetching a question after the game is over', () => {
    sut.getNextQuestion()
    sut.getNextQuestion()

    expect(() => sut.getNextQuestion()).toThrow(GameOverError)
  })

  it('should reset the game state, score, and attempted questions on restart', () => {
    setupMockedCurrentQuestion(mockQuestionA)

    sut.checkAnswer(questionA.correctAnswer)
    expect(sut.isGameOver()).toBe(false)

    sut.restart()

    expect(sut.isGameOver()).toBe(false)
    expect(sut.getScore()).toBe(0)
    expect(() => sut.getNextQuestion()).not.toThrow()
  })

  it('should hold the final score at the end of the game', () => {
    setupMockedCurrentQuestion(mockQuestionA)

    sut.checkAnswer(questionA.correctAnswer)

    expect(sut.getScore()).toBe(10)
    expect(sut.isGameOver()).toBe(false)
  })

  it('should deduct points for each hint requested and limit hints to 4', () => {
    setupMockedCurrentQuestion(mockQuestionA)

    sut.requestHint()
    expect(sut.getScore()).toBe(8)

    sut.requestHint()
    expect(sut.getScore()).toBe(6)

    sut.requestHint()
    sut.requestHint()
    expect(() => sut.requestHint()).toThrow(MaxHintsLimitError)
  })

  it('should delegate question creation to the factory', () => {
    sut.addQuestion(
      questionC.text,
      questionC.options,
      questionC.correctAnswer,
      questionC.hints
    )
  
    expect(factory.createQuestion).toHaveBeenCalledWith(
      questionC.text,
      questionC.options,
      questionC.correctAnswer,
      questionC.hints
    )
  })
  
})
