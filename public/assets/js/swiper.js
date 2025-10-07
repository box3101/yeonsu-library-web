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
	createAutoplayToggle(
		libraryHoursSwiper,
		$autoplayToggle[0],
		'icon icon-sm icon-stop-black',
		'icon icon-sm icon-play-black'
	);
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
	createAutoplayToggle(
		bannerSwiper,
		$autoplayToggle[0],
		'icon icon-sm icon-stop-white',
		'icon icon-sm icon-play-white'
	);
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

// AI 책큐 캐러셀 스와이퍼
function initAiCarouselSwiper() {
	var $swiper = $('.ai-carousel-swiper');
	if ($swiper.length === 0) return;

	new Swiper('.ai-carousel-swiper', {
		slidesPerView: 5,
		spaceBetween: 10,
		loop: true,
		speed: SWIPER_CONFIG.speed,
		autoHeight: false,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.ai-carousel-btn-next',
			prevEl: '.ai-carousel-btn-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 8,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 8,
			},
			900: {
				slidesPerView: 5,
				spaceBetween: 10,
			},
		},
		on: {
			init: function () {
				// 첫 번째 슬라이드의 첫 번째 카드에 active 클래스 유지
				var firstSlide = this.slides[this.activeIndex];
				if (firstSlide) {
					var firstCard = $(firstSlide).find('.slide-card').first();
					firstCard.addClass('slide-card--active');
				}
			},
			slideChange: function () {
				// 모든 카드에서 active 클래스 제거
				$('.slide-card').removeClass('slide-card--active');

				// 현재 활성 슬라이드의 첫 번째 카드에 active 클래스 추가
				var currentSlide = this.slides[this.activeIndex];
				if (currentSlide) {
					var firstCard = $(currentSlide).find('.slide-card').first();
					firstCard.addClass('slide-card--active');
				}
			},
		},
	});

	// 슬라이드 카드 클릭 이벤트
	$('.slide-card').on('click', function () {
		$('.slide-card').removeClass('slide-card--active');
		$(this).addClass('slide-card--active');
	});
}

// 메인 AI 책큐 추천 슬라이더
function initBookRecommendationSwiper() {
	var $swiper = $('.book-recommendation-swiper');
	if ($swiper.length === 0) return;

	new Swiper('.book-recommendation-swiper', {
		slidesPerView: 5,
		spaceBetween: 12,
		loop: true,
		speed: 500,
		autoHeight: false,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		navigation: {
			nextEl: '.book-recommendation-btn-next',
			prevEl: '.book-recommendation-btn-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 3,
				spaceBetween: 8,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			900: {
				slidesPerView: 5,
				spaceBetween: 12,
			},
		},
	});
}

// 메인 레이어 팝업 스와이퍼
function initMainLayerPopupSwiper() {
	var $swiper = $('[data-popup-swiper]');
	if ($swiper.length === 0) return;

	var slideCount = $swiper.find('.swiper-slide').length;
	var $container = $('.main-layer-popup__container');
	var $counterCurrent = $('.main-layer-popup .swiper-pagination-counter .current');
	var $counterTotal = $('.main-layer-popup .swiper-pagination-counter .total');

	// 1-2개일 때 컨테이너에 클래스 추가
	if (slideCount <= 2) {
		$container.addClass('main-layer-popup__container--single');
	}

	// 페이지 수 계산 함수
	function updateTotalPages(swiper) {
		if ($counterTotal.length === 0) return;
		var perGroup = swiper.params.slidesPerGroup || 1;
		var totalPages = Math.ceil(slideCount / perGroup);
		$counterTotal.text(totalPages);
	}

	var swiper = new Swiper('[data-popup-swiper]', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 48,
		loop: slideCount > 2,
		speed: SWIPER_CONFIG.speed,
		centeredSlides: false,
		autoplay: slideCount > 2 ? { delay: 3000, disableOnInteraction: false } : false,
		allowTouchMove: slideCount > 2,
		navigation:
			slideCount > 2
				? {
						nextEl: '.main-layer-popup .swiper-button-next',
						prevEl: '.main-layer-popup .swiper-button-prev',
				  }
				: false,
		pagination: {
			el: '.main-layer-popup .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
			768: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 30 },
			1024: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 48 },
		},
		on: {
			init: function () {
				// 초기 페이지 수 설정
				updateTotalPages(this);
				// 초기 현재 페이지 설정
				if ($counterCurrent.length > 0) {
					var perGroup = this.params.slidesPerGroup || 1;
					var currentPage = Math.floor(this.realIndex / perGroup) + 1;
					$counterCurrent.text(currentPage);
				}
			},
			breakpoint: function () {
				// 브레이크포인트 변경 시 페이지 수 재계산
				updateTotalPages(this);
			},
			slideChange: function () {
				if ($counterCurrent.length > 0) {
					// 현재 slidesPerGroup에 따라 동적 계산
					var perGroup = this.params.slidesPerGroup || 1;
					var currentPage = Math.floor(this.realIndex / perGroup) + 1;
					$counterCurrent.text(currentPage);
				}
			},
		},
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
		initAiCarouselSwiper();
		initBookRecommendationSwiper();
		initMainLayerPopupSwiper();
	}, 100);
});
