# Test Coverage Report

## Coverage Test 2

### Project Details

- **Project Name**: `flashcard_quiz`
- **Tester**: Mattias Ubbesen
- **Date of Test**: 2024-12-04
- **Language/Environment**: Node.js with TypeScript

### Environment

- **Operating System**: Linux Ubuntu 24.04.1 LTS
- **Node.js Version**: v21.7.0
- **TypeScript Version**: v5.6.3
- **Unit Testing Framework**: Jest v29.7.0
  - Includes built-in mocking capabilities.

### Detailed Coverage

```
----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   98.12 |      100 |   96.29 |   97.98 |                   
 src                        |   97.34 |      100 |   94.44 |   97.29 |                   
  ConsoleUI.ts              |      80 |      100 |   66.66 |      80 | 12-14             
  GameState.ts              |     100 |      100 |     100 |     100 |                   
  Question.ts               |     100 |      100 |     100 |     100 |                   
  QuestionBank.ts           |     100 |      100 |     100 |     100 |                   
  QuestionFactory.ts        |     100 |      100 |     100 |     100 |                   
  QuizGame.ts               |     100 |      100 |     100 |     100 |                   
  Scoreboard.ts             |     100 |      100 |     100 |     100 |                   
 src/errors                 |     100 |      100 |     100 |     100 |                   
  ConsoleUIError.ts         |     100 |      100 |     100 |     100 |                   
  DuplicateQuestionError.ts |     100 |      100 |     100 |     100 |                   
  GameOverError.ts          |     100 |      100 |     100 |     100 |                   
  InvalidAnswerError.ts     |     100 |      100 |     100 |     100 |                   
  MaxHintsLimitError.ts     |     100 |      100 |     100 |     100 |                   
  NoCurrentQuestionError.ts |     100 |      100 |     100 |     100 |                   
  NoMoreHintsError.ts       |     100 |      100 |     100 |     100 |                   
  NoMoreQuestionsError.ts   |     100 |      100 |     100 |     100 |                   
  QuestionNotFoundError.ts  |     100 |      100 |     100 |     100 |                   
  index.ts                  |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 6 passed, 6 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        1.796 s, estimated 2 s
```

### Additional Notes

#### Mocking:
1. **Dependency Injection**:
   - `ConsoleUI` uses dependency injection for both `input` and `output` functions, allowing for isolation and testing with mock functions.
   - Tests inject custom implementations of `input` and `output` to simulate behavior and verify outputs.

2. **Mocking Game Logic**:
   - `QuizGame` is mocked in `ConsoleUI` tests to verify interactions with the game logic without executing actual game methods.
   - Example: Mocking `checkAnswer` to test correctness validation.

3. **Mocking Console Output**:
   - `console.log` is replaced using `jest.spyOn` to verify `ConsoleUI` output behavior without printing to the console during tests.

#### Justification for Lack of Coverage:
- **stdin Handling**:
  - Direct testing of `stdin` (process input stream) is omitted due to the complexity and potential for open handles in Jest's test environment.
  - Instead, dependency injection for `input` is thoroughly tested, which covers equivalent functionality while maintaining clean test isolation.

---

## Coverage Test 1

### Project Details

- **Project Name**: `flashcard_quiz`
- **Tester**: Mattias Ubbesen
- **Date of Test**: 2024-11-22
- **Language/Environment**: Node.js with TypeScript

### Environment

- **Operating System**: Linux Ubuntu 24.04.1 LTS
- **Node.js Version**: v21.7.0
- **TypeScript Version**: v5.6.3
- **Unit Testing Framework**: Jest v29.7.0
  - Includes built-in mocking capabilities.

### Detailed Coverage

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

### Additional Notes

- **Mocking**:
  - Jest's built-in mocking framework was utilized to isolate system under test (sut) behavior, including mocking `getNextQuestion` in the `QuizGame` class.
