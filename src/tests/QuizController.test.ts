import { QuizController } from '../QuizController'
import { QuizGame } from '../QuizGame'
import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'
import { StartCommand } from '../StartCommand'
import { UserAction } from '../UserAction'
import { QuizControllerError } from '../errors'

describe('QuizController', () => {
  let mockGame: jest.Mocked<QuizGame>
  let mockUI: jest.Mocked<ConsoleUI>
  let mockQuestion: jest.Mocked<Question>
  let sut: QuizController

  beforeEach(() => {
    // Mock QuizGame instance with necessary methods.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
      requestHint: jest.fn(),
      getScore: jest.fn(),
      isGameOver: jest.fn(),
      restart: jest.fn()
    } as unknown as jest.Mocked<QuizGame>

    // Mock ConsoleUI instance with necessary methods.
    mockUI = {
      start: jest.fn(),
      displayQuestion: jest.fn(),
      displayHint: jest.fn(),
      getUserInput: jest.fn(),
      displayMessage: jest.fn(),
      displayError: jest.fn(),
      displayEndGame: jest.fn(),
      restartGame: jest.fn()
    } as unknown as jest.Mocked<ConsoleUI>

    // Mock Question instance with necessary methods.
    mockQuestion = { 
      getText: jest.fn(),
      getOptions: jest.fn()
    } as unknown as jest.Mocked<Question>

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

  it('should start the game when command is StartCommand.START in handleStartCommand method', () => {
    const playGameSpy = jest.spyOn(sut, 'playGame')

    const result = sut.handleStartCommand(StartCommand.START)

    expect(result).toBe(true)
    expect(playGameSpy).toHaveBeenCalled()
    expect(mockUI.displayMessage).not.toHaveBeenCalled()
    expect(mockUI.displayError).not.toHaveBeenCalled()
  })

  it('should display a goodbye message and stop the game when command is StartCommand.EXIT in handleStartCommand method', () => {
    const result = sut.handleStartCommand(StartCommand.EXIT)

    expect(result).toBe(false)
    expect(mockUI.displayMessage).toHaveBeenCalledWith('Goodbye!')
    expect(mockUI.displayError).not.toHaveBeenCalled()
  })

  it('should display an error message and continue the game when command is StartCommand.UNKNOWN in handleStartCommand method', () => {
    const result = sut.handleStartCommand(StartCommand.UNKNOWN)

    expect(result).toBe(true)
    expect(mockUI.displayError).toHaveBeenCalledWith('Unknown command. Type "s" to play or "q" to quit.')
    expect(mockUI.displayMessage).not.toHaveBeenCalled()
  })

  it('should handle REQUEST_HINT action', () => {
    sut.handleUserAction(UserAction.REQUEST_HINT)

    expect(mockGame.requestHint).toHaveBeenCalled()
    expect(mockUI.displayHint).toHaveBeenCalled()
  })

  it('should handle NEXT_QUESTION action', () => {
    sut.handleUserAction(UserAction.NEXT_QUESTION)

    expect(mockGame.getNextQuestion).toHaveBeenCalled()
    expect(mockUI.displayQuestion).toHaveBeenCalled()
  })

  it('should handle SUBMIT_ANSWER_1 action', () => {
    sut.handleUserAction(UserAction.SUBMIT_ANSWER_1)

    expect(mockGame.checkAnswer).toHaveBeenCalledWith('1')
  })

  it('should handle SUBMIT_ANSWER_2 action', () => {
    sut.handleUserAction(UserAction.SUBMIT_ANSWER_2)

    expect(mockGame.checkAnswer).toHaveBeenCalledWith('2')
  })

  it('should handle SUBMIT_ANSWER_3 action', () => {
    sut.handleUserAction(UserAction.SUBMIT_ANSWER_3)

    expect(mockGame.checkAnswer).toHaveBeenCalledWith('3')
  })

  it('should display an error for UNKNOWN action', () => {
    sut.handleUserAction(UserAction.UNKNOWN)

    expect(mockUI.displayError).toHaveBeenCalledWith('Unknown command')
  })

  it('should retrieve the next question and display it via the UI when the game is not over in showNextQuestion method', () => {

    // Mock behavior
    mockGame.isGameOver.mockReturnValue(false)
    mockGame.getNextQuestion.mockReturnValue(mockQuestion)

    sut.showNextQuestion()

    expect(mockGame.isGameOver).toHaveBeenCalled()
    expect(mockGame.getNextQuestion).toHaveBeenCalled()
    expect(mockUI.displayQuestion).toHaveBeenCalledWith(mockQuestion)
    expect(mockUI.displayEndGame).not.toHaveBeenCalled()
  })

  it('should invoke endGame when the game is over in showNextQuestion method', () => {
    // Mock behavior.
    mockGame.isGameOver.mockReturnValue(true)

    sut.endGame = jest.fn()

    sut.showNextQuestion()

    expect(mockGame.isGameOver).toHaveBeenCalled()
    expect(mockGame.getNextQuestion).not.toHaveBeenCalled()
    expect(mockUI.displayQuestion).not.toHaveBeenCalled()
    expect(sut.endGame).toHaveBeenCalled()
  })

  it('should handle errors when retrieving the next question and display them via the UI in showNextQuestion method', () => {
    // Mock behavior
    mockGame.isGameOver.mockReturnValue(false)
    mockGame.getNextQuestion.mockImplementation(() => {
      throw new Error('Game question error')
    })

    expect(() => sut.showNextQuestion()).toThrow(QuizControllerError)
    expect(() => sut.showNextQuestion()).toThrow('Game question error')

    expect(mockUI.displayError).toHaveBeenCalledWith('Game question error')
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

  it('should request a hint from the game and display it via the UI in requestHint method', () => {
    // Mock the game to return a hint
    const mockHint = 'This is a hint'
    mockGame.requestHint.mockReturnValue(mockHint)
  
    sut.requestHint()
  
    expect(mockGame.requestHint).toHaveBeenCalled()

    expect(mockUI.displayHint).toHaveBeenCalledWith(`Hint: ${mockHint}`)
  })

  it('should handle errors when requesting a hint, display them via UI, and throw QuizControllerError in requestHint method', () => {
    // Mock the game to throw an error for hint requests.
    mockGame.requestHint.mockImplementation(() => {
      throw new Error('Game hint error')
    })
    
    expect(() => sut.requestHint()).toThrow(QuizControllerError)
    expect(() => sut.requestHint()).toThrow('Game hint error')
    
    expect(mockUI.displayError).toHaveBeenCalledWith('Game hint error')
  })

  it('should invoke UI displayEndGame with the correct score in endGame method', () => {
    mockGame.getScore.mockReturnValue(42)
  
    sut.endGame()
  
    expect(mockUI.displayEndGame).toHaveBeenCalledWith(42)
  })

  it('should handle errors when ending the game, display them via UI, and throw QuizControllerError in endGame method', () => {
    // Mock the game to throw an error when retrieving the score.
    mockGame.getScore.mockImplementation(() => {
      throw new Error('Game score error')
    })

    expect(() => sut.endGame()).toThrow(QuizControllerError)
    expect(() => sut.endGame()).toThrow('Game score error')

    expect(mockUI.displayError).toHaveBeenCalledWith('Game score error')
  })

  it('should restart the game and inform the UI in restartGame method', () => {
    sut.restartGame()
  
    expect(mockGame.restart).toHaveBeenCalled()
    expect(mockUI.restartGame).toHaveBeenCalled()
  })
  
  // TESTS FOR GLOBAL ÈRROR HANDLING IN TEMPLATE METHOD

  it('should execute the wrapped function without errors using handleErrors template method', () => {
    const mockFunction = jest.fn()
    // Wrap the mock function in handleErrors via a public method.
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
