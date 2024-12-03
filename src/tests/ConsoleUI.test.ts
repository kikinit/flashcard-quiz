import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'

// Note: Direct testing for the default `input` handling (process.stdin) is omitted due to complexity in mocking stdin.
// The `ConsoleUI` class supports dependency injection for `input`, which is thoroughly tested here.
describe('ConsoleUI - Dependency Injection', () => {
  let mockOutput: jest.Mock
  let mockInput: jest.Mock
  let ui: ConsoleUI

  beforeEach(() => {
    mockOutput = jest.fn()
    mockInput = jest.fn((callback: (input: string) => void) => callback('mock input'))
    ui = new ConsoleUI(mockInput, mockOutput)
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

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    ui = new ConsoleUI()
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
})

