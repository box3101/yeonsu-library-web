/**
 * 연수구 도서관 Swiper 초기화 (ES5 + jQuery 버전)
 */

// 슬라이더 공통 설정
var SWIPER_CONFIG = {
  speed: 1500, // 슬라이드 전환 속도 (1500ms)
  autoplay: { delay: 1500 },
};

// 자동재생 토글 공통 함수
function createAutoplayToggle(swiper, toggleButton, iconStop, iconPlay) {
  if (!toggleButton || !swiper) return null;

  var isAutoplayRunning = true;
  var $toggleButton = $(toggleButton);

  function updateToggleState(isPlaying) {
    var $iconElement = $toggleButton.find('i');
    if ($iconElement.length === 0) return;

    if (isPlaying) {
      // 재생 중 -> 정지 아이콘 표시
      $iconElement.attr('class', iconStop);
      $toggleButton.attr('aria-label', '자동재생 정지');
    } else {
      // 정지 중 -> 재생 아이콘 표시
      $iconElement.attr('class', iconPlay);
      $toggleButton.attr('aria-label', '자동재생 시작');
    }
  }

  // 초기 상태 설정
  updateToggleState(isAutoplayRunning);

  // 클릭 이벤트 리스너
  $toggleButton.on('click', function () {
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
    toggle: function () {
      if (isAutoplayRunning) {
        swiper.autoplay.stop();
        isAutoplayRunning = false;
      } else {
        swiper.autoplay.start();
        isAutoplayRunning = true;
      }
      updateToggleState(isAutoplayRunning);
    },
    isPlaying: function () {
      return isAutoplayRunning;
    },
    setPlaying: function (playing) {
      isAutoplayRunning = playing;
      updateToggleState(isAutoplayRunning);
    },
  };
}

// 공지사항은 이제 별도의 페이지네이션 스크립트로 처리
// (noticePagination.js 참조)

// 이벤트 스와이퍼
function initEventSwiper() {
  var $swiper = $('.event-swiper');
  if ($swiper.length === 0) return;

  new Swiper('.event-swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 16,
    speed: SWIPER_CONFIG.speed,
    // autoplay: SWIPER_CONFIG.autoplay,
    navigation: {
      nextEl: '.event-swiper-btn-next',
      prevEl: '.event-swiper-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  });
}

// 도서관 이용시간 스와이퍼
function initLibraryHoursSwiper() {
  var $swiperContainer = $('.library-hours-swiper');
  if ($swiperContainer.length === 0) return;

  var $pageCurrentEl = $('.library-hours__page-info-current');
  var $autoplayToggle = $('.library-hours-autoplay-toggle');

  var libraryHoursSwiper = new Swiper('.library-hours-swiper', {
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
        var slides = this.slides;
        for (var i = 0; i < slides.length; i++) {
          var slide = slides[i];
          slide.style.width = '100%';
          slide.style.maxWidth = '100%';
          slide.style.minWidth = '100%';
        }
      },
      slideChange: function () {
        if ($pageCurrentEl.length > 0) {
          // loop가 활성화된 경우 실제 인덱스 계산
          var realIndex = this.realIndex;
          $pageCurrentEl.text(' ' + (realIndex + 1));
        }
      },
    },
  });

  // 자동재생 토글 기능
  createAutoplayToggle(libraryHoursSwiper, $autoplayToggle[0], 'icon icon-sm icon-stop-black', 'icon icon-sm icon-play-black');
}

// 배너 스와이퍼 (Footer)
function initBannerSwiper() {
  var $swiper = $('.banner-swiper');
  if ($swiper.length === 0) return;

  var $autoplayToggle = $('.banner-swiper-autoplay-toggle');

  var bannerSwiper = new Swiper('.banner-swiper', {
    slidesPerView: 2, // 2개 슬라이드 표시 (모바일)
    spaceBetween: 16, // 슬라이드 간격
    speed: SWIPER_CONFIG.speed,
    autoplay: SWIPER_CONFIG.autoplay,
    loop: true,
    navigation: {
      nextEl: '.banner-swiper-btn-next',
      prevEl: '.banner-swiper-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
    },
  });

  // 배너 스와이퍼 자동재생 토글 기능
  createAutoplayToggle(bannerSwiper, $autoplayToggle[0], 'icon icon-sm icon-stop-white', 'icon icon-sm icon-play-white');
}

// 도서 스와이퍼
function initBookSwiper() {
  var $swiper = $('.book-swiper');
  if ($swiper.length === 0) return;

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
  var $sliders = $('#book-swiper-1, #book-swiper-2, #book-swiper-3');

  $sliders.each(function () {
    var $slider = $(this);
    var sliderId = $slider.attr('id');
    if (!sliderId) return;

    new Swiper('#' + sliderId, {
      speed: SWIPER_CONFIG.speed,
      loop: true,
      navigation: {
        nextEl: '.' + sliderId + '-btn-next',
        prevEl: '.' + sliderId + '-btn-prev',
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 12 },
        768: { slidesPerView: 1, spaceBetween: 16 },
        1024: { slidesPerView: 5, spaceBetween: 16 },
      },
    });
  });
}

// 초기화 (jQuery ready 사용)
$(document).ready(function () {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded');
    return;
  }

  // 조금 딜레이를 주어서 DOM이 완전히 렌더링된 후 초기화
  setTimeout(function () {
    // initNoticeSwiper(); // 제거 - 이제 noticePagination.js에서 처리
    initEventSwiper();
    initBannerSwiper();
    initLibraryHoursSwiper();
    initBookSwiper();
    initBookSliders();
  }, 100);
});
