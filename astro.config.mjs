import { defineConfig } from 'astro/config';

export default defineConfig({
  // 개발 중에는 소스맵 활성화, 프로덕션에서는 HTML 속성만 제거
  compilerOptions: {
    sourcemap: 'external' // 또는 true
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
    // CSS 소스맵 설정
    css: {
      devSourcemap: true, // 개발 중 CSS 소스맵 활성화
      preprocessorOptions: {
        scss: {
          // SCSS 소스맵 활성화
          sourceMap: true,
          sourceMapContents: true
        }
      }
    },

    build: {
      // 프로덕션 빌드 시에도 소스맵 생성 (선택사항)
      sourcemap: true,

      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (ext === 'css') {
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