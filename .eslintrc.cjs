/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },

    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: false,
                tabWidth: 4,
                trailingComma: 'none',
                printWidth: 140,
                bracketSpacing: true,
                arrowParens: 'avoid'
            }
        ]
    }
}
