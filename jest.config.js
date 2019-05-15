module.exports = {
    roots: [
      '<rootDir>/src',
    ],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testURL: 'http://localhost',
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/index.tsx',
      '!src/typings/*',
    ],
    reporters: [
      'default',
      'jest-junit',
    ],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/?!(json-typescript-mapper)/',
    ],
    globals: {
      'ts-jest': {
        tsConfig: './tsconfig.test.json',
        diagnostics: {
            ignoreCodes: [
                2352,  // Conversion of type '{0}' to type '{1}' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
                2604,  // Typical warning in our tests: JSX element type '{0}' does not have any construct or call signatures.
                6059,  // Recommended Ignore: ‘rootDir’ is expected to contain all source files.
                18002, // Recommended Ignore: The ‘files’ list in config file is empty.
                18003, // Recommended Ignore: No inputs were found in config file.
            ]
        },
      },
    },
    preset: 'ts-jest',
    testMatch: null,
  }