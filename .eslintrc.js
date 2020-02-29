module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "standard",
    "plugin:node/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "array-bracket-spacing": [2, "never"],
    "block-scoped-var": 2,
    "brace-style": [2, "1tbs"],
    "camelcase": 1,
    "computed-property-spacing": [2, "never"],
    "curly": 2,
    "eol-last": 2,
    "eqeqeq": [0, "smart"],
    "max-depth": [1, 3],
    "max-len": [1, 80],
    "max-statements": [1, 15],
    "new-cap": 1,
    "no-extend-native": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-trailing-spaces": 2,
    "no-unused-vars": 1,
    "no-use-before-define": [2, "nofunc"],
    "object-curly-spacing": [2, "always"],
    "quotes": [2, "single", "avoid-escape"],
    "keyword-spacing": [2, {"before": true, "after": true}],
    "space-unary-ops": 2,
    "semi": 1,
    "space-before-function-paren": 0,
    "node/no-unsupported-features": ["warn", {
      "version": 8,
      "ignores": ["syntax"]
    }],
    "operator-linebreak": ["error", "before", {"overrides": {"+=": "before"}}]
  }
};
