import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file',
    assets: '_custom',
  },

  // 컴파일러 옵션 추가 - data-astro-* 속성 제거
  compilerOptions: {
    // 개발/프로덕션 모두에서 astro 디버그 속성 제거
    jsx: 'preserve',
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

    // 빌드 시 HTML 후처리로 속성 제거
    build: {
      rollupOptions: {
        output: {
          // HTML 파일에서 astro 속성 제거하는 플러그인
          assetFileNames: assetInfo => {
            return assetInfo.name;
          },
        },
      },
    },

    // 개발 환경에서도 제거하려면
    define: {
      __DEV__: process.env.NODE_ENV !== 'production',
    },
  },

  // 개발 도구 비활성화 (선택사항)
  devToolbar: {
    enabled: false,
  },
});
