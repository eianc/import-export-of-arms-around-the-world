import js from '@eslint/js';
import globals from 'globals';

export default [
    // Unused prototype script, kept for reference
    { ignores: ['javascript/modules/array_transform.js', 'dist/**'] },
    js.configs.recommended,
    {
        files: ['javascript/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
    },
];
