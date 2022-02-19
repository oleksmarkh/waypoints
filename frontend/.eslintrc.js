module.exports = {
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
  ],
  "rules": {
    "semi": [ "error", "never" ],
    "eqeqeq": "error",
    "comma-dangle": [ "error", "always-multiline" ],
    "array-bracket-spacing": [ "error", "always" ],
    "object-curly-spacing": [ "error", "always" ],
    "no-else-return": [ "error", { "allowElseIf": false } ],
    "no-implicit-coercion": "error",
    "no-param-reassign": "error",

    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true },
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",

    "import/newline-after-import": "error",

    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect",
    },
  },
}
