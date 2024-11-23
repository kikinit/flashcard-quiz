# Flashcard Quiz

A console-based flashcard quiz application designed to help programmers and developers test their knowledge on various topics like programming, web development, and computer science principles. The app supports dynamic hints, scoring, and game progression.

## Features

- **Dynamic Questions**: Supports multiple-choice questions related to programming and technology.
- **Hints System**: Provides up to 4 contextual hints for each question, with a penalty for using hints.
- **Score Tracking**: Tracks the player's score, adjusting for correct answers and hint usage.
- **Game State Management**: Handles game progression, including game-over detection and restart functionality.
- **Test-Driven Development (TDD)**: Built entirely using TDD principles to ensure quality and maintainability.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/flashcard-quiz.git
   cd flashcard-quiz
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

4. **Run the App**:
   ```bash
   npm start
   ```

## Usage

- Launch the application to start answering flashcard questions.
- Use the provided hints strategically to maximize your score.
- Restart the game anytime to reset your progress.

## Project Structure

```
flashcard-quiz/
├── src/
│   ├── Question.ts          # Question logic and hint system
│   ├── QuestionBank.ts      # Manages the collection of questions
│   ├── QuizGame.ts          # Core game logic and state management
│   ├── errors/              # Custom error classes
│   └── utils/               # Utility functions
├── tests/
│   ├── Question.test.ts     # Unit tests for Question
│   ├── QuestionBank.test.ts # Unit tests for QuestionBank
│   ├── QuizGame.test.ts     # Unit tests for QuizGame
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **Node.js**: Backend runtime.
- **TypeScript**: For type safety and better development experience.
- **Jest**: Testing framework for unit tests.

## License

This project is licensed under the [MIT License](LICENSE).
