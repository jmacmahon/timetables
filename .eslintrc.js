module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "no-unused-vars": "warn",
      "react/prefer-stateless-function": "warn",
      "react/no-multi-comp": "warn",
      "no-param-reassign": ["error", { "props": false }],
      "import/extensions": ["error", {"jsx": "always"}],
    },
};
