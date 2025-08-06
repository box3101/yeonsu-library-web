import { initNoticeSwiper, initBannerSwiper } from './swiper.js';

/**
 * 전역 스크립트 초기화
 */
export function initGlobalScripts() {
  // 모든 페이지에서 공통으로 사용할 기능들
  console.log('Global scripts initialized');
}

/**
 * 페이지별 스크립트 자동 초기화
 */
export function autoInitSwiper() {
  // 공지사항 스와이퍼가 있는 경우 자동 초기화
  if (document.querySelector('.notice-swiper')) {
    initNoticeSwiper();
  }

  // 배너 스와이퍼가 있는 경우 자동 초기화
  if (document.querySelector('.banner-swiper')) {
    initBannerSwiper();
  }
}

// DOM 로드 완료 후 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  initGlobalScripts();
  autoInitSwiper();
});