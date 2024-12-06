import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'
import { StartCommand } from '../StartCommand'
import { UserAction } from '../UserAction'
import { ConsoleUIError } from '../errors/'

// Note: Direct testing for the default `input` handling (process.stdin) is omitted due to complexity in mocking stdin.
// The `ConsoleUI` class supports dependency injection for `input`, which is thoroughly tested here.
describe('ConsoleUI - Dependency Injection', () => {
  let mockOutput: jest.Mock
  let mockInput: jest.Mock
  let sut: ConsoleUI

  beforeEach(() => {
    // Mock the input and output streams.
    mockOutput = jest.fn()
    mockInput = jest.fn((callback: (input: string) => void) => callback('mock input'))

    // Instantiate ConsoleUI with the mocked I/O.
    sut = new ConsoleUI(mockInput, mockOutput)
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

  beforeEach(() => {
    // Mock the output stream.
    mockOutput = jest.fn()

    // Instantiate ConsoleUI with the mocked game and I/O.
    sut = new ConsoleUI(mockInput, mockOutput)
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

  it('should display correct outout for a correct answer in showAnswerFeedback method', () => {
    sut.showAnswerFeedback(true)
    expect(mockOutput).toHaveBeenCalledWith('Correct!')
  })
  
  it('should display correct output for an incorrect answer in showAnswerFeedback method', () => {
    sut.showAnswerFeedback(false)
    expect(mockOutput).toHaveBeenCalledWith('Wrong answer!')
  })

  it('should throw a ConsoleUIError for any error in showAnswerFeedback method', () => {
    // Mock the `output` method to throw an error.
    mockOutput.mockImplementationOnce(() => {
      throw new Error('Output error')
    })
  
    // Verify that a ConsoleUIError is thrown when an error occurs.
    expect(() => sut.showAnswerFeedback(true)).toThrow(ConsoleUIError)
  
    // Case 2: Simulate an unknown error.
    mockOutput.mockImplementationOnce(() => {
      throw 'Unknown error'
    })
  
    expect(() => sut.showAnswerFeedback(false)).toThrow(ConsoleUIError)
  })  

  it('should display a hint using the output function in displayHint method', () => {
    // Call the displayHint method with a valid message
    sut.displayHint('This is a hint')
  
    // Verify that the output method was called with the correct message
    expect(mockOutput).toHaveBeenCalledWith('This is a hint')
  })
  
  it('should handle errors when displaying a hint in displayHint method', () => {
    // Mock `output` to throw an error
    mockOutput.mockImplementationOnce(() => {
      throw new Error('Output error')
    })
  
    // Call the displayHint method and ensure errors are caught and rethrown as ConsoleUIError
    expect(() => sut.displayHint('This is a hint')).toThrow(ConsoleUIError)
  })

  it('should display the final score and prompt for restart or quit in displayEndGame method', () => {
    sut.displayEndGame(42)
  
    expect(mockOutput).toHaveBeenCalledWith('Game over! Your final score is 42.')
    expect(mockOutput).toHaveBeenCalledWith('Type "r" to restart or "q" to quit.')
  })

  it('restarts the game and displays a confirmation message in restartGame method', () => {
    sut.restartGame()
  
    expect(mockOutput).toHaveBeenCalledWith('Game has been restarted. You can start again!')
  })

  it('should throw a ConsoleUIError if output fails in restartGame method', () => {
    // Mock the `output` method to throw an error
    mockOutput.mockImplementationOnce(() => {
      throw new Error('Output error')
    })

    expect(() => sut.restartGame()).toThrow(ConsoleUIError)
  })

  it('should display an error message using the output function in displayError method', () => {
    const errorMessage = 'An error occurred'
    sut.displayError(errorMessage)
  
    expect(mockOutput).toHaveBeenCalledWith(errorMessage)
  })

  // TESTS FOR GLOBAL ÈRROR HANDLING IN TEMPLATE METHOD

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
    expect(() => sut['handleErrors'](mockFn)).toThrow('[ConsoleUIError] An unknown error occurred')
  })
})

describe('ConsoleUI - User Input Method Functionality', () => {
  let mockInput: jest.Mock
  let mockOutput: jest.Mock
  let sut: ConsoleUI
  let inputValue: string

  beforeEach(() => {

    // Mock the input and output streams.
    mockInput = jest.fn((callback: (input: string) => void) => callback(inputValue))
    mockOutput = jest.fn()

    // Instantiate ConsoleUI with the mocked I/O.
    sut = new ConsoleUI(mockInput, mockOutput)
  })

  it('should display a welcome message and instructions when start method is called', () => {
    inputValue = ''
    sut.start()

    expect(mockOutput).toHaveBeenCalledWith('Welcome to the Quiz Game!')
    expect(mockOutput).toHaveBeenCalledWith('Type "s" to start or "q" to quit.')
  })

  it('should process user input for the "s" command in start method', () => {
    inputValue = 's' // Simulate "start" command.
    const result = sut.start()
  
    expect(result).toBe(StartCommand.START)
  })

  it('should process user input for the "q" command and return StartCommand.EXIT in start method', () => {
    inputValue = 'q' // Simulate "exit" command.
    const result = sut.start()

    expect(result).toBe(StartCommand.EXIT)
  })

it('should display an error message and return StartCommand.UNKNOWN for invalid input in start method', () => {
    inputValue = 'invalid' // Simulate invalid command.
    const result = sut.start()

    expect(result).toBe(StartCommand.UNKNOWN)
  })

  it('should return REQUEST_HINT for "h" input in getUserInput method', () => {
    inputValue = 'h'
    const result = sut.getUserInput()
    expect(result).toBe(UserAction.REQUEST_HINT)
  })

  it('should return NEXT_QUESTION for "n" input in getUserInput method', () => {
    inputValue = 'n'
    const result = sut.getUserInput()
    expect(result).toBe(UserAction.NEXT_QUESTION)
  })

  it('should return SUBMIT_ANSWER for numeric inputs "1", "2", "3" in getUserInput method', () => {
    ['1', '2', '3'].forEach((input) => {
      mockInput.mockImplementation((callback) => callback(input))
      const result = sut.getUserInput()
      expect(result).toBe(UserAction.SUBMIT_ANSWER)
    })
  })

  it('should return UNKNOWN for invalid input in getUserInput method', () => {
    mockInput.mockImplementation((callback) => callback('x'))
    const result = sut.getUserInput()
    expect(result).toBe(UserAction.UNKNOWN)
  })

  it('should handle errors and throw ConsoleUIError if input fails in getUserInput method', () => {
    mockInput.mockImplementation(() => {
      throw new Error('Input error')
    })

    expect(() => sut.getUserInput()).toThrow(ConsoleUIError)
    expect(() => sut.getUserInput()).toThrow('Input error')
  })
})

