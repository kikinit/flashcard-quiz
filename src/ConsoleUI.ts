import { Question } from './Question'
import { QuizGame } from './QuizGame'

export class ConsoleUI {
  private input: (callback: (input: string) => void) => void
  private output: (message: string) => void
  private game: QuizGame

  constructor(
    input = (callback: (input: string) => void) => {
      process.stdin.on('data', (chunk: Buffer | string) => {
        const input = chunk.toString().trim()
        callback(input)
      })
    },
    output = console.log,
    game: QuizGame
  ) {
    this.input = input
    this.output = output
    this.game = game
  }

  public displayQuestion(question: Question) {
    this.output(question.getText())
    question.getOptions().forEach((option, index) => {
      this.output(`${index + 1}. ${option}`)
    })
  }

  public processAnswer(input: string): void {
    const isCorrect = this.game.checkAnswer(input)
    this.output(isCorrect ? 'Correct!' : 'Wrong answer!')
  }  
}
