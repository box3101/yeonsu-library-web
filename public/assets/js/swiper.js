/**
 * 연수구 도서관 Swiper 초기화
 * - 공지사항, 이벤트, 도서 스와이퍼
 * - UiBookSlider 컴포넌트
 */

const LibrarySwiper = {
  // 동적 스와이퍼 인스턴스 저장
  instances: new Map(),

  // 공지사항 스와이퍼 초기화
  initNoticeSwiper() {
    const noticeSwiper = document.querySelector('.notice-swiper');
    if (!noticeSwiper || this.instances.has('notice-swiper')) return;

    const noticeSlides = noticeSwiper.querySelectorAll('.swiper-slide');

    const instance = new Swiper('.notice-swiper', {
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

    this.instances.set('notice-swiper', instance);
    console.log('✅ Notice Swiper initialized');
  },

  // 이벤트 스와이퍼 초기화
  initEventSwiper() {
    const eventSwiper = document.querySelector('.event-swiper');
    if (!eventSwiper || this.instances.has('event-swiper')) return;

    const eventSlides = eventSwiper.querySelectorAll('.swiper-slide');

    const instance = new Swiper('.event-swiper', {
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

    this.instances.set('event-swiper', instance);
    console.log('✅ Event Swiper initialized');
  },

  // 도서 스와이퍼 초기화 (서가브라우징)
  initBookSwiper() {
    const bookSwiper = document.querySelector('.book-swiper');
    if (!bookSwiper || this.instances.has('book-swiper')) return;

    const instance = new Swiper('.book-swiper', {
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
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });

    this.instances.set('book-swiper', instance);
    console.log('✅ Book Swiper initialized');
  },

  // UiBookSlider 컴포넌트 초기화
  initBookSliders() {
    const sliders = document.querySelectorAll('.ui-book-slider');

    sliders.forEach(slider => {
      const sliderId = slider.id;
      if (!sliderId || this.instances.has(sliderId)) return;

      const slides = slider.querySelectorAll('.swiper-slide');
      if (slides.length === 0) return;

      // 기본 옵션
      const defaultOptions = {
        slidesPerView: 5,
        spaceBetween: 16,
        loop: false,
        speed: 600,
        navigation: {
          nextEl: `.${sliderId}-btn-next`,
          prevEl: `.${sliderId}-btn-prev`,
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        },
        on: {
          init: function () {
            console.log(`Book slider "${sliderId}" initialized with ${this.slides.length} slides`);
          },
          slideChange: function () {
            console.log(`Book slider "${sliderId}" slide changed to:`, this.activeIndex);
          }
        }
      };

      const instance = new Swiper(`#${sliderId}`, defaultOptions);
      this.instances.set(sliderId, instance);
    });

    if (sliders.length > 0) {
      console.log('✅ Book Sliders initialized');
    }
  },

  // 모든 스와이퍼 초기화
  init() {
    // Swiper 라이브러리 로드 확인
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper library not loaded yet, retrying in 100ms...');
      setTimeout(() => this.init(), 100);
      return;
    }

    this.initNoticeSwiper();
    this.initEventSwiper();
    this.initBookSwiper();
    this.initBookSliders();
  },

  // 특정 스와이퍼 인스턴스 가져오기
  getInstance(id) {
    return this.instances.get(id);
  },

  // 모든 인스턴스 삭제
  destroy() {
    this.instances.forEach((instance, id) => {
      instance.destroy(true, true);
      console.log(`Swiper ${id} destroyed`);
    });
    this.instances.clear();
  }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibrarySwiper.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibrarySwiper.init();
  }, 200);
});
