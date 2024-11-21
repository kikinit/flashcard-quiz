export default {
  preset: 'ts-jest', // Use ts-jest to transform TypeScript files
  testEnvironment: 'node', // Set the test environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for .ts/.tsx files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize file extensions
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
  globals: {
    'ts-jest': {
      useESM: true, // Enable ECMAScript module support in ts-jest
    },
  },
  testMatch: ['**/tests/**/*.test.ts'], // Locate test files
}
