/**
 * 통합 내비게이션 스크립트 - ES5 + jQuery 단순화 버전
 * - 데스크톱 GNB 드롭다운 메뉴
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

		// 모든 서브메뉴 숨기기
		function hideAllSubmenus() {
			$gnb.find('.gnb-sub').attr('hidden', true);
		}

		// 서브메뉴 표시
		function showSubmenu($submenu) {
			hideAllSubmenus();
			$submenu.attr('hidden', false);
		}

		// 3depth 컨텐츠 업데이트
		function updateThirdContent($subItem, $thirdTitle, $thirdItems) {
			var label = $subItem.find('.gnb-sub-text').text();

			// 기존: var subItemsData = $subItem.attr('data-sub-items');
			// 변경: DOM에서 직접 3depth 메뉴 데이터 추출
			var $thirdSubmenu = $subItem.find('.gnb-third-submenu');
			var subItems = [];

			if ($thirdSubmenu.length > 0) {
				$thirdSubmenu.find('.gnb-third-sub-item').each(function () {
					var $item = $(this);
					var $link = $item.find('.gnb-third-sub-link');
					subItems.push({
						label: $item.find('.gnb-third-sub-text').text(),
						href: $link.attr('href'),
						isSelected: $item.hasClass('selected'),
					});
				});
			}

			// 선택 상태 업데이트
			$subItem.parent().find('.gnb-sub-item').removeClass('selected');
			$subItem.addClass('selected');

			// 타이틀 업데이트
			if ($thirdTitle.length > 0 && label) {
				$thirdTitle.text(label);
			}

			// 3depth 아이템 렌더링
			if ($thirdItems.length > 0 && subItems.length > 0) {
				var html = '<div class="gnb-third-column">';

				for (var i = 0; i < subItems.length; i++) {
					var item = subItems[i];
					html += '<div class="gnb-third-item ' + (item.isSelected ? 'selected' : '') + '">';
					html += '<a href="' + item.href + '" class="gnb-third-link" role="menuitem" tabindex="-1">';
					html += '<span class="gnb-third-text">' + item.label + '</span>';
					html += '</a></div>';
				}

				html += '</div>';
				$thirdItems.html(html);
			} else if ($thirdItems.length > 0) {
				$thirdItems.html('');
			}
		}

		// 각 메인 아이템에 이벤트 등록
		$mainItems.each(function () {
			var $item = $(this);
			var $mainLink = $item.find('.gnb-main-link');
			var $submenu = $item.find('.gnb-sub');

			if ($submenu.length === 0) return;

			// 호버 이벤트
			$item.on('mouseenter', function () {
				showSubmenu($submenu);
			});

			$item.on('mouseleave', function (e) {
				if (!$submenu[0].contains(e.relatedTarget)) {
					setTimeout(function () {
						$submenu.attr('hidden', true);
					}, 100);
				}
			});

			// 포커스 이벤트
			$mainLink.on('focus', function () {
				showSubmenu($submenu);
			});

			// 2depth 호버 시 3depth 업데이트
			var $subItems = $submenu.find('.gnb-sub-item');
			var $thirdTitle = $submenu.find('[data-third-title]');
			var $thirdItems = $submenu.find('[data-third-items]');

			$subItems.each(function () {
				var $subItem = $(this);
				var $subLink = $subItem.find('.gnb-sub-link');

				$subLink.on('mouseenter focus', function () {
					updateThirdContent($subItem, $thirdTitle, $thirdItems);
				});
			});
		});

		// GNB 전체 벗어날 때 숨기기
		$gnb.on('mouseleave', hideAllSubmenus);

		// 키보드 네비게이션 향상
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
						}
					}
				}
				
				// 서브메뉴에서 오른쪽 화살표: 3depth로 이동
				if (key === 'ArrowRight' && $focused.hasClass('gnb-sub-link')) {
					var $subItem = $focused.closest('.gnb-sub-item');
					var $submenu = $focused.closest('.gnb-sub');
					var $thirdTitle = $submenu.find('[data-third-title]');
					var $thirdItems = $submenu.find('[data-third-items]');
					
					// 3depth 컨텐츠 업데이트
					updateThirdContent($subItem, $thirdTitle, $thirdItems);
					
					// 첫 번째 3depth 링크에 포커스
					setTimeout(function() {
						var $firstThirdLink = $thirdItems.find('.gnb-third-link').first();
						if ($firstThirdLink.length > 0) {
							$firstThirdLink.attr('tabindex', '0').focus();
						}
					}, 50);
				}
				
				// 3depth에서 왼쪽 화살표: 2depth로 돌아가기
				if (key === 'ArrowLeft' && $focused.hasClass('gnb-third-link')) {
					var $submenu = $focused.closest('.gnb-sub');
					var $selectedSubLink = $submenu.find('.gnb-sub-item.selected .gnb-sub-link');
					if ($selectedSubLink.length > 0) {
						// 모든 3depth 링크의 tabindex 리셋
						$submenu.find('.gnb-third-link').attr('tabindex', '-1');
						$selectedSubLink.focus();
					}
				}
			}
			
			// Tab/Shift+Tab으로 3depth 내부 네비게이션
			if (key === 'Tab' && $focused.hasClass('gnb-third-link')) {
				var $thirdLinks = $focused.closest('.gnb-third-column').find('.gnb-third-link');
				var currentIndex = $thirdLinks.index($focused);
				var nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
				
				if (nextIndex >= 0 && nextIndex < $thirdLinks.length) {
					e.preventDefault();
					$thirdLinks.attr('tabindex', '-1');
					$thirdLinks.eq(nextIndex).attr('tabindex', '0').focus();
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
					// 모든 3depth 링크의 tabindex 리셋
					$gnb.find('.gnb-third-link').attr('tabindex', '-1');
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

				// 펼친 메뉴로 스크롤
				smoothScrollTo($detailArea, $button);
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
