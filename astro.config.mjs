import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  // 로그 레벨 설정으로 경고 메시지 최소화
  logLevel: 'error',

  // 개발 중에는 소스맵 활성화, 프로덕션에서는 HTML 속성만 제거
  compilerOptions: {
    sourcemap: true, // 인라인 소스맵으로 변경
  },

  // CSS 스코핑 완전 비활성화로 정확한 소스맵 표시
  scopedStyleStrategy: 'where',

  // Astro 4.0+ 에서 개발 툴바 비활성화 (선택사항)
  devToolbar: {
    enabled: false,
  },

  build: {
    format: 'file',
    assets: 'assets',
    assetsPrefix: './',
  },

  vite: {
    // Vite 로그 레벨 설정
    logLevel: 'error',

    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@ui': path.resolve('./src/components/UI'),
        '@layout': path.resolve('./src/components/layout'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
      },
    },

    // CSS 소스맵 설정
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          sourceMapContents: true,
          sourceMapEmbed: false,
          sourceMapRoot: '../',
          includePaths: ['src/styles'],
        },
      },
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },

    // 개발 서버 최적화
    server: {
      fs: {
        // 프로젝트 루트 외부 파일 접근 허용 (필요시)
        strict: false,
      },
    },

    // 빌드 최적화
    optimizeDeps: {
      // SCSS 파일 변경 시 즉시 반영
      force: true,
    },

    build: {
      // 프로덕션 빌드 시에도 소스맵 생성 (선택사항)
      sourcemap: true,

      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
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
          entryFileNames: 'js/[name].js',
        },
      },
    },
  },

  server: {
    port: 3000,
    // HMR(Hot Module Replacement) 최적화
    hmr: {
      port: 3001, // HMR 전용 포트
    },
    // 파일 감시 설정
    watch: {
      usePolling: false, // 성능 향상을 위해 polling 비활성화
      ignored: ['**/node_modules/**', '**/.git/**'], // 불필요한 파일 감시 제외
    },
  },
});
