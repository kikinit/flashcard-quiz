export default {
  preset: 'ts-jest', // Use ts-jest to transform TypeScript files
  testEnvironment: 'node', // Set the test environment
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Process .ts and .tsx files with ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize file extensions
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
  testMatch: ['**/tests/**/*.test.ts'], // Locate test files
}
