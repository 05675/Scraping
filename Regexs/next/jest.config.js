module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@assets/(.*)': '<rootDir>/assets/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/fileTransformer.js',
  },
};
