import { initNoticeSwiper, initEventSwiper } from '../swiper.js';

/**
 * 홈페이지 스크립트 초기화
 */
export function initHomePage() {
  // 공지사항 스와이퍼 초기화
  const noticeSwiper = initNoticeSwiper('.notice-swiper', {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // 이벤트 카드 스와이퍼 초기화
  const eventSwiper = initEventSwiper('.event-swiper', {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });

  console.log('Home page initialized');

  return {
    noticeSwiper,
    eventSwiper,
  };
}
