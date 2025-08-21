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
      var subItemsData = $subItem.attr('data-sub-items');

      // 선택 상태 업데이트
      $subItem.parent().find('.gnb-sub-item').removeClass('selected');
      $subItem.addClass('selected');

      // 타이틀 업데이트
      if ($thirdTitle.length > 0 && label) {
        $thirdTitle.text(label);
      }

      // 3depth 아이템 렌더링
      if ($thirdItems.length > 0 && subItemsData) {
        try {
          var items = JSON.parse(subItemsData);
          var html = '<div class="gnb-third-column">';

          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            html += '<div class="gnb-third-item ' + (item.isSelected ? 'selected' : '') + '">';
            html += '<a href="' + item.href + '" class="gnb-third-link">';
            html += '<span class="gnb-third-text">' + item.label + '</span>';
            html += '</a></div>';
          }

          html += '</div>';
          $thirdItems.html(html);
        } catch (e) {
          $thirdItems.html('');
        }
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
          300
        );
      }, 250);
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
