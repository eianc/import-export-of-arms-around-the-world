import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                // The styles still use the legacy @import / global-function syntax
                // from the original boilerplate. Silence those warnings until the
                // styles are migrated to @use (see https://sass-lang.com/d/import).
                silenceDeprecations: ['import', 'global-builtin', 'slash-div'],
            },
        },
    },
});
