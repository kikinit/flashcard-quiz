import { QuizController } from '../QuizController'
import { QuizGame } from '../QuizGame'
import { ConsoleUI } from '../ConsoleUI'

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

    mockUI = {
      start: jest.fn(),
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

  it('should return true for a correct answer', () => {
    mockGame.checkAnswer.mockReturnValueOnce(true)
  
    const result = sut.handleAnswer('A')
    expect(result).toBe(true)
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('A')
  })
  
  it('should return false for an incorrect answer', () => {
    mockGame.checkAnswer.mockReturnValueOnce(false)
  
    const result = sut.handleAnswer('B')
    expect(result).toBe(false)
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('B')
  })  
})
