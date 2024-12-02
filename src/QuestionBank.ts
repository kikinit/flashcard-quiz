import { Question } from './Question'
import { QuestionFactory } from './QuestionFactory'
import { DuplicateQuestionError, QuestionNotFoundError, NoMoreQuestionsError } from './errors'

export class QuestionBank {
  private questions: Question[] = []
  private attemptedQuestions: Set<Question> = new Set()
  private factory: QuestionFactory

  constructor(factory: QuestionFactory) {
    this.factory = factory
  }

  public addQuestion(
    text: string,
    options: string[],
    correctAnswer: string,
    hints: string[]
  ): void {
    const question = this.factory.createQuestion(text, options, correctAnswer, hints)
    if (this.questions.includes(question)) {
      throw new DuplicateQuestionError()
    }
    this.questions.push(question)
  }

  public getRandomQuestion(): Question {
    const availableQuestions = this.questions.filter(
      (question) => !this.attemptedQuestions.has(question)
    )

    if (availableQuestions.length === 0) {
      throw new NoMoreQuestionsError()
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const selectedQuestion = availableQuestions[randomIndex]

    this.attemptedQuestions.add(selectedQuestion)
    return selectedQuestion
  }

  public removeQuestion(question: Question): void {
    if (!this.questions.includes(question)) {
      throw new QuestionNotFoundError()
    }
    this.questions = this.questions.filter(q => q !== question)
  }

  public hasMoreQuestions(): boolean {
    return this.questions.some(question => !this.attemptedQuestions.has(question))
  }

  public resetAttemptedQuestions(): void {
    this.attemptedQuestions.clear()
  }
}
