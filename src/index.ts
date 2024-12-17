import { QuizGame } from './QuizGame.js'
import { QuestionBank } from './QuestionBank.js'
import { QuestionFactory } from './QuestionFactory.js'
import { Scoreboard } from './Scoreboard.js'
import { ConsoleUI } from './ConsoleUI.js'
import { QuizController } from './QuizController.js'

// Function to load initial question data.
function loadQuestions(): Array<{
    text: string
    options: string[]
    correctAnswer: string
    hints: string[]
}> {
    return [
        {
            text: 'What does the term "hoisting" mean in JavaScript?',
            options: ['Variable declaration', 'Loop optimization', 'Runtime scope'],
            correctAnswer: '1', // Correct answer index (1-based)
            hints: [
                'It describes a default behavior of JavaScript interpreters.',
                'This term applies to both var and function declarations but not to let and const.',
                'It ensures variables are accessible before initialization.',
                'It moves declarations to the top of their scope.'
            ]
        },
        {
            text: 'Which HTTP status code is used when a resource is successfully created?',
            options: ['200', '201', '204'],
            correctAnswer: '2', // Correct answer index (1-based)
            hints: [
                'It signifies the successful creation of a resource, such as a new database entry.',
                'It is commonly used in REST APIs to indicate resource creation.',
                'This status code is often associated with creating new resources via POST requests.',
                'This code lies between 200 OK and 204 No Content.'
            ]
        }
    ]
}

// Function to initialize the game and its dependencies.
async function initializeQuizGame(): Promise<void> {
  const questionBank = new QuestionBank(new QuestionFactory())
  const scoreboard = new Scoreboard()
  const game = new QuizGame(questionBank, scoreboard)
  const ui = new ConsoleUI()
  const controller = new QuizController(game, ui)

  // Load and add questions to the QuestionBank.
  const questions = loadQuestions()
  questions.forEach((data) => game.addQuestion(data))

  // Start the quiz
  await controller.start()
}

initializeQuizGame()
