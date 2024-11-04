module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "spellcheck/spell-checker": [
      "off", // Disabled to prevent spell checking Hebrew text
      {
        skipWords: [],
        skipIfMatch: [
          "[\u0590-\u05FF]+", // Matches Hebrew characters
        ],
      },
    ],
  },
};
