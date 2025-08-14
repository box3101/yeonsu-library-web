/**
 * 연수구 도서관 Swiper 초기화
 */

// 슬라이더 공통 설정
const SWIPER_CONFIG = {
  speed: 1500, // 슬라이드 전환 속도 (800ms)
  autoplay: { delay: 1500 },
};

// 자동재생 토글 공통 함수
function createAutoplayToggle(swiper, toggleButton, iconStop, iconPlay) {
  if (!toggleButton || !swiper) return null;

  let isAutoplayRunning = true;

  function updateToggleState(isPlaying) {
    const iconElement = toggleButton.querySelector('i');
    if (!iconElement) return;

    if (isPlaying) {
      // 재생 중 -> 정지 아이콘 표시
      iconElement.className = iconStop;
      toggleButton.setAttribute('aria-label', '자동재생 정지');
    } else {
      // 정지 중 -> 재생 아이콘 표시
      iconElement.className = iconPlay;
      toggleButton.setAttribute('aria-label', '자동재생 시작');
    }
  }

  // 초기 상태 설정
  updateToggleState(isAutoplayRunning);

  // 클릭 이벤트 리스너
  toggleButton.addEventListener('click', function () {
    if (isAutoplayRunning) {
      swiper.autoplay.stop();
      isAutoplayRunning = false;
    } else {
      swiper.autoplay.start();
      isAutoplayRunning = true;
    }
    updateToggleState(isAutoplayRunning);
  });

  return {
    toggle: () => {
      if (isAutoplayRunning) {
        swiper.autoplay.stop();
        isAutoplayRunning = false;
      } else {
        swiper.autoplay.start();
        isAutoplayRunning = true;
      }
      updateToggleState(isAutoplayRunning);
    },
    isPlaying: () => isAutoplayRunning,
    setPlaying: playing => {
      isAutoplayRunning = playing;
      updateToggleState(isAutoplayRunning);
    },
  };
}

// 공지사항 스와이퍼
function initNoticeSwiper() {
  const swiper = document.querySelector('.notice-swiper');
  if (!swiper) return;

  new Swiper('.notice-swiper', {
    slidesPerView: 1,
    loop: true,
    speed: SWIPER_CONFIG.speed,
    // autoplay: SWIPER_CONFIG.autoplay,
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
    speed: SWIPER_CONFIG.speed,
    // autoplay: SWIPER_CONFIG.autoplay,
    navigation: {
      nextEl: '.event-swiper-btn-next',
      prevEl: '.event-swiper-btn-prev',
    },
  });
}

// 도서관 이용시간 스와이퍼
function initLibraryHoursSwiper() {
  const swiperContainer = document.querySelector('.library-hours-swiper');
  if (!swiperContainer) return;

  const pageCurrentEl = document.querySelector(
    '.library-hours__page-info-current'
  );
  const autoplayToggle = document.querySelector(
    '.library-hours-autoplay-toggle'
  );

  const libraryHoursSwiper = new Swiper('.library-hours-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: SWIPER_CONFIG.speed,
    centeredSlides: false,
    autoplay: SWIPER_CONFIG.autoplay,
    navigation: {
      nextEl: '.library-hours-btn-next',
      prevEl: '.library-hours-btn-prev',
    },
    on: {
      init: function () {
        // 초기화 후 다시 한번 스타일 강제 적용
        const slides = this.slides;
        slides.forEach(slide => {
          slide.style.width = '100%';
          slide.style.maxWidth = '100%';
          slide.style.minWidth = '100%';
        });
      },
      slideChange: function () {
        if (pageCurrentEl) {
          // loop가 활성화된 경우 실제 인덱스 계산
          const realIndex = this.realIndex;
          pageCurrentEl.textContent = ` ${realIndex + 1}`;
        }
      },
    },
  });

  // 자동재생 토글 기능
  createAutoplayToggle(
    libraryHoursSwiper,
    autoplayToggle,
    'icon icon-sm icon-stop-black',
    'icon icon-sm icon-play-black'
  );
}

// 배너 스와이퍼 (Footer)
function initBannerSwiper() {
  const swiper = document.querySelector('.banner-swiper');
  if (!swiper) return;

  const autoplayToggle = document.querySelector(
    '.banner-swiper-autoplay-toggle'
  );

  const bannerSwiper = new Swiper('.banner-swiper', {
    slidesPerView: 5, // 5개 슬라이드 표시
    spaceBetween: 16, // 슬라이드 간격
    speed: SWIPER_CONFIG.speed,
    loop: true, // 8개 슬라이드로 늘려서 loop 정상 작동
    autoplay: SWIPER_CONFIG.autoplay,
    navigation: {
      nextEl: '.banner-swiper-btn-next',
      prevEl: '.banner-swiper-btn-prev',
    },
    // 🔥 Swiper width 버그 강제 해결
    on: {
      init: function () {
        fixSwiperWidth(this);
      },
      resize: function () {
        fixSwiperWidth(this);
      },
      slideChange: function () {
        fixSwiperWidth(this);
      },
    },
    breakpoints: {
      // 반응형 설정
      320: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
    },
  });

  // Swiper width 버그 강제 해결 함수
  function fixSwiperWidth(swiper) {
    const slides = swiper.slides;
    const currentSlidesPerView = swiper.params.slidesPerView;
    const currentSpaceBetween = swiper.params.spaceBetween;

    slides.forEach(slide => {
      // 엄청난 width 값 강제 초기화
      if (slide.style.width.includes('e+')) {
        const percentage = 100 / currentSlidesPerView;
        const gapAdjustment =
          (currentSpaceBetween * (currentSlidesPerView - 1)) /
          currentSlidesPerView;
        const correctWidth = `calc(${percentage}% - ${gapAdjustment}px)`;

        slide.style.width = correctWidth;
        slide.style.maxWidth = correctWidth;
        slide.style.flex = `0 0 ${correctWidth}`;

        console.log(
          `Fixed slide width from ${slide.style.width} to ${correctWidth}`
        );
      }
    });
  }

  // 배너 스와이퍼 자동재생 토글 기능
  createAutoplayToggle(
    bannerSwiper,
    autoplayToggle,
    'icon icon-sm icon-stop-white',
    'icon icon-sm icon-play-white'
  );
}

// 도서 스와이퍼
function initBookSwiper() {
  const swiper = document.querySelector('.book-swiper');
  if (!swiper) return;

  new Swiper('.book-swiper', {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    speed: SWIPER_CONFIG.speed,
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
      speed: SWIPER_CONFIG.speed,
      loop: true,
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

  // 조금 딜레이를 주어서 DOM이 완전히 렌더링된 후 초기화
  setTimeout(() => {
    initNoticeSwiper();
    initEventSwiper();
    initBannerSwiper();
    initLibraryHoursSwiper();
    initBookSwiper();
    initBookSliders();
  }, 100);
});
