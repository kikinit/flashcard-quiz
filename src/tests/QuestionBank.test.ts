import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'

describe('QuestionBank', () => {
  let question1: Question
  let question2: Question
  let question3: Question
  let questionBank: QuestionBank

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
    question3 = new Question(
      'In SOLID design principles, what does the `S` stand for?',
      ['Single responsibility', 'Simple design', 'System dependency'],
      'Single responsibility'
    )

    questionBank = new QuestionBank()
    questionBank.addQuestion(question1)
    questionBank.addQuestion(question2)
    questionBank.addQuestion(question3)
  })

  it('should return a random question from the bank', () => {
    const randomQuestion = questionBank.getRandomQuestion()
    expect([question1, question2, question3]).toContain(randomQuestion)
  })

  it('should remove a question from the QuestionBank', () => {
    questionBank.removeQuestion(question2)

    // Verify question2 is removed.
    const randomQuestion = questionBank.getRandomQuestion()
    expect(randomQuestion).not.toBe(question2)

    // Verify question1 and question3 are still present.
    expect([question1, question3]).toContain(randomQuestion)
  })

  it('should throw an error if a duplicate question is added', () => {
    expect(() => {
      questionBank.addQuestion(question1)
      questionBank.addQuestion(question1) // Add duplicate.
    }).toThrow('The question is already in the QuestionBank.')
  })
  
  it('should throw an error if attempting to remove a question that does not exist', () => {
    const nonExistentQuestion = new Question(
      'What is Node.js primarily used for?',
      ['Frontend', 'Backend', 'Mobile apps'],
      'Backend'
    )
  
    expect(() => {
      questionBank.removeQuestion(nonExistentQuestion)
    }).toThrow('The question is not in the QuestionBank.')
  })
  

})
