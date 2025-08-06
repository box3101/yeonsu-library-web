/**
 * 연수구 도서관 Swiper 초기화
 */

function initSwipers() {
  console.log('Initializing swipers...');

  // Swiper 라이브러리 로드 확인
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded yet, retrying in 100ms...');
    setTimeout(initSwipers, 100);
    return;
  }

  console.log('Swiper library loaded successfully!');

  // 공지사항 스와이퍼 초기화
  const noticeSwiper = document.querySelector('.notice-swiper');
  if (noticeSwiper) {
    const noticeSlides = noticeSwiper.querySelectorAll('.swiper-slide');
    console.log('Notice slides count:', noticeSlides.length);

    new Swiper('.notice-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: noticeSlides.length > 1,
      autoplay: noticeSlides.length > 1 ? {
        delay: 5000,
        disableOnInteraction: false,
      } : false,
      navigation: {
        nextEl: '.notice-swiper-btn-next',
        prevEl: '.notice-swiper-btn-prev',
      },
      speed: 600,
      on: {
        slideChange: function () {
          console.log('Notice slide changed to:', this.activeIndex);
        },
        init: function () {
          console.log('Notice swiper initialized with', this.slides.length, 'slides');
        }
      }
    });
    console.log('Notice swiper setup complete');
  } else {
    console.warn('Notice swiper container not found');
  }

  // 이벤트 스와이퍼 초기화
  const eventSwiper = document.querySelector('.event-swiper');
  if (eventSwiper) {
    const eventSlides = eventSwiper.querySelectorAll('.swiper-slide');
    console.log('Event slides count:', eventSlides.length);

    new Swiper('.event-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: eventSlides.length > 1,
      autoplay: eventSlides.length > 1 ? {
        delay: 4000,
        disableOnInteraction: false,
      } : false,
      navigation: {
        nextEl: '.event-swiper-btn-next',
        prevEl: '.event-swiper-btn-prev',
      },
      speed: 600,
      on: {
        slideChange: function () {
          console.log('Event slide changed to:', this.activeIndex);
        },
        init: function () {
          console.log('Event swiper initialized with', this.slides.length, 'slides');
        }
      }
    });
    console.log('Event swiper setup complete');
  } else {
    console.warn('Event swiper container not found');
  }

  // 버튼 클릭 디버깅
  document.addEventListener('click', function (e) {
    if (e.target.closest('.notice-swiper-btn-prev')) {
      console.log('Notice prev button clicked');
    }
    if (e.target.closest('.notice-swiper-btn-next')) {
      console.log('Notice next button clicked');
    }
    if (e.target.closest('.event-swiper-btn-prev')) {
      console.log('Event prev button clicked');
    }
    if (e.target.closest('.event-swiper-btn-next')) {
      console.log('Event next button clicked');
    }
  });
}

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwipers);
} else {
  // 이미 DOM이 로드된 경우
  initSwipers();
} 