import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'

describe('QuizGame', () => {
  let question1: Question
  let question2: Question
  let questionBank: QuestionBank
  let quizGame: QuizGame
  const options1 = ['Variable declaration', 'Loop optimization', 'Runtime scope']
  const correctAnswer1 = 'Variable declaration'
  const options2 = ['200', '201', '204']
  const correctAnswer2 = '201'

  beforeEach(() => {
    question1 = new Question(
      'What does the term "hoisting" mean in JavaScript?',
      options1,
      correctAnswer1
    )
    question2 = new Question(
      'Which HTTP status code is used when a resource is successfully created?',
      options2,
      correctAnswer2
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
