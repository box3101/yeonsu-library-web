/**
 * 단순화된 탭 컴포넌트 - ES5 + jQuery
 */
$(document).ready(function () {
  // 탭 초기화
  function initTabs() {
    $('.ui-tab__button').each(function () {
      var $tab = $(this);

      // 이미 초기화된 탭은 건너뛰기
      if ($tab.data('tab-initialized')) return;
      $tab.data('tab-initialized', true);

      // 클릭 이벤트
      $tab.on('click', function () {
        activateTab($(this));
      });

      // 키보드 접근성
      $tab.on('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateTab($(this));
        }

        // 화살표 키 내비게이션
        var $tabs = $(this).closest('.ui-tab').find('.ui-tab__button');
        var currentIndex = $tabs.index(this);
        var $targetTab = null;

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          $targetTab = currentIndex > 0 ? $tabs.eq(currentIndex - 1) : $tabs.last();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          $targetTab = currentIndex < $tabs.length - 1 ? $tabs.eq(currentIndex + 1) : $tabs.first();
        }

        if ($targetTab) {
          activateTab($targetTab);
        }
      });
    });
  }

  // 탭 활성화 함수
  function activateTab($clickedTab) {
    var $tabContainer = $clickedTab.closest('.ui-tab');
    var $allTabs = $tabContainer.find('.ui-tab__button');
    var targetId = $clickedTab.data('tab-target');

    // 모든 탭 비활성화
    $allTabs.each(function () {
      var $tab = $(this);
      $tab.removeClass('ui-tab__button--active');
      $tab.attr('aria-selected', 'false');
      $tab.attr('tabindex', '-1');
    });

    // 선택된 탭 활성화
    $clickedTab.addClass('ui-tab__button--active');
    $clickedTab.attr('aria-selected', 'true');
    $clickedTab.attr('tabindex', '0');
    $clickedTab.focus();

    // 탭 패널 제어
    $('.ui-tab-panel').each(function () {
      var $panel = $(this);
      $panel.removeClass('ui-tab-panel--active');
      $panel.attr('aria-hidden', 'true');
    });

    // 선택된 패널 보이기
    var $targetPanel = $('#panel-' + targetId);
    if ($targetPanel.length > 0) {
      $targetPanel.addClass('ui-tab-panel--active');
      $targetPanel.attr('aria-hidden', 'false');
    }

    // 커스텀 이벤트 발생
    $tabContainer.trigger('tab-change', {
      tabId: targetId,
      tabElement: $clickedTab[0],
    });
  }

  // 탭 패널 접근성 속성 초기화
  function initTabPanels() {
    $('.ui-tab-panel').each(function () {
      var $panel = $(this);
      var panelId = $panel.attr('id');

      if (panelId && panelId.indexOf('panel-') === 0) {
        var tabId = panelId.replace('panel-', '');
        var $tabButton = $('#tab-' + tabId);

        if ($tabButton.length > 0) {
          $panel.attr('role', 'tabpanel');
          $panel.attr('aria-labelledby', 'tab-' + tabId);
          $panel.attr('aria-hidden', 'true');
        }
      }
    });
  }

  // 프로그래매틱 탭 활성화 함수 (외부에서 호출 가능)
  window.setActiveTab = function (tabId) {
    var $tab = $('[data-tab-target="' + tabId + '"]');
    if ($tab.length > 0) {
      activateTab($tab);
    }
  };

  // 현재 활성 탭 가져오기 (외부에서 호출 가능)
  window.getActiveTab = function () {
    var $activeTab = $('.ui-tab__button--active');
    return $activeTab.length > 0 ? $activeTab.data('tab-target') : null;
  };

  // 초기화 실행
  initTabs();
  initTabPanels();

  // 페이지 로드 후 재초기화 (동적 콘텐츠 대응)
  setTimeout(function () {
    initTabs();
    initTabPanels();
  }, 100);
});
