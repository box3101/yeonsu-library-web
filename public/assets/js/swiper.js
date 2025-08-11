/**
 * 연수구 도서관 Swiper 초기화
 */

function initSwipers() {
  // Swiper 라이브러리 로드 확인
  if (typeof Swiper === 'undefined') {
    setTimeout(initSwipers, 100);
    return;
  }

  // 공지사항 스와이퍼 초기화
  const noticeSwiper = document.querySelector('.notice-swiper');
  if (noticeSwiper) {
    const noticeSlides = noticeSwiper.querySelectorAll('.swiper-slide');

    new Swiper('.notice-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: noticeSlides.length > 1,
      autoplay: noticeSlides.length > 1 ? { delay: 5000, disableOnInteraction: false } : false,
      navigation: {
        nextEl: '.notice-swiper-btn-next',
        prevEl: '.notice-swiper-btn-prev',
      },
      speed: 600,
    });
  }

  // 이벤트 스와이퍼 초기화
  const eventSwiper = document.querySelector('.event-swiper');
  if (eventSwiper) {
    const eventSlides = eventSwiper.querySelectorAll('.swiper-slide');

    new Swiper('.event-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: eventSlides.length > 1,
      autoplay: eventSlides.length > 1 ? { delay: 4000, disableOnInteraction: false } : false,
      navigation: {
        nextEl: '.event-swiper-btn-next',
        prevEl: '.event-swiper-btn-prev',
      },
      speed: 600,
    });
  }

  // 도서 - 서가브라우징 스와이퍼 초기화
  const bookSwiper = document.querySelector('.book-swiper');
  if (bookSwiper) {
    new Swiper('.book-swiper', {
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.book-swiper-btn-next',
        prevEl: '.book-swiper-btn-prev',
      },
      speed: 300,
      allowTouchMove: true,
      grabCursor: true,
      loop: true,
    });
  }
}

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwipers);
} else {
  initSwipers();
}
