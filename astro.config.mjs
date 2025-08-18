import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file',
    assets: '_custom',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@ui': '/src/components/UI',
        '@styles': '/src/styles',
        '@layouts': '/src/layouts',
      },
    },
  },
});
