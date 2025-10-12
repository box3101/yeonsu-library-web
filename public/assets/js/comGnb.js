/**
 * 통합 내비게이션 스크립트 - 단순화된 ul > li > a > ol 구조
 * - 데스크톱 GNB 드롭다운 메뉴 (완전한 DOM 기반)
 * - 모바일 햄버거 메뉴
 */
$(document).ready(function () {
	// ==========================================
	// 데스크톱 GNB 관리
	// ==========================================
	function initDesktopGNB() {
		var $gnb = $('#gnb');
		if ($gnb.length === 0) return;

		var $mainItems = $gnb.find('.gnb-main-item');
		var $dim = $('#gnb-dim');

		// 딤 오버레이 표시
		function showDim() {
			if ($dim.length > 0) {
				$dim.addClass('show');
			}
		}

		// 딤 오버레이 숨기기
		function hideDim() {
			if ($dim.length > 0) {
				$dim.removeClass('show');
			}
		}

		// 모든 서브메뉴 숨기기
		function hideAllSubmenus() {
			$gnb.find('.gnb-sub').attr('hidden', true);
			$gnb.find('.gnb-third-list').hide();
			hideDim();
		}

		// 서브메뉴 표시
		function showSubmenu($submenu) {
			hideAllSubmenus();
			$submenu.attr('hidden', false);
			showDim();
		}

		// 3depth 메뉴 표시/숨김 관리
		function showThirdMenu($subItem) {
			// 같은 서브메뉴 내의 모든 3depth 메뉴 숨기기
			$subItem.parent().find('.gnb-third-list').hide();
			
			// 선택된 서브메뉴의 3depth 메뉴 표시
			var $thirdList = $subItem.find('.gnb-third-list');
			if ($thirdList.length > 0) {
				$thirdList.show();
			}
			// 선택 상태 업데이트 - .gnb-sub-item과 .gnb-sub-link 모두에 클래스 추가
			$subItem.parent().find('.gnb-sub-item').removeClass('selected');
			$subItem.parent().find('.gnb-sub-link').removeClass('selected');
			$subItem.addClass('selected');
			$subItem.find('.gnb-sub-link').addClass('selected');
		}

		// 각 메인 아이템에 이벤트 등록
		$mainItems.each(function () {
			var $item = $(this);
			var $mainLink = $item.find('.gnb-main-link');
			var $submenu = $item.find('.gnb-sub');

			if ($submenu.length === 0) return;

			// 클릭 이벤트 (토글 방식)
			$mainLink.on('click', function (e) {
				e.preventDefault();
				
				var isHidden = $submenu.attr('hidden') === 'hidden';
				
				// 모든 1depth 메뉴에서 selected 제거
				$gnb.find('.gnb-main-link').removeClass('selected');
				
				if (isHidden) {
					// 서브메뉴 열기
					showSubmenu($submenu);
					// 현재 메뉴에 selected 추가
					$mainLink.addClass('selected');
					// 첫 번째 서브메뉴 항목의 3depth 표시 (있을 경우)
					var $firstSubItem = $submenu.find('.gnb-sub-item').first();
					if ($firstSubItem.length > 0) {
						showThirdMenu($firstSubItem);
					}
				} else {
					// 서브메뉴 닫기
					hideAllSubmenus();
				}
			});

			// 2depth 클릭/호버/포커스 시 3depth 메뉴 표시
			var $subItems = $submenu.find('.gnb-sub-item');
			$subItems.each(function () {
				var $subItem = $(this);
				var $subLink = $subItem.find('.gnb-sub-link');
				var $thirdList = $subItem.find('.gnb-third-list');

				// 클릭 이벤트
				$subLink.on('click', function (e) {
					console.log('2depth 클릭됨:', $subLink.text().trim());
					
					// 3depth가 있으면 페이지 이동 막고 3depth 표시
					if ($thirdList.length > 0) {
						e.preventDefault();
						showThirdMenu($subItem);
						console.log('3depth 표시됨, selected 클래스:', $subItem.hasClass('selected'));
					}
					// 3depth가 없으면 페이지 이동 (기본 동작)
				});

				// 호버/포커스 시에도 3depth 표시
				$subLink.on('mouseenter focus', function () {
					if ($thirdList.length > 0) {
						showThirdMenu($subItem);
					}
				});
				
				// 3depth 메뉴 클릭 이벤트
				$thirdList.find('.gnb-third-link').on('click', function () {
					// 모든 3depth 아이템에서 selected 제거
					$thirdList.find('.gnb-third-item').removeClass('selected');
					// 클릭한 아이템에 selected 추가
					$(this).closest('.gnb-third-item').addClass('selected');
					console.log('3depth 클릭됨:', $(this).text().trim());
				});
			});
		});

		// 딤 오버레이 클릭 시 메뉴 닫기
		$dim.on('click', hideAllSubmenus);

		// 키보드 네비게이션
		$gnb.on('keydown', function(e) {
			var $focused = $(document.activeElement);
			var key = e.key;
			
			// 현재 포커스된 요소가 GNB 내부에 있는지 확인
			if (!$focused.closest('#gnb').length) return;
			
			if (key === 'ArrowDown' || key === 'ArrowUp') {
				e.preventDefault();
				
				// 메인 메뉴에서 아래 화살표: 서브메뉴로 이동
				if (key === 'ArrowDown' && $focused.hasClass('gnb-main-link')) {
					var $submenu = $focused.closest('.gnb-main-item').find('.gnb-sub');
					if ($submenu.length > 0) {
						showSubmenu($submenu);
						var $firstSubLink = $submenu.find('.gnb-sub-link').first();
						if ($firstSubLink.length > 0) {
							$firstSubLink.focus();
							showThirdMenu($firstSubLink.closest('.gnb-sub-item'));
						}
					}
				}
				
				// 서브메뉴에서 위 화살표: 메인 메뉴로 이동
				if (key === 'ArrowUp' && $focused.hasClass('gnb-sub-link')) {
					var $mainLink = $focused.closest('.gnb-main-item').find('.gnb-main-link');
					if ($mainLink.length > 0) {
						$mainLink.focus();
					}
				}
			}
			
			if (key === 'ArrowLeft' || key === 'ArrowRight') {
				e.preventDefault();
				
				// 메인 메뉴 좌우 이동
				if ($focused.hasClass('gnb-main-link')) {
					var $currentItem = $focused.closest('.gnb-main-item');
					var $targetItem = null;
					
					if (key === 'ArrowRight') {
						$targetItem = $currentItem.next('.gnb-main-item');
						if ($targetItem.length === 0) {
							$targetItem = $currentItem.parent().find('.gnb-main-item').first();
						}
					} else {
						$targetItem = $currentItem.prev('.gnb-main-item');
						if ($targetItem.length === 0) {
							$targetItem = $currentItem.parent().find('.gnb-main-item').last();
						}
					}
					
					if ($targetItem.length > 0) {
						var $targetLink = $targetItem.find('.gnb-main-link');
						$targetLink.focus();
						
						// 서브메뉴가 있으면 표시
						var $targetSubmenu = $targetItem.find('.gnb-sub');
						if ($targetSubmenu.length > 0) {
							showSubmenu($targetSubmenu);
							var $firstSubItem = $targetSubmenu.find('.gnb-sub-item').first();
							if ($firstSubItem.length > 0) {
								showThirdMenu($firstSubItem);
							}
						}
					}
				}
				
				// 서브메뉴에서 오른쪽 화살표: 3depth로 이동
				if (key === 'ArrowRight' && $focused.hasClass('gnb-sub-link')) {
					var $subItem = $focused.closest('.gnb-sub-item');
					var $thirdList = $subItem.find('.gnb-third-list');
					
					if ($thirdList.length > 0) {
						// 3depth 메뉴 표시
						showThirdMenu($subItem);
						
						// 첫 번째 3depth 링크에 포커스
						var $firstThirdLink = $thirdList.find('.gnb-third-link').first();
						if ($firstThirdLink.length > 0) {
							$firstThirdLink.focus();
						}
					}
				}
				
				// 3depth에서 왼쪽 화살표: 2depth로 돌아가기
				if (key === 'ArrowLeft' && $focused.hasClass('gnb-third-link')) {
					var $subItem = $focused.closest('.gnb-sub-item');
					var $subLink = $subItem.find('.gnb-sub-link');
					if ($subLink.length > 0) {
						$subLink.focus();
					}
				}
			}
			
			// Escape: 메뉴 닫기
			if (key === 'Escape') {
				hideAllSubmenus();
				var $mainLink = $focused.closest('.gnb-main-item').find('.gnb-main-link');
				if ($mainLink.length > 0) {
					$mainLink.focus();
				}
			}
		});
		
		// 포커스 떠날 때 서브메뉴 숨기기 (키보드 사용자를 위해)
		$gnb.on('focusout', function(e) {
			// 포커스가 GNB 외부로 나갔는지 확인
			setTimeout(function() {
				var $newFocus = $(document.activeElement);
				if (!$newFocus.closest('#gnb').length) {
					hideAllSubmenus();
				}
			}, 10);
		});
	}

	// ==========================================
	// 모바일 메뉴 관리
	// ==========================================
	function initMobileMenu() {
		var $trigger = $('#mobileMenuTrigger');
		var $menu = $('#mobileMenu');
		var $overlay = $('#mobileMenuOverlay');
		var $close = $('#mobileMenuClose');
		var $detailArea = $('.mobile-menu-detail');

		// 필수 요소 체크
		if ($trigger.length === 0 || $menu.length === 0) return;

		// 메뉴 열기
		function openMenu() {
			$menu.addClass('active');
			$overlay.addClass('active');
			$trigger.addClass('active');
			$('body').css('overflow', 'hidden');
		}

		// 메뉴 닫기
		function closeMenu() {
			$menu.removeClass('active');
			$overlay.removeClass('active');
			$trigger.removeClass('active');
			$('body').css('overflow', '');
			$menu.css('transform', ''); // 스와이프 시 변형 초기화
		}

		// 스크롤 이동
		function smoothScrollTo($container, $target, offset) {
			if (!$container.length || !$target.length) return;
			offset = offset || 20;

			setTimeout(function () {
				var containerTop = $container.offset().top;
				var targetTop = $target.offset().top;
				var scrollPosition = Math.max(0, $container.scrollTop() + targetTop - containerTop - offset);

				$container.animate(
					{
						scrollTop: scrollPosition,
					},
					10
				);
			}, 10);
		}

		// 이벤트 리스너 등록
		$trigger.on('click', openMenu);
		$close.on('click', closeMenu);
		$overlay.on('click', closeMenu);

		// ESC 키로 닫기
		$(document).on('keydown', function (e) {
			if (e.key === 'Escape' && $menu.hasClass('active')) {
				closeMenu();
			}
		});

		// 1depth 탭 전환
		$('.depth-bar-item').on('click', function () {
			var $item = $(this);

			// 탭 상태 업데이트
			$('.depth-bar-item').removeClass('selected');
			$item.addClass('selected');

			// 컨텐츠 전환
			var category = $item.attr('data-category');
			var $targetContent = $('[data-content="' + category + '"]');

			$('.menu-detail-content').removeClass('active');

			if ($targetContent.length > 0) {
				$targetContent.addClass('active');
				smoothScrollTo($detailArea, $targetContent);
			}
		});

		// 2depth 아코디언 토글
		function handleMenuToggle($button) {
			var toggleId = $button.attr('data-toggle');
			var $targetSubmenu = $('[data-submenu="' + toggleId + '"]');

			if ($targetSubmenu.length === 0) return;

			var isExpanded = $button.hasClass('expanded');
			var $parentSection = $button.closest('.menu-section');

			if (isExpanded) {
				// 접기
				$button.removeClass('expanded selected');
				$targetSubmenu.removeClass('active');
			} else {
				// 같은 섹션의 다른 메뉴들 닫기
				if ($parentSection.length > 0) {
					$parentSection.find('.menu-item-toggle').removeClass('expanded selected');
					$parentSection.find('.menu-submenu').removeClass('active');
				}

				// 펼치기
				$button.addClass('expanded selected');
				$targetSubmenu.addClass('active');

				// 스크롤 제거 - 메뉴가 위로 올라가는 문제 해결
				// smoothScrollTo($detailArea, $button);
			}
		}

		// 2depth 토글 버튼 이벤트 등록
		$('.menu-item-toggle').on('click touchend', function (e) {
			e.preventDefault();
			handleMenuToggle($(this));
		});

		// 스와이프로 메뉴 닫기
		var touchStart = { x: 0, isDragging: false };

		$menu.on('touchstart', function (e) {
			var touch = e.originalEvent.touches[0];
			touchStart.x = touch ? touch.clientX : 0;
			touchStart.isDragging = true;
		});

		$menu.on('touchmove', function (e) {
			if (!touchStart.isDragging) return;

			var touch = e.originalEvent.touches[0];
			var currentX = touch ? touch.clientX : 0;
			var diffX = currentX - touchStart.x;

			// 오른쪽 스와이프 시 메뉴 이동
			if (diffX > 0) {
				$menu.css('transform', 'translateX(' + diffX + 'px)');
			}
		});

		$menu.on('touchend', function (e) {
			if (!touchStart.isDragging) return;

			var touch = e.originalEvent.changedTouches[0];
			var currentX = touch ? touch.clientX : 0;
			var diffX = currentX - touchStart.x;

			touchStart.isDragging = false;

			// 50px 이상 스와이프하면 메뉴 닫기
			if (diffX > 50) {
				closeMenu();
			} else {
				$menu.css('transform', ''); // 원래 위치로 복원
			}
		});
	}

	// 초기화 실행
	initDesktopGNB();
	initMobileMenu();
});