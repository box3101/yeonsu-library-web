/**
 * 도서관 필터 스크립트
 */
$(document).ready(function () {
	// 체크박스 전체 선택/해제
	function initCheckboxes() {
		$('.ui-library-filter').each(function () {
			var $container = $(this);
			var $mainCheckbox = $container.find('.ui-library-filter__main-checkbox input');
			var $itemCheckboxes = $container.find('.ui-library-filter__item-checkbox input');

			// 전체 선택
			$mainCheckbox.on('change', function () {
				var isChecked = $(this).prop('checked');
				$itemCheckboxes.prop('checked', isChecked);
			});

			// 개별 선택 시 전체 체크박스 상태 업데이트
			$itemCheckboxes.on('change', function () {
				var totalCount = $itemCheckboxes.length;
				var checkedCount = $itemCheckboxes.filter(':checked').length;

				if (checkedCount === totalCount) {
					$mainCheckbox.prop('checked', true).prop('indeterminate', false);
				} else if (checkedCount === 0) {
					$mainCheckbox.prop('checked', false).prop('indeterminate', false);
				} else {
					$mainCheckbox.prop('checked', false).prop('indeterminate', true);
				}
			});
		});
	}

	// 토글 버튼 (접기/펼치기)
	function initToggle() {
		$('.ui-library-filter__toggle').on('click', function () {
			var $button = $(this);
			var $content = $button.closest('.ui-library-filter').find('.ui-library-filter__content');
			var isExpanded = $button.attr('aria-expanded') === 'true';

			$button.attr('aria-expanded', !isExpanded);
			$content.toggleClass('is-open');
		});
	}

	// 검색 드롭다운
	function initSearchDropdown() {
		var $searchInput = $('#search');
		var $dropdown = $('.ui-library-filter__search-dropdown');

		// 포커스 시 드롭다운 열기
		$searchInput.on('focus', function () {
			$dropdown.addClass('is-open');
		});

		// 포커스 벗어날 때 드롭다운 닫기
		$searchInput.on('blur', function () {
			setTimeout(function () {
				$dropdown.removeClass('is-open');
			}, 200);
		});

		// 드롭다운 클릭 시 포커스 유지
		$dropdown.on('mousedown', function (e) {
			e.preventDefault();
		});

		// 탭 버튼 클릭
		$('.search-tab-button').on('click', function () {
			var $tab = $(this);
			var targetTab = $tab.data('tab');

			// 탭 활성화
			$('.search-tab-button').removeClass('active');
			$tab.addClass('active');

			// 컨텐츠 전환
			$('.search-content').removeClass('active');
			$('#' + targetTab + '-searches').addClass('active');
		});

		// 검색어 항목 클릭
		$('.search-item').on('click', function () {
			var term = $(this).data('term');
			$searchInput.val(term);
			$dropdown.removeClass('is-open');
		});
	}

	// 다국어 키보드 버튼
	function initKeyboard() {
		$('.ui-keyboard-trigger').on('click', function (e) {
			e.preventDefault();
			if (window.openKeyboard) {
				window.openKeyboard();
			}
		});
	}

	// ESC 키로 드롭다운 닫기
	function initEscHandler() {
		$(document).on('keydown', function (e) {
			if (e.key === 'Escape') {
				$('.ui-library-filter__search-dropdown').removeClass('is-open');
			}
		});
	}

	// 초기화 실행
	initCheckboxes();
	initToggle();
	initSearchDropdown();
	initKeyboard();
	initEscHandler();
});

// - .input-with-button 요소마다 버튼 클릭 시 키보드 패널 토글
$(function () {
	// .input-with-button 각각에 대해 처리
	$('.input-with-button').each(function () {
		var $box = $(this); // 현재 input-with-button 박스
		var $btn = $box.find('.ui-button').first(); // 버튼 (여러 개 있을 수 있으니 첫 번째만)
		var $panel = $box.find('.keyboard-wrapper--inline .worldword-wrap').first(); // 인라인 키보드 패널

		// 버튼 또는 패널이 없으면 스킵
		if ($btn.length === 0 || $panel.length === 0) return;

		// 버튼 클릭 시 패널 토글
		$btn.on('click', function (e) {
			e.preventDefault();
			// 현재 패널이 보이면 숨기고, 아니면 보이게
			if ($panel.css('display') === 'block') {
				$panel.css('display', 'none');
			} else {
				$panel.css('display', 'block');
			}
		});

		// 문서 전체 클릭 시, box 영역 밖이면 패널 닫기
		// (이벤트 중첩 방지 위해 document에 한 번만 바인딩, 각 box별로 처리)
		$(document).on('click', function (e) {
			// 클릭된 요소가 현재 box 내부에 포함되어 있지 않으면 패널 닫기
			if (!$box.is(e.target) && $box.has(e.target).length === 0) {
				$panel.css('display', 'none');
			}
		});
	});
});
