export default {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript files
  testEnvironment: 'node', // Node.js test environment
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Move ts-jest config here
  },
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
  testMatch: ['**/tests/**/*.test.ts'], // Locate test files
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Support for .js extensions in imports
  },
}
