import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    format: 'file',
    assets: 'assets',
    assetsPrefix: './'
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (ext === 'css') {
              // 해시 제거하고 css 폴더에 배치
              return `css/[name].[ext]`;
            }

            if (ext === 'js') {
              return `js/[name].[ext]`;
            }

            return `[name].[ext]`;
          },
          chunkFileNames: 'js/[name].js',
          entryFileNames: 'js/[name].js'
        }
      }
    }
  },

  server: {
    port: 3000
  }
});