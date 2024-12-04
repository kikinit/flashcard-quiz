import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'
import { QuizGame } from '../QuizGame'
import { ConsoleUIError } from '../errors/ConsoleUIError'

// Note: Direct testing for the default `input` handling (process.stdin) is omitted due to complexity in mocking stdin.
// The `ConsoleUI` class supports dependency injection for `input`, which is thoroughly tested here.
describe('ConsoleUI - Dependency Injection', () => {
  let mockOutput: jest.Mock
  let mockInput: jest.Mock
  let mockGame: jest.Mocked<QuizGame>
  let sut: ConsoleUI

  beforeEach(() => {
    mockOutput = jest.fn()
    mockInput = jest.fn((callback: (input: string) => void) => callback('mock input'))

    // Mock the QuizGame instance.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
    } as unknown as jest.Mocked<QuizGame>

    sut = new ConsoleUI(mockInput, mockOutput, mockGame)
  })

  it('should call the input function with a callback', () => {
    const callback = jest.fn()
    mockInput(callback)

    expect(mockInput).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('mock input')
  })

  it('should use the output function to display a message', () => {
    sut['output']('Test message')

    expect(mockOutput).toHaveBeenCalledWith('Test message')
  })
})

describe('ConsoleUI - Method Functionality', () => {
  let sut: ConsoleUI
  let consoleSpy: jest.SpyInstance
  let mockGame: jest.Mocked<QuizGame>

  beforeEach(() => {
    // Spy on console.log for default output testing.
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    // Mock the QuizGame instance with necessary methods.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
      requestHint: jest.fn(),
    } as unknown as jest.Mocked<QuizGame>

    // Instantiate ConsoleUI with the mocked game.
    sut = new ConsoleUI(undefined, undefined, mockGame)
  })

  afterEach(() => {
    // Restore the console spy after each test.
    consoleSpy.mockRestore()
  })

  it('should display a question using default output', () => {
    const question = new Question(
      'What is 2 + 2?',
      ['3', '4', '5'],
      '4',
      ['It is the square root of 16', 'It is not a prime number', 'It is greater than 3', 'It is even']
    )

    sut.displayQuestion(question)

    expect(consoleSpy).toHaveBeenCalledWith('What is 2 + 2?')
    expect(consoleSpy).toHaveBeenCalledWith('1. 3')
    expect(consoleSpy).toHaveBeenCalledWith('2. 4')
    expect(consoleSpy).toHaveBeenCalledWith('3. 5')
  })

  it('should process and validate user answers correctly', () => {
    // Mock the game responses.
    mockGame.checkAnswer.mockReturnValueOnce(true).mockReturnValueOnce(false)

    // Simulate correct answer.
    sut.processAnswer('1')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('1')
    expect(consoleSpy).toHaveBeenCalledWith('Correct!')

    // Simulate incorrect answer.
    sut.processAnswer('2')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('2')
    expect(consoleSpy).toHaveBeenCalledWith('Wrong answer!')
  })

  it('should throw a ConsoleUIError for any error', () => {
    // Case 1: Throw a known Error.
    mockGame.checkAnswer.mockImplementationOnce(() => {
      throw new Error('Known error')
    })

    expect(() => sut.processAnswer('A')).toThrow(ConsoleUIError)

    // Case 2: Throw an unknown error.
    mockGame.checkAnswer.mockImplementationOnce(() => {
      throw 'Unknown error'
    })

    expect(() => sut.processAnswer('B')).toThrow(ConsoleUIError)
  })

  it('should request and display a hint for the current question', () => {
    // Mock the game to return a hint.
    const mockHint = 'This is a hint'
    mockGame.requestHint.mockReturnValue(mockHint)

    sut.requestHint()

    expect(mockGame.requestHint).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(`Hint: ${mockHint}`)
  })

  it('should throw a ConsoleUIError for errors during hint requests', () => {
    // Mock the game to throw an error for hint requests.
    mockGame.requestHint.mockImplementation(() => {
      throw new Error('Game error')
    })

    expect(() => sut.requestHint()).toThrow(ConsoleUIError)
  })
})
