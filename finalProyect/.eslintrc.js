module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    "no-extraneous-class": 0,
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksConditionals": false
      },
      
    ],
    "semi": ["error", "always"]
  }
}
