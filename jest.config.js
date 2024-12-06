export default {
  preset: 'ts-jest', // Use ts-jest for TypeScript transformation
  testEnvironment: 'node', // Set the Node.js test environment
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Enable ESM with ts-jest for .ts/.tsx files
  },
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize these extensions in imports
  testMatch: ['**/tests/**/*.test.ts'], // Locate test files in the `tests` folder
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Allow resolving .js extensions correctly in imports
  },
  globals: {
    'ts-jest': {
      useESM: true, // Ensure ts-jest transforms modules as ES modules
    },
  },
}
