module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules", "build"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-refresh", "react", "@typescript-eslint", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/prop-types": "off", // We're using TypeScript for prop validation
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "ignoreRestSiblings": true 
    }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/order": [
      "warn",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }
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
  overrides: [
    {
      // Specific rules for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn"
      }
    },
    {
      // Specific rules for test files
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off"
      }
    }
  ]
};
