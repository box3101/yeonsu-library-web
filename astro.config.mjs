import { defineConfig } from 'astro/config';

export default defineConfig({
  // 개발 중 소스맵 속성 제거
  compilerOptions: {
    sourcemap: false
  },

  // Astro 4.0+ 에서 개발 툴바 비활성화 (선택사항)
  devToolbar: {
    enabled: false
  },

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