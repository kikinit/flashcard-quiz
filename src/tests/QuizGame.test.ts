import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'

describe('QuizGame', () => {
  let question1: Question
  let question2: Question
  let questionBank: QuestionBank
  let quizGame: QuizGame

  beforeEach(() => {
    question1 = new Question(
      'What does the term "hoisting" mean in JavaScript?',
      ['Variable declaration', 'Loop optimization', 'Runtime scope'],
      'Variable declaration'
    )
    question2 = new Question(
      'Which HTTP status code is used when a resource is successfully created?',
      ['200', '201', '204'],
      '201'
    )

    questionBank = new QuestionBank()
    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)

    quizGame = new QuizGame(questionBank)
  })

  it('should fetch a random question from the QuestionBank', () => {
    const question = quizGame.getNextQuestion()
    expect([question1, question2]).toContain(question)
  })
})
