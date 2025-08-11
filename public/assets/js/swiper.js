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

  // 공지사항 스와이퍼 초기화
  const noticeSwiper = document.querySelector('.notice-swiper');
  if (noticeSwiper) {
    const noticeSlides = noticeSwiper.querySelectorAll('.swiper-slide');
    console.log('Notice slides count:', noticeSlides.length);

    new Swiper('.notice-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: noticeSlides.length > 1,
      autoplay:
        noticeSlides.length > 1
          ? {
            delay: 5000,
            disableOnInteraction: false,
          }
          : false,
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
          console.log(
            'Notice swiper initialized with',
            this.slides.length,
            'slides'
          );
        },
      },
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
      autoplay:
        eventSlides.length > 1
          ? {
            delay: 4000,
            disableOnInteraction: false,
          }
          : false,
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
          console.log(
            'Event swiper initialized with',
            this.slides.length,
            'slides'
          );
        },
      },
    });
    console.log('Event swiper setup complete');
  } else {
    console.warn('Event swiper container not found');
  }

  // 도서 - 서가브라우징 스와이퍼 초기화
  // 도서 - 서가브라우징 스와이퍼 초기화
  const bookSwiper = document.querySelector('.book-swiper');
  if (bookSwiper) {
    const bookSlides = bookSwiper.querySelectorAll('.swiper-slide');
    console.log('Book slides count:', bookSlides.length);

    new Swiper('.book-swiper', {
      slidesPerView: 5,
      spaceBetween: 17,
      slidesPerGroup: 1,
      navigation: {
        nextEl: '.book-swiper-btn-next',
        prevEl: '.book-swiper-btn-prev',
      },
      speed: 300,
      allowTouchMove: true,
      grabCursor: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 17
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 17
        }
      },
      on: {
        init: function () {
          console.log('Book swiper initialized with', this.slides.length, 'slides');
        },
      },
    });
    console.log('Book swiper setup complete');
  } else {
    console.warn('Book swiper container not found');
  }

}

// DOM 로드 완료 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwipers);
} else {
  // 이미 DOM이 로드된 경우
  initSwipers();
}
