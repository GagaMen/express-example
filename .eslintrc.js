module.exports = {
    root: true,
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'unused-imports'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:prettier/recommended',
            ],
        },
        {
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            parserOptions: {
                ecmaVersion: 2020,
            },
            env: {
                node: true,
            },
        },
        {
            files: ['*.json'],
            extends: ['plugin:json/recommended-with-comments'],
        },
    ],
};
