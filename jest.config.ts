import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts*',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/routers', '<rootDir>/app.ts'],
};

export default config;
