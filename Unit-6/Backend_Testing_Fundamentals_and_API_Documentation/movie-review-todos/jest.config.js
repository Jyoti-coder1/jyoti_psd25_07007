module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    reporters: [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Integration Test Report",
            "outputPath": "test-report/report.html",
            "includeFailureMsg": true,
            "includeConsoleLog": true
        }]
    ],
    testTimeout: 20000
};