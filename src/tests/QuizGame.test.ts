import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { QuizGame } from '../QuizGame'

describe('QuizGame', () => {
  let question1: Question
  let question2: Question
  let questionBank: QuestionBank
  let quizGame: QuizGame
  const questionStringA = 'What does the term "hoisting" mean in JavaScript?'
  const optionA1 = 'Variable declaration'
  const optionA2 = 'Loop optimization'
  const optionA3 = 'Runtime scope'
  const optionsArrayA = [optionA1, optionA2, optionA3]
  const correctAnswerA = optionA1
  const questionStringB = 'Which HTTP status code is used when a resource is successfully created?'
  const optionB1 = '200'
  const optionB2 = '201'
  const optionB3 = '204'
  const optionsArrayB = [optionB1, optionB2, optionB3]
  const correctAnswerB = optionB2

  beforeEach(() => {
    question1 = new Question(
      questionStringA,
      optionsArrayA,
      correctAnswerA
    )
    question2 = new Question(
      questionStringB,
      optionsArrayB,
      correctAnswerB
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

  it('should validate a submitted answer for the current question', () => {
    jest.spyOn(quizGame, 'getNextQuestion').mockImplementation(() => {
      quizGame['currentQuestion'] = question1
      return question1
    })

    quizGame.getNextQuestion()

    expect(quizGame.checkAnswer(correctAnswerA)).toBe(true)
    expect(quizGame.checkAnswer(optionA2)).toBe(false)
  })

  it('should throw an error if checkAnswer is called without a current question', () => {
    expect(() => {
      quizGame.checkAnswer('Some answer')
    }).toThrow('No current question to check an answer against.')
  })
  
})
