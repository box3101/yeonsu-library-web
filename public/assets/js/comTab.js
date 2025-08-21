/**
 * 탭 컴포넌트 - ES5 + jQuery 버전
 * ES6 객체 리터럴 → ES5 객체 패턴으로 변경
 * const/let → var로 변경
 * 화살표 함수 → function()으로 변경
 * DOM API → jQuery로 변경
 */
var LibraryTab = {
  /**
   * 탭 초기화 함수
   * document.querySelectorAll → $('.ui-tab__button')
   * forEach → jQuery each()
   * addEventListener → jQuery on()
   */
  initTabs: function () {
    var self = this;
    var $tabs = $('.ui-tab__button');

    // jQuery each를 사용하여 각 탭에 이벤트 바인딩
    $tabs.each(function () {
      var $tab = $(this);

      // 이미 초기화된 탭은 건너뛰기 (data-tab-initialized 속성 확인)
      if ($tab.data('tab-initialized')) return;
      $tab.data('tab-initialized', 'true');

      // 클릭 이벤트 바인딩 (화살표 함수 → function)
      $tab.on('click', function (e) {
        self.activateTab($tab);
      });

      // 키보드 이벤트 바인딩 (접근성)
      $tab.on('keydown', function (e) {
        self.handleKeydown(e, $tab);
      });
    });

    // 탭 패널 접근성 속성 추가
    this.initTabPanels();
  },

  /**
   * 탭 활성화 함수
   * closest(), querySelectorAll → jQuery closest(), find()
   * classList → addClass(), removeClass()
   * setAttribute → attr()
   */
  activateTab: function ($tab) {
    var $tabContainer = $tab.closest('.ui-tab');
    var $allTabs = $tabContainer.find('.ui-tab__button');
    var targetId = $tab.attr('data-tab-target');

    // 모든 탭 비활성화 (forEach → jQuery each)
    $allTabs.each(function () {
      var $t = $(this);
      $t.removeClass('ui-tab__button--active');
      $t.attr('aria-selected', 'false');
      $t.attr('tabindex', '-1'); // 포커스 관리
    });

    // 선택된 탭 활성화
    $tab.addClass('ui-tab__button--active');
    $tab.attr('aria-selected', 'true');
    $tab.attr('tabindex', '0');
    $tab.focus(); // 포커스 이동

    // 탭 패널 제어
    var $allPanels = $('.ui-tab-panel');
    var $targetPanel = $('#panel-' + targetId);

    // 모든 패널 숨기기 (forEach → jQuery each)
    $allPanels.each(function () {
      var $panel = $(this);
      $panel.removeClass('ui-tab-panel--active');
      $panel.attr('aria-hidden', 'true');
    });

    // 선택된 패널 보이기
    if ($targetPanel.length > 0) {
      $targetPanel.addClass('ui-tab-panel--active');
      $targetPanel.attr('aria-hidden', 'false');
    }

    // 커스텀 이벤트 발생 (jQuery 방식으로 변경)
    // new CustomEvent → jQuery trigger 사용
    $tabContainer.trigger('tab-change', {
      tabId: targetId,
      tabElement: $tab[0], // DOM 요소 전달
      tabContainer: $tabContainer[0], // DOM 요소 전달
    });
  },

  /**
   * 키보드 내비게이션 처리
   * Array.from(), indexOf() → jQuery 방식으로 변경
   */
  handleKeydown: function (e, $currentTab) {
    var $tabContainer = $currentTab.closest('.ui-tab');
    var $allTabs = $tabContainer.find('.ui-tab__button');
    var currentIndex = $allTabs.index($currentTab); // jQuery index() 사용
    var $targetTab = null;

    // switch문은 ES5에서도 동일하게 사용 가능
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        // 이전 탭으로 이동 (첫 번째면 마지막으로)
        $targetTab = currentIndex > 0 ? $allTabs.eq(currentIndex - 1) : $allTabs.eq($allTabs.length - 1);
        break;

      case 'ArrowRight':
        e.preventDefault();
        // 다음 탭으로 이동 (마지막이면 첫 번째로)
        $targetTab = currentIndex < $allTabs.length - 1 ? $allTabs.eq(currentIndex + 1) : $allTabs.eq(0);
        break;

      case 'Home':
        e.preventDefault();
        // 첫 번째 탭으로 이동
        $targetTab = $allTabs.eq(0);
        break;

      case 'End':
        e.preventDefault();
        // 마지막 탭으로 이동
        $targetTab = $allTabs.eq($allTabs.length - 1);
        break;
    }

    // 대상 탭이 있으면 활성화
    if ($targetTab && $targetTab.length > 0) {
      this.activateTab($targetTab);
    }
  },

  /**
   * 탭 패널 접근성 속성 초기화
   * querySelectorAll → $('.ui-tab-panel')
   * getAttribute, getElementById → jQuery attr(), $('#')
   */
  initTabPanels: function () {
    var $panels = $('.ui-tab-panel');

    // forEach → jQuery each 사용
    $panels.each(function () {
      var $panel = $(this);
      var panelId = $panel.attr('id');

      // 'panel-' 접두사 제거하여 탭 ID 추출
      var tabId = panelId.replace('panel-', '');
      var $tabButton = $('#tab-' + tabId);

      // 해당 탭 버튼이 존재하면 접근성 속성 설정
      if ($tabButton.length > 0) {
        $panel.attr('role', 'tabpanel');
        $panel.attr('aria-labelledby', 'tab-' + tabId);
        $panel.attr('aria-hidden', 'true'); // 기본적으로 숨김
      }
    });
  },

  /**
   * 전체 초기화 함수
   * ES6 메서드 → ES5 function 속성
   */
  init: function () {
    this.initTabs();
  },
};

/**
 * DOM 로드 완료 후 실행
 * DOMContentLoaded → jQuery $(document).ready()
 */
$(document).ready(function () {
  LibraryTab.init();
});

/**
 * 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
 * window.addEventListener → jQuery $(window).on()
 * setTimeout의 화살표 함수 → function
 */
$(window).on('load', function () {
  setTimeout(function () {
    LibraryTab.init();
  }, 100);
});
