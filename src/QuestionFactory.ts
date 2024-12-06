import { Question } from './Question.js'

export class QuestionFactory {
  createQuestion(
    text: string,
    options: string[],
    correctAnswer: string,
    hints: string[]
  ): Question {
    return new Question(text, options, correctAnswer, hints)
  }
}
