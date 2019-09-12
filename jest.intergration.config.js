module.exports = {
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        "./coverage/*",
        "./jest.config.js",
        "./src/*"
    ],
    testMatch: [
        '**/tests/**/*.spec.(ts|js)'
    ],
}