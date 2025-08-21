// 검색 탭 기능 초기화 (헤더의 검색 탭과 책큐 슬라이더 제어) - ES5 + jQuery 버전
function SearchTabs() {
  this.init();
}

SearchTabs.prototype.init = function () {
  this.bindEvents();
};

SearchTabs.prototype.bindEvents = function () {
  var self = this;

  // 탭 클릭 이벤트 (이벤트 위임 사용)
  $(document).on('click', '.search-tabs__tab', function (e) {
    self.handleTabClick($(this));
  });

  // 키보드 접근성
  $(document).on('keydown', '.search-tabs__tab', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      self.handleTabClick($(this));
    }
  });
};

SearchTabs.prototype.handleTabClick = function ($clickedTab) {
  var $tabContainer = $clickedTab.closest('.search-tabs');
  if ($tabContainer.length === 0) return;

  var $allTabs = $tabContainer.find('.search-tabs__tab');
  var tabId = $clickedTab.data('tab');

  // 모든 탭에서 active 클래스 제거
  $allTabs.each(function () {
    var $tab = $(this);
    $tab.removeClass('search-tabs__tab--active');
    $tab.attr('aria-selected', 'false');
  });

  // 클릭된 탭에 active 클래스 추가
  $clickedTab.addClass('search-tabs__tab--active');
  $clickedTab.attr('aria-selected', 'true');

  // 탭 변경 이벤트 발생
  this.onTabChange(tabId);
};

SearchTabs.prototype.onTabChange = function (tabId) {
  // 검색창 플레이스홀더 변경
  var $searchInput = $('.search-input__field');
  if ($searchInput.length > 0) {
    var placeholder = '';
    switch (tabId) {
      case 'book-search':
        placeholder = '찾고 싶은 도서의 내용을 입력하세요.';
        break;
      case 'ai-book':
        placeholder = 'AI 책큐에게 질문해보세요.';
        break;
      default:
        placeholder = '찾고 싶은 도서의 내용을 입력하세요.';
        break;
    }
    $searchInput.attr('placeholder', placeholder);
  }

  // 책큐 탭일 때 책큐 슬라이더 표시
  var $bookRecommendationSlider = $('#bookRecommendationSlider');
  if ($bookRecommendationSlider.length > 0) {
    if (tabId === 'ai-book') {
      $bookRecommendationSlider.show();
    } else {
      $bookRecommendationSlider.hide();
    }
  }

  // 커스텀 이벤트 발생 (다른 컴포넌트에서 사용 가능)
  // jQuery 커스텀 이벤트 사용
  $(document).trigger('searchTabChanged', { tabId: tabId });

  console.log('탭 변경됨: ' + tabId);
};

SearchTabs.prototype.setActiveTab = function (tabId) {
  var $tab = $('[data-tab="' + tabId + '"]');
  if ($tab.length > 0) {
    this.handleTabClick($tab);
  }
};

// 현재 활성 탭 가져오기
SearchTabs.prototype.getActiveTab = function () {
  var $activeTab = $('.search-tabs__tab--active');
  return $activeTab.length > 0 ? $activeTab.data('tab') : null;
};

// DOM이 로드되면 검색 탭 초기화 (jQuery ready 사용)
$(document).ready(function () {
  window.searchTabs = new SearchTabs();
});
