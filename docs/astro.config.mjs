import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import path from 'path';
import { fileURLToPath } from 'url';

import tailwind from '@astrojs/tailwind';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://jsimonrichard.github.io',
  base: 'HyperMD',
  integrations: [
    starlight({
      title: 'HyperMD',
      social: {
        github: 'https://github.com/jsimonrichard/HyperMD',
      },
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../packages/core/lib/main.ts'],
          tsconfig: '../packages/core/tsconfig.json',
          typeDoc: {
            githubPages: true,
          },
        }),
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              slug: 'guides/example',
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference',
          },
        },
        typeDocSidebarGroup,
      ],

      editLink: {
        baseUrl:
          process.env.NODE_ENV === 'development'
            ? `vscode://file/${path.dirname(fileURLToPath(import.meta.url))}`
            : 'https://github.com/tauri-apps/tauri-docs/edit/v2',
      },
    }),
    tailwind(),
  ],
});
