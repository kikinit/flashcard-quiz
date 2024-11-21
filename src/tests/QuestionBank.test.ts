import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'

describe('QuestionBank', () => {
  it('should return a random question from the bank', () => {
    const question1 = new Question(
      'What does the term "hoisting" mean in JavaScript?',
      ['Variable declaration', 'Loop optimization', 'Runtime scope'],
      'Variable declaration'
    )
    const question2 = new Question(
      'Which HTTP status code is used when a resource is successfully created?',
      ['200', '201', '204'],
      '201'
    )
    const question3 = new Question(
      'In SOLID design principles, what does the `S` stand for?',
      ['Single responsibility', 'Simple design', 'System dependency'],
      'Single responsibility'
    )

    const questionBank = new QuestionBank()
    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)
    questionBank.addQuestion(question3)

    const randomQuestion = questionBank.getRandomQuestion()
    expect([question1, question2, question3]).toContain(randomQuestion)
  })
})
