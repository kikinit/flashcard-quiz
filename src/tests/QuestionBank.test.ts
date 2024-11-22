import { Question } from '../Question'
import { QuestionBank } from '../QuestionBank'
import { DuplicateQuestionError, QuestionNotFoundError, NoMoreQuestionsError } from '../errors'

describe('QuestionBank', () => {
  let question1: Question
  let question2: Question
  let question3: Question
  let sut: QuestionBank

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

    sut = new QuestionBank()
    sut.addQuestion(question1)
    sut.addQuestion(question2)
    sut.addQuestion(question3)
  })

  it('should return a random question from the bank', () => {
    const randomQuestion = sut.getRandomQuestion()
    expect([question1, question2, question3]).toContain(randomQuestion)
  })

  it('should remove a question from the QuestionBank', () => {
    sut.removeQuestion(question2)

    // Verify question2 is removed.
    const randomQuestion = sut.getRandomQuestion()
    expect(randomQuestion).not.toBe(question2)

    // Verify question1 and question3 are still present.
    expect([question1, question3]).toContain(randomQuestion)
  })

  it('should throw a DuplicateQuestionError if a duplicate question is added', () => {
    expect(() => {
      sut.addQuestion(question1)
      sut.addQuestion(question1) // Add duplicate.
    }).toThrow(DuplicateQuestionError)
  })
  
  it('should throw a QuestionNotFoundError if attempting to remove a question that does not exist', () => {
    const nonExistentQuestion = new Question(
      'What is Node.js primarily used for?',
      ['Frontend', 'Backend', 'Mobile apps'],
      'Backend'
    )
  
    expect(() => {
      sut.removeQuestion(nonExistentQuestion)
    }).toThrow(QuestionNotFoundError)
  })


  it('should throw NoMoreQuestionsError when there are no questions left', () => {
    const emptyQuestionBank = new QuestionBank()
  
    // Attempting to fetch a random question from an empty QuestionBank.
    expect(() => emptyQuestionBank.getRandomQuestion()).toThrow(NoMoreQuestionsError)
  })

})
