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
  let ui: ConsoleUI

  beforeEach(() => {
    mockOutput = jest.fn()
    mockInput = jest.fn((callback: (input: string) => void) => callback('mock input'))

    // Mock the QuizGame instance.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
    } as unknown as jest.Mocked<QuizGame>

    ui = new ConsoleUI(mockInput, mockOutput, mockGame)
  })

  it('should call the input function with a callback', () => {
    const callback = jest.fn()
    mockInput(callback)

    expect(mockInput).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('mock input')
  })

  it('should use the output function to display a message', () => {
    ui['output']('Test message')

    expect(mockOutput).toHaveBeenCalledWith('Test message')
  })
})

describe('ConsoleUI - Method Functionality', () => {
  let ui: ConsoleUI
  let consoleSpy: jest.SpyInstance
  let mockGame: jest.Mocked<QuizGame>

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    // Mock the QuizGame instance.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
    } as unknown as jest.Mocked<QuizGame>

    ui = new ConsoleUI(undefined, undefined, mockGame)
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should display a question using default output', () => {
    const question = new Question(
      'What is 2 + 2?',
      ['3', '4', '5'],
      '4',
      ['It is the square root of 16', 'It is not a prime number', 'It is greater than 3', 'It is even']
    )

    ui.displayQuestion(question)

    expect(consoleSpy).toHaveBeenCalledWith('What is 2 + 2?')
    expect(consoleSpy).toHaveBeenCalledWith('1. 3')
    expect(consoleSpy).toHaveBeenCalledWith('2. 4')
    expect(consoleSpy).toHaveBeenCalledWith('3. 5')
  })

  it('should process and validate user answers correctly', () => {
    // Mock the game responses.
    mockGame.checkAnswer.mockReturnValueOnce(true).mockReturnValueOnce(false)

    // Simulate correct answer.
    ui.processAnswer('A')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('A')
    expect(consoleSpy).toHaveBeenCalledWith('Correct!')

    // Simulate incorrect answer.
    ui.processAnswer('B')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('B')
    expect(consoleSpy).toHaveBeenCalledWith('Wrong answer!')
  })

  it('should throw a ConsoleUIError for any error', () => {
    // Case 1: Throw a known Error.
    mockGame.checkAnswer.mockImplementationOnce(() => {
      throw new Error('Known error')
    })
  
    expect(() => ui.processAnswer('A')).toThrow(ConsoleUIError)
  
    // Case 2: Throw an unknown error.
    mockGame.checkAnswer.mockImplementationOnce(() => {
      throw 'Unknown error'
    })
  
    expect(() => ui.processAnswer('B')).toThrow(ConsoleUIError)
  })
  
})