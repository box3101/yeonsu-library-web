/**
 * 왼쪽 메뉴 토글 기능 - jQuery 버전
 * data-menu-toggle 속성을 가진 요소들의 토글 기능 제공
 * 다른 메뉴 클릭 시 현재 열린 메뉴 자동 닫기 기능 포함
 */
(function ($) {
  'use strict';

  // DOM이 로드되면 초기화 실행
  $(document).ready(function () {
    initLeftMenu();
  });

  function initLeftMenu() {
    // data-menu-toggle 속성을 가진 모든 버튼 찾기
    var $toggleButtons = $('[data-menu-toggle]');

    if ($toggleButtons.length === 0) return;

    // 각 토글 버튼에 클릭 이벤트 바인딩
    $toggleButtons.on('click', handleMenuToggle);

    // 메뉴 링크들에 클릭 효과 추가
    initMenuLinkEffects();
  }

  /**
   * 메뉴 링크들에 클릭 효과 초기화
   */
  function initMenuLinkEffects() {
    var $menuLinks = $('.menu-link');

    $menuLinks.on('click', function (e) {
      var $link = $(this);
      
      // 임시 클릭 효과 클래스 추가
      $link.addClass('clicking');
      
      // 300ms 후 클래스 제거
      setTimeout(function () {
        $link.removeClass('clicking');
      }, 300);
    });

    // 마우스 다운/업 효과
    $menuLinks.on('mousedown', function () {
      $(this).addClass('pressed');
    });

    $menuLinks.on('mouseup mouseleave', function () {
      $(this).removeClass('pressed');
    });
  }

  function handleMenuToggle(event) {
    event.preventDefault();

    var $button = $(this);
    var toggleIndex = $button.attr('data-menu-toggle');

    if (!toggleIndex) return;

    // 해당하는 메뉴 콘텐츠 찾기
    var $menuContent = $('[data-menu-content="' + toggleIndex + '"]');

    if ($menuContent.length === 0) return;

    // 현재 상태 확인
    var isExpanded = $button.attr('aria-expanded') === 'true';
    var isActive = $menuContent.hasClass('expanded');

    // 클릭한 메뉴만 토글
    if (isExpanded || isActive) {
      // 현재 메뉴 닫기
      closeMenu($button, $menuContent);
    } else {
      // 다른 메뉴들 먼저 닫기
      closeOtherMenus(toggleIndex);
      // 2depth 직접 링크의 active 상태 제거
      $('.menu-section-title.direct-link.active').removeClass('active');
      // 현재 메뉴 열기
      openMenu($button, $menuContent);
    }
  }

  /**
   * 다른 메뉴들 모두 닫기
   * @param {string} excludeIndex - 제외할 메뉴의 인덱스 (현재 클릭한 메뉴)
   */
  function closeOtherMenus(excludeIndex) {
    var $openButtons = $('[data-menu-toggle][aria-expanded="true"]');
    $openButtons.each(function () {
      var $button = $(this);
      var buttonIndex = $button.attr('data-menu-toggle');
      if (buttonIndex !== excludeIndex) {
        var $content = $('[data-menu-content="' + buttonIndex + '"]');
        closeMenu($button, $content);
      }
    });
  }

  /**
   * 메뉴 열기
   * @param {jQuery} $button - 토글 버튼 jQuery 객체
   * @param {jQuery} $content - 메뉴 콘텐츠 jQuery 객체
   */
  function openMenu($button, $content) {
    $button.attr('aria-expanded', 'true');
    $button.addClass('expanded');
    $content.addClass('expanded');
  }

  /**
   * 메뉴 닫기
   * @param {jQuery} $button - 토글 버튼 jQuery 객체
   * @param {jQuery} $content - 메뉴 콘텐츠 jQuery 객체
   */
  function closeMenu($button, $content) {
    $button.attr('aria-expanded', 'false');
    $button.removeClass('expanded');
    $content.removeClass('expanded');
  }

  // LibraryCommon이 있다면 등록
  if (typeof LibraryCommon !== 'undefined' && LibraryCommon.features) {
    LibraryCommon.features.leftMenu = {
      init: initLeftMenu,
      selectors: ['[data-menu-toggle]'],
      methods: {
        openMenu: openMenu,
        closeMenu: closeMenu,
        closeOtherMenus: closeOtherMenus,
      },
    };
  }
})(jQuery);
