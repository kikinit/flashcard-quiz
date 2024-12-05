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

    sut = new ConsoleUI(mockGame, mockInput, mockOutput)
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
  let mockInput: jest.Mock
  let mockOutput: jest.Mock
  let sut: ConsoleUI
  let mockGame: jest.Mocked<QuizGame>

  beforeEach(() => {
    // Mock the QuizGame instance with necessary methods.
    mockGame = {
      checkAnswer: jest.fn(),
      getNextQuestion: jest.fn(),
      requestHint: jest.fn(),
      restart: jest.fn()
    } as unknown as jest.Mocked<QuizGame>

    mockInput = jest.fn()
    mockOutput = jest.fn()

    // Instantiate ConsoleUI with the mocked game.
    sut = new ConsoleUI(mockGame, mockInput, mockOutput)
  })

  it('should display a welcome message when started', () => {
    sut.start()

    expect(mockOutput).toHaveBeenCalledWith('Welcome to the Quiz Game!')
    expect(mockOutput).toHaveBeenCalledWith('Type "s" to start or "q" to quit.')
  })

  it('should process user input for the "start" command', () => {
    const localMockInput = jest.fn((callback: (input: string) => void) => {
      callback('s') // Simulate "start" command.
    })
    const localSut = new ConsoleUI(mockGame, localMockInput, mockOutput)

    localSut.start()

    expect(mockGame.getNextQuestion).toHaveBeenCalled()
  })

  it('should display a question using default output in displayQuestion method', () => {
    const question = new Question(
      'What is 2 + 2?',
      ['3', '4', '5'],
      '4',
      ['It is the square root of 16', 'It is not a prime number', 'It is greater than 3', 'It is even']
    )

    sut.displayQuestion(question)

    expect(mockOutput).toHaveBeenCalledWith('What is 2 + 2?')
    expect(mockOutput).toHaveBeenCalledWith('1. 3')
    expect(mockOutput).toHaveBeenCalledWith('2. 4')
    expect(mockOutput).toHaveBeenCalledWith('3. 5')
  })

  it('throws a ConsoleUIError for any error in displayQuestion method', () => {
    const mockQuestion = {
      getText: jest.fn(() => {
        throw new Error('Text error')
      }),
      getOptions: jest.fn(),
    } as unknown as Question
  
    expect(() => sut.displayQuestion(mockQuestion)).toThrow(ConsoleUIError)
  })

  it('should process and validate user answers correctly in processAnswer method', () => {
    // Mock the game responses.
    mockGame.checkAnswer.mockReturnValueOnce(true).mockReturnValueOnce(false)

    // Simulate correct answer.
    sut.processAnswer('1')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('1')
    expect(mockOutput).toHaveBeenCalledWith('Correct!')

    // Simulate incorrect answer.
    sut.processAnswer('2')
    expect(mockGame.checkAnswer).toHaveBeenCalledWith('2')
    expect(mockOutput).toHaveBeenCalledWith('Wrong answer!')
  })

  it('should throw a ConsoleUIError for any error in processAnswer method', () => {
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

  it('should request and display a hint for the current question in requestHint method', () => {
    // Mock the game to return a hint.
    const mockHint = 'This is a hint'
    mockGame.requestHint.mockReturnValue(mockHint)

    sut.requestHint()

    expect(mockGame.requestHint).toHaveBeenCalled()
    expect(mockOutput).toHaveBeenCalledWith(`Hint: ${mockHint}`)
  })

  it('should throw a ConsoleUIError for errors in requestHint method', () => {
    // Mock the game to throw an error for hint requests.
    mockGame.requestHint.mockImplementation(() => {
      throw new Error('Game error')
    })

    expect(() => sut.requestHint()).toThrow(ConsoleUIError)
  })

  it('should wrap errors in a ConsoleUIError using handleErrors template method', () => {
    const mockFn = jest.fn(() => {
      throw new Error('Original error message')
    })

    expect(() => sut['handleErrors'](mockFn)).toThrow(ConsoleUIError)
    expect(() => sut['handleErrors'](mockFn)).toThrow('Original error message')
  })

  it('should handle unknown errors gracefully using handleErrors template method', () => {
    const mockFn = jest.fn(() => {
      throw 'Unknown error'
    })

    expect(() => sut['handleErrors'](mockFn)).toThrow(ConsoleUIError)
    expect(() => sut['handleErrors'](mockFn)).toThrow('[ConsoleUIError] An unknown error occurred while processing the answer')
  })

  it('restarts the game and displays a confirmation message', () => {
    sut.restartGame()
  
    expect(mockGame.restart).toHaveBeenCalled()
    expect(mockOutput).toHaveBeenCalledWith('Game has been restarted. You can start again!')
  })

  it('should throw a ConsoleUIError for any error in restartGame method', () => {
    mockGame.restart.mockImplementationOnce(() => {
      throw new Error('Restart failed')
    })

    expect(() => sut.restartGame()).toThrow(ConsoleUIError)
  })
})
