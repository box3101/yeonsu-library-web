import { Swiper } from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * 공지사항 스와이퍼 초기화
 * @param {string} containerSelector - 스와이퍼 컨테이너 선택자
 * @param {Object} options - 추가 옵션
 */
export function initNoticeSwiper(
  containerSelector = '.notice-swiper',
  options = {}
) {
  const defaultOptions = {
    modules: [Navigation, Autoplay, Pagination],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.notice-swiper-btn-next',
      prevEl: '.notice-swiper-btn-prev',
    },
    pagination: {
      el: '.notice-swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    loop: true,
    speed: 600,
    effect: 'slide',
  };

  // 옵션 병합
  const finalOptions = { ...defaultOptions, ...options };

  // 컨테이너가 존재할 때만 초기화
  const container = document.querySelector(containerSelector);
  if (container) {
    return new Swiper(containerSelector, finalOptions);
  }

  console.warn(`Swiper container "${containerSelector}" not found`);
  return null;
}

/**
 * 배너 스와이퍼 초기화 (향후 사용을 위해)
 * @param {string} containerSelector - 스와이퍼 컨테이너 선택자
 * @param {Object} options - 추가 옵션
 */
export function initBannerSwiper(
  containerSelector = '.banner-swiper',
  options = {}
) {
  const defaultOptions = {
    modules: [Navigation, Autoplay, Pagination],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.banner-swiper-btn-next',
      prevEl: '.banner-swiper-btn-prev',
    },
    pagination: {
      el: '.banner-swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    loop: true,
    speed: 800,
    effect: 'fade',
  };

  const finalOptions = { ...defaultOptions, ...options };
  const container = document.querySelector(containerSelector);

  if (container) {
    return new Swiper(containerSelector, finalOptions);
  }

  console.warn(`Swiper container "${containerSelector}" not found`);
  return null;
}

/**
 * 범용 스와이퍼 초기화
 * @param {string} containerSelector - 스와이퍼 컨테이너 선택자
 * @param {Object} options - 스와이퍼 옵션
 */
export function initSwiper(containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);

  if (container) {
    return new Swiper(containerSelector, options);
  }

  console.warn(`Swiper container "${containerSelector}" not found`);
  return null;
}

/**
 * 이벤트 카드 스와이퍼 초기화 (4개씩 그룹 슬라이드)
 * @param {string} containerSelector - 스와이퍼 컨테이너 선택자
 * @param {Object} options - 추가 옵션
 */
export function initEventSwiper(
  containerSelector = '.event-swiper',
  options = {}
) {
  const defaultOptions = {
    modules: [Navigation, Autoplay, Pagination],
    slidesPerView: 1, // 한 번에 하나의 그룹(4개 카드)만 보여줌
    spaceBetween: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.event-swiper-btn-next',
      prevEl: '.event-swiper-btn-prev',
    },
    pagination: {
      el: '.event-swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    loop: true,
    speed: 600,
    effect: 'slide',
  };

  // 옵션 병합
  const finalOptions = { ...defaultOptions, ...options };

  // 컨테이너가 존재할 때만 초기화
  const container = document.querySelector(containerSelector);
  if (container) {
    return new Swiper(containerSelector, finalOptions);
  }

  console.warn(`Swiper container "${containerSelector}" not found`);
  return null;
}
