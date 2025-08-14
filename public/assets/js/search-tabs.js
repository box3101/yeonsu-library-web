class SearchTabs {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 탭 클릭 이벤트
    document.addEventListener('click', e => {
      const tab = e.target.closest('.search-tabs__tab');
      if (tab) {
        this.handleTabClick(tab);
      }
    });

    // 키보드 접근성
    document.addEventListener('keydown', e => {
      const tab = e.target.closest('.search-tabs__tab');
      if (tab && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.handleTabClick(tab);
      }
    });
  }

  handleTabClick(clickedTab) {
    const tabContainer = clickedTab.closest('.search-tabs');
    if (!tabContainer) return;

    const allTabs = tabContainer.querySelectorAll('.search-tabs__tab');
    const tabId = clickedTab.dataset.tab;

    // 모든 탭에서 active 클래스 제거
    allTabs.forEach(tab => {
      tab.classList.remove('search-tabs__tab--active');
      tab.setAttribute('aria-selected', 'false');
    });

    // 클릭된 탭에 active 클래스 추가
    clickedTab.classList.add('search-tabs__tab--active');
    clickedTab.setAttribute('aria-selected', 'true');

    // 탭 변경 이벤트 발생
    this.onTabChange(tabId);
  }

  onTabChange(tabId) {
    // 검색창 플레이스홀더 변경
    const searchInput = document.querySelector('.search-input__field');
    if (searchInput) {
      switch (tabId) {
        case 'book-search':
          searchInput.placeholder = '찾고 싶은 도서의 내용을 입력하세요.';
          break;
        case 'ai-book':
          searchInput.placeholder = 'AI 책큐에게 질문해보세요.';
          break;
        default:
          searchInput.placeholder = '찾고 싶은 도서의 내용을 입력하세요.';
      }
    }

    // 커스텀 이벤트 발생 (다른 컴포넌트에서 사용 가능)
    const event = new CustomEvent('searchTabChanged', {
      detail: { tabId },
    });
    document.dispatchEvent(event);

    console.log(`탭 변경됨: ${tabId}`);
  }

  // 프로그래밍 방식으로 탭 변경
  setActiveTab(tabId) {
    const tab = document.querySelector(`[data-tab="${tabId}"]`);
    if (tab) {
      this.handleTabClick(tab);
    }
  }

  // 현재 활성 탭 가져오기
  getActiveTab() {
    const activeTab = document.querySelector('.search-tabs__tab--active');
    return activeTab ? activeTab.dataset.tab : null;
  }
}

// DOM이 로드되면 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.searchTabs = new SearchTabs();
});
