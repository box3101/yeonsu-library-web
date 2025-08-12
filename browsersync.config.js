module.exports = {
  // 프록시 설정 - Astro 개발 서버와 연동
  proxy: 'localhost:3000',

  // 파일 감시 설정
  files: [
    'src/**/*.astro',
    'src/**/*.scss',
    'src/**/*.css',
    'src/**/*.ts',
    'src/**/*.js',
  ],

  // 브라우저 자동 새로고침 설정
  reload: {
    // 딜레이 설정 (밀리초)
    delay: 200,
  },

  // UI 설정
  ui: {
    port: 3002,
  },

  // 브라우저 sync 포트
  port: 3003,

  // 로그 설정
  logLevel: 'info',
  logPrefix: '🚀 Yeonsu Library',

  // 알림 설정
  notify: {
    styles: {
      top: 'auto',
      bottom: '20px',
      right: '20px',
      left: 'auto',
      fontSize: '14px',
      padding: '10px 15px',
      borderRadius: '8px',
      backgroundColor: '#3c79c2',
      color: 'white',
      fontFamily: 'Pretendard, sans-serif',
    },
  },

  // 열 브라우저 설정
  open: false, // 자동으로 브라우저 열지 않음

  // HTTPS 설정 (필요시)
  https: false,
};
