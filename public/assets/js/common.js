/**
 * 연수구 도서관 웹사이트 공통 JavaScript
 */

// 전역 네임스페이스 (Swiper 기능 제거)
var YeonsuLibrary = {
  utils: {},
  initialized: false
};

/**
 * 공통 유틸리티 함수들
 */
YeonsuLibrary.utils.toggleMenu = function () {
  // 메뉴 토글 기능
  console.log('Menu toggled');
};

YeonsuLibrary.utils.handleSearch = function () {
  // 검색 기능
  console.log('Search handled');
};

/**
 * 공통 초기화 함수
 */
function initYeonsuLibrary() {
  YeonsuLibrary.initialized = true;
  console.log('YeonsuLibrary common functions initialized');
}

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initYeonsuLibrary);
} else {
  initYeonsuLibrary();
}

// 전역에서 접근 가능하도록 설정
if (typeof window !== 'undefined') {
  window.YeonsuLibrary = YeonsuLibrary;
}