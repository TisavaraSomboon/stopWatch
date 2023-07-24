module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/src/setupMock.tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^.+\\.(png|svg)$': '<rootDir>/src/utils/fileMock.ts',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '/node_modules/'],
  collectCoverageFrom: ['!/node_modules/'],
}
