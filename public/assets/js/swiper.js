/**
 * 연수구 도서관 Swiper 초기화
 */

// 공지사항 스와이퍼
function initNoticeSwiper() {
  const swiper = document.querySelector('.notice-swiper');
  if (!swiper) return;

  new Swiper('.notice-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 5000 },
    navigation: {
      nextEl: '.notice-swiper-btn-next',
      prevEl: '.notice-swiper-btn-prev',
    },
  });
}

// 이벤트 스와이퍼
function initEventSwiper() {
  const swiper = document.querySelector('.event-swiper');
  if (!swiper) return;

  new Swiper('.event-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 4000 },
    navigation: {
      nextEl: '.event-swiper-btn-next',
      prevEl: '.event-swiper-btn-prev',
    },
  });
}

// 도서 스와이퍼
function initBookSwiper() {
  const swiper = document.querySelector('.book-swiper');
  if (!swiper) return;

  new Swiper('.book-swiper', {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.book-swiper-btn-next',
      prevEl: '.book-swiper-btn-prev',
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 12 },
      768: { slidesPerView: 4, spaceBetween: 16 },
      1024: { slidesPerView: 5, spaceBetween: 20 },
    },
  });
}

// UI 도서 슬라이더들
function initBookSliders() {
  const sliders = document.querySelectorAll(
    '#book-swiper-1, #book-swiper-2, #book-swiper-3'
  );

  sliders.forEach(slider => {
    const sliderId = slider.id;
    if (!sliderId) return;

    new Swiper(`#${sliderId}`, {
      slidesPerView: 5,
      spaceBetween: 16,
      navigation: {
        nextEl: `.${sliderId}-btn-next`,
        prevEl: `.${sliderId}-btn-prev`,
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 12 },
        768: { slidesPerView: 1, spaceBetween: 16 },
        1024: { slidesPerView: 5, spaceBetween: 16 },
      },
    });
  });
}

// 초기화
document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded');
    return;
  }

  initNoticeSwiper();
  initEventSwiper();
  initBookSwiper();
  initBookSliders();
});
