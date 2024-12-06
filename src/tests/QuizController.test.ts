import { QuizController } from '../QuizController'
import { QuizGame } from '../QuizGame'
import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'
import { QuizControllerError } from '../errors'

describe('QuizController', () => {
  let mockGame: jest.Mocked<QuizGame>
  let mockUI: jest.Mocked<ConsoleUI>
  let sut: QuizController

  beforeEach(() => {
    // Mock QuizGame instance with necessary methods.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
      requestHint: jest.fn(),
      restart: jest.fn(),
    } as unknown as jest.Mocked<QuizGame>

    // Mock ConsoleUI instance with necessary methods.
    mockUI = {
      start: jest.fn(),
      displayQuestion: jest.fn(),
      displayError: jest.fn()
    } as unknown as jest.Mocked<ConsoleUI>

    // Instantiate the controller.
    sut = new QuizController(mockGame, mockUI)
  })

  it('should initialize with a QuizGame and ConsoleUI', () => {
    expect(sut).toBeDefined()
    expect(sut['game']).toBe(mockGame)
    expect(sut['ui']).toBe(mockUI)
  })

  it('should invoke the start method in ConsoleUI in start method in QuizController', () => {
    sut.start()
    expect(mockUI.start).toHaveBeenCalled()
  })

  it('should throw QuizControllerError with correct message when starting the UI fails in start method', () => {
    // Mock `ui.start` to throw an error.
    mockUI.start.mockImplementation(() => {
      throw new Error('UI start error')
    })

    expect(() => sut.start()).toThrow(QuizControllerError)
    expect(() => sut.start()).toThrow('UI start error')

    expect(mockUI.displayQuestion).not.toHaveBeenCalled()
  })

  it('should get the next question from the game and display it via the UI in StartGame method', () => {
    // Mock the question object.
    const mockQuestion = { text: 'Mock question' } as unknown as Question
    mockGame.getNextQuestion.mockReturnValue(mockQuestion)
  
    // Call the method.
    sut.startGame()
  
    // Verify interactions.
    expect(mockGame.getNextQuestion).toHaveBeenCalled()
    expect(mockUI.displayQuestion).toHaveBeenCalledWith(mockQuestion)
  })

  it('should throw QuizControllerError with correct message when starting the game fails in startGame method', () => {
    // Mock `getNextQuestion` to throw an error.
    mockGame.getNextQuestion.mockImplementation(() => {
      throw new Error('Game start error')
    })

    expect(() => sut.startGame()).toThrow(QuizControllerError)
    expect(() => sut.startGame()).toThrow('Game start error')

    expect(mockUI.displayQuestion).not.toHaveBeenCalled()
  })

  it('should retrieve the next question and display it via the UI in showNextQuestion method', () => {
    const mockQuestion = { getText: jest.fn(), getOptions: jest.fn() } as unknown as Question
    mockGame.getNextQuestion.mockReturnValue(mockQuestion)
  
    sut.showNextQuestion()
  
    expect(mockGame.getNextQuestion).toHaveBeenCalled()
    expect(mockUI.displayQuestion).toHaveBeenCalledWith(mockQuestion)
  })
 
  it('should throw QuizControllerError with correct message when retrieving the next question fails', () => {
    // Mock `getNextQuestion` to throw an error.
    mockGame.getNextQuestion.mockImplementation(() => {
      throw new Error('Original game error')
    })
  
    expect(() => sut.showNextQuestion()).toThrow(QuizControllerError)
    expect(() => sut.showNextQuestion()).toThrow('Original game error')
  
    expect(mockUI.displayQuestion).not.toHaveBeenCalled()
  })

  it('should return true for a correct answer in handleAnswer method', () => {
    mockGame.checkAnswer.mockReturnValueOnce(true)
  
    const result = sut.handleAnswer('A')
    expect(result).toBe(true)
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('A')
  })
  
  it('should return false for an incorrect answer in handleAnswer method', () => {
    mockGame.checkAnswer.mockReturnValueOnce(false)
  
    const result = sut.handleAnswer('B')
    expect(result).toBe(false)
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('B')
  })

  it('should throw QuizControllerError with correct message when processing an answer fails in handleAnswer method', () => {
    // Mock `checkAnswer` to throw an error.
    mockGame.checkAnswer.mockImplementation(() => {
      throw new Error('Answer processing error')
    })

    expect(() => sut.handleAnswer('A')).toThrow(QuizControllerError)
    expect(() => sut.handleAnswer('A')).toThrow('Answer processing error')

    expect(mockUI.displayQuestion).not.toHaveBeenCalled()
  })

  it('should execute the wrapped function without errors using handleErrors template method', () => {
    const mockFunction = jest.fn()
    // Wrap the mock function in handleErrors via a public method
    sut['handleErrors'](mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should throw QuizControllerError for known errors using handleErrors template method', () => {
    const mockFunction = jest.fn(() => {
      throw new Error('Known error')
    })
    expect(() => sut['handleErrors'](mockFunction)).toThrow(QuizControllerError)
    expect(() => sut['handleErrors'](mockFunction)).toThrow('Known error')
  })

  it('should throw QuizControllerError for unknown errors using handleErrors template method', () => {
    const mockFunction = jest.fn(() => {
      throw 'Unknown error'
    })
    expect(() => sut['handleErrors'](mockFunction)).toThrow(QuizControllerError)
    expect(() => sut['handleErrors'](mockFunction)).toThrow('[QuizControllerError] An unknown error occurred')
  })
})
