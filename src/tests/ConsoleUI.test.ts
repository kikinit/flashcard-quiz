import { ConsoleUI } from '../ConsoleUI'
import { Question } from '../Question'

describe('ConsoleUI', () => {
  let ui: ConsoleUI 

  beforeEach(() => {
    ui = new ConsoleUI()
  })

  it('should display a question', () => {
    const question = new Question(
      'What is 2 + 2?',
      ['3', '4', '5'],
      '4',
      ['It is the square root of 16', 'It is not a prime number', 'It is greater than 3', 'It is even']
    )

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    ui.displayQuestion(question)

    expect(consoleSpy).toHaveBeenCalledWith('What is 2 + 2?')
    expect(consoleSpy).toHaveBeenCalledWith('1. 3')
    expect(consoleSpy).toHaveBeenCalledWith('2. 4')
    expect(consoleSpy).toHaveBeenCalledWith('3. 5')

    consoleSpy.mockRestore()
  })
})
