import { defineConfig } from 'vite'

export default defineConfig({
  // Relative asset paths, so dist/index.html works when opened straight from disk.
  base: './',
  plugins: [
    {
      // Browsers block module scripts on file:// pages, so emit a classic deferred script instead.
      name: 'classic-script',
      transformIndexHtml: {
        order: 'post',
        handler: (html) =>
          html
            .replace(/ type="module" crossorigin/g, ' defer')
            .replace(/ crossorigin(?= href="\.\/assets\/)/g, ''),
      },
    },
  ],
})
