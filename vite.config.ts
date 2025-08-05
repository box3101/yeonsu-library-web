import { defineConfig } from 'vite';

export default defineConfig({
  // HMR 최적화 설정
  server: {
    hmr: {
      overlay: true, // 에러 오버레이 표시
    },
    watch: {
      // 파일 변경 감지 최적화
      usePolling: false,
      interval: 100, // 폴링 간격 (밀리초)
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },

  // CSS HMR 최적화
  css: {
    devSourcemap: true,
    // CSS 변경사항 즉시 반영
    hmr: true,
  },

  // 빌드 최적화
  build: {
    // 개발 시 빠른 빌드
    minify: false,
    sourcemap: true,
  },
});
