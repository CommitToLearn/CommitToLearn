// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://committolearn.com',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: [
        'javascript',
        'typescript',
        'python',
        'java',
        'go',
        'dockerfile',
        'sql',
        'bash',
        'shell',
        'json',
        'yaml',
        'markdown',
        'html',
        'css',
      ],
      wrap: true,
    },
  },
});