import type { Config as JestConfig } from 'jest'

const verbose = process.env.VERBOSE === 'true'

const jestConfig: JestConfig = {
  coverageDirectory: '<rootDir>/dist/coverage',
  collectCoverageFrom: [
    'src/main/**/*.ts',
    '!src/main/**/*.d.ts',
    'src/main/**/index.ts',
    '!src/main/samples/**',
  ],
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 55,
      lines: 65,
      statements: 65,
    },
    'src/main/http-sequencer/': {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  rootDir: '.',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  silent: !verbose,
  testMatch: ['<rootDir>/src/test/!(architecture)/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose,
}

export default jestConfig
