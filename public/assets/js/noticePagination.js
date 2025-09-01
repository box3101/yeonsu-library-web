/**
 * 공지사항 페이지네이션 (스와이퍼 대신 일반 자바스크립트 사용)
 */
(function () {
	'use strict';

	// 전역 변수
	var currentPage = 0;
	var itemsPerPage = 4;
	var totalItems = 0;
	var totalPages = 0;
	var $noticeList = null;
	var $noticeItems = null;
	var $prevBtn = null;
	var $nextBtn = null;

	// 초기화 함수
	function initNoticePagination() {
		$noticeList = $('.notice-list');
		if ($noticeList.length === 0) return;

		$noticeItems = $noticeList.find('.notice-item');
		$prevBtn = $('.notice-prev-btn');
		$nextBtn = $('.notice-next-btn');

		// 설정 읽기
		itemsPerPage = parseInt($noticeList.data('items-per-page')) || 4;
		totalItems = $noticeItems.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);

		// 데이터가 없으면 종료
		if (totalItems === 0) {
			showEmptyState();
			return;
		}

		// 버튼 이벤트 등록
		if ($prevBtn.length > 0) {
			$prevBtn.on('click', function (e) {
				e.preventDefault();
				goToPreviousPage();
			});
		}

		if ($nextBtn.length > 0) {
			$nextBtn.on('click', function (e) {
				e.preventDefault();
				goToNextPage();
			});
		}

		// 초기 페이지 표시
		showPage(0);
		updateNavigationButtons();
	}

	// 페이지 표시 함수
	function showPage(pageIndex) {
		if (pageIndex < 0 || pageIndex >= totalPages) return;

		currentPage = pageIndex;
		var startIndex = pageIndex * itemsPerPage;
		var endIndex = Math.min(startIndex + itemsPerPage, totalItems);

		// 모든 아이템 숨기기
		$noticeItems.addClass('hidden').removeClass('fade-in fade-out');

		// 현재 페이지 아이템만 표시
		for (var i = startIndex; i < endIndex; i++) {
			var $item = $noticeItems.eq(i);
			$item.removeClass('hidden').addClass('fade-in');
		}

		updateNavigationButtons();
	}

	// 이전 페이지
	function goToPreviousPage() {
		if (currentPage > 0) {
			showPage(currentPage - 1);
		} else if (totalPages > 1) {
			// 첫 번째 페이지에서 이전 버튼 클릭 시 마지막 페이지로 (루프)
			showPage(totalPages - 1);
		}
	}

	// 다음 페이지
	function goToNextPage() {
		if (currentPage < totalPages - 1) {
			showPage(currentPage + 1);
		} else if (totalPages > 1) {
			// 마지막 페이지에서 다음 버튼 클릭 시 첫 번째 페이지로 (루프)
			showPage(0);
		}
	}

	// 네비게이션 버튼 상태 업데이트
	function updateNavigationButtons() {
		if ($prevBtn.length === 0 || $nextBtn.length === 0) return;

		// 페이지가 1개뿐이면 버튼 비활성화
		if (totalPages <= 1) {
			$prevBtn.addClass('disabled').attr('disabled', true);
			$nextBtn.addClass('disabled').attr('disabled', true);
		} else {
			$prevBtn.removeClass('disabled').attr('disabled', false);
			$nextBtn.removeClass('disabled').attr('disabled', false);
		}
	}

	// 빈 상태 표시
	function showEmptyState() {
		if ($noticeList.length > 0) {
			$noticeList.html('<div class="notice-empty"><p>공지사항이 없습니다.</p></div>');
		}

		// 버튼 비활성화
		if ($prevBtn.length > 0) $prevBtn.addClass('disabled').attr('disabled', true);
		if ($nextBtn.length > 0) $nextBtn.addClass('disabled').attr('disabled', true);
	}

	// DOM이 로드된 후 초기화
	$(document).ready(function () {
		setTimeout(function () {
			initNoticePagination();
		}, 10);
	});
})();
