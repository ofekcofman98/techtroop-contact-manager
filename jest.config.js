module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'commands/**/*.js',
        'services/**/*.js',
        'utils/**/*.js'
    ],
    coverageReporters: ['text', 'lcov'],
    resetMocks: true
};
