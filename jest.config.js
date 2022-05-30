module.exports = {
    testEnvironment: "node",  
    collectCoverageFrom: [
      "app/**/*.js",
      "!**/node_modules/**",
      "!**/_mocks_/**",
      "!**/__mocks__/**"
    ],
  
    coverageReporters: ["text-summary", "json", "html"],
    collectCoverage: true,
    coverageDirectory: "tests/unit/coverage/"
  };
  