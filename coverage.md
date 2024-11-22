# Test Coverage Report

## Project Details

- **Project Name**: `flashcard_quiz`
- **Tester**: Mattias Ubbesen
- **Date of Test**: 2024-11-22
- **Language/Environment**: Node.js with TypeScript

## Environment

- **Operating System**: Linux Ubuntu 24.04.1 LTS
- **Node.js Version**: v21.7.0
- **TypeScript Version**: v5.6.3
- **Unit Testing Framework**: Jest v29.7.0
  - Includes built-in mocking capabilities.

## Detailed Coverage

```
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |      100 |     100 |     100 |                   
 src                        |     100 |      100 |     100 |     100 |                   
  Question.ts               |     100 |      100 |     100 |     100 |                   
  QuestionBank.ts           |     100 |      100 |     100 |     100 |                   
  QuizGame.ts               |     100 |      100 |     100 |     100 |                   
 src/errors                 |     100 |      100 |     100 |     100 |                   
  DuplicateQuestionError.ts |     100 |      100 |     100 |     100 |                   
  InvalidAnswerError.ts     |     100 |      100 |     100 |     100 |                   
  NoCurrentQuestionError.ts |     100 |      100 |     100 |     100 |                   
  QuestionNotFoundError.ts  |     100 |      100 |     100 |     100 |                   
  index.ts                  |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------
```

## Additional Notes

- **Mocking**:
  - Jest's built-in mocking framework was utilized to isolate system under test (sut) behavior, including mocking `getNextQuestion` in the `QuizGame` class.
