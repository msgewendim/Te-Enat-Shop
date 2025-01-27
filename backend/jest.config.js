module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // coverageDirectory: "coverage",
  collectCoverage: true,
};
