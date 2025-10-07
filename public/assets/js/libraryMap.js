/**
 * 도서관 지도 인터랙티브 마커
 * 도서관 마커 클릭 및 팝업 표시 처리
 */
(function ($) {
	'use strict';

	$(document).ready(function () {
		var $popup = $('.library-popup');
		var $markers = $('.library-marker');
		var currentActiveMarker = null;

		// 도서관 데이터 (목 데이터)
		var libraryData = {
			'songdo-1': { name: '송도국제도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-2': { name: '송도한옥마을도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-3': { name: '송도달빛공원도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-4': { name: '송도센트럴파크도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-5': { name: '송도트리플스트리트도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-6': { name: '송도컨벤시아도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-7': { name: '송도더샵센트럴시티도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-8': { name: '송도랜드마크시티도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-9': { name: '송도푸르지오하버뷰도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-10': { name: '송도동문굿모닝힐도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-11': { name: '송도웰카운티도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-12': { name: '송도롯데캐슬도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-13': { name: '송도현대프리미어캠퍼스도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'songdo-14': { name: '송도아메리칸타운도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'yeonsu-1': { name: '연수꿈담도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'yeonsu-2': { name: '연수청학도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'yeonsu-3': { name: '연수문화의거리도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'yeonsu-4': { name: '연수힐스테이트도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'yeonsu-5': { name: '연수e편한세상도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'dongchun-1': { name: '해돋이도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'sunhak-1': { name: '선학별빛도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'sunhak-2': { name: '선학센트럴푸르지오도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'sunhak-3': { name: '선학자이도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'okryeon-1': { name: '해찬솔공원도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'okryeon-2': { name: '누리공원도서관', logo: './assets/images/icon/yeosu-logo.png' },
			'etc-1': { name: '기타도서관1', logo: './assets/images/icon/yeosu-logo.png' },
			'etc-2': { name: '기타도서관2', logo: './assets/images/icon/yeosu-logo.png' },
			'etc-3': { name: '기타도서관3', logo: './assets/images/icon/yeosu-logo.png' },
		};

		// 마커 클릭 이벤트
		$markers.on('click', function () {
			var $marker = $(this);
			var libraryId = $marker.data('library');
			var libraryInfo = libraryData[libraryId];

			// 같은 마커 클릭 시 토글
			if (currentActiveMarker && currentActiveMarker[0] === $marker[0]) {
				$popup.hide();
				$marker.removeClass('is-active');
				currentActiveMarker = null;
				return;
			}

			// 이전 활성화 마커 비활성화
			if (currentActiveMarker) {
				currentActiveMarker.removeClass('is-active');
			}

			// 현재 마커 활성화
			$marker.addClass('is-active');
			currentActiveMarker = $marker;

			// 팝업 내용 업데이트
			$popup.find('.library-popup__logo img').attr('src', libraryInfo.logo);
			$popup.find('.library-popup__name').text(libraryInfo.name);

			// 팝업 위치 설정 (마커 위치에 맞춰서)
			var markerOffset = $marker.offset();
			var mapOffset = $('.library-map__wrapper').offset();
			var markerLeft = markerOffset.left - mapOffset.left + $marker.outerWidth() / 2;
			var markerTop = markerOffset.top - mapOffset.top;

			$popup.css({
				left: markerLeft + 'px',
				top: markerTop + 'px',
				display: 'flex',
			});
		});

		// 팝업 외부 클릭 시 닫기
		$(document).on('click', function (e) {
			if (!$(e.target).closest('.library-marker').length && !$(e.target).closest('.library-popup').length) {
				$popup.hide();
				if (currentActiveMarker) {
					currentActiveMarker.removeClass('is-active');
					currentActiveMarker = null;
				}
			}
		});
	});
})(jQuery);
