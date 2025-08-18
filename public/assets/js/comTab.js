/**
 *  탭 컴포넌트
 */
const LibraryTab = {
  initTabs() {
    const tabs = document.querySelectorAll('.ui-tab__button');

    tabs.forEach(tab => {
      if (tab.dataset.tabInitialized) return;
      tab.dataset.tabInitialized = 'true';

      // 클릭 이벤트
      tab.addEventListener('click', e => {
        this.activateTab(tab);
      });

      // 키보드 이벤트 추가
      tab.addEventListener('keydown', e => {
        this.handleKeydown(e, tab);
      });
    });

    // 탭 패널 접근성 속성 추가
    this.initTabPanels();
  },

  // 탭 활성화 함수
  activateTab(tab) {
    const tabContainer = tab.closest('.ui-tab');
    const allTabs = tabContainer?.querySelectorAll('.ui-tab__button');
    const targetId = tab.getAttribute('data-tab-target');

    // 모든 탭 비활성화
    allTabs?.forEach(t => {
      t.classList.remove('ui-tab__button--active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1'); // 포커스 관리
    });

    // 선택된 탭 활성화
    tab.classList.add('ui-tab__button--active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.focus(); // 포커스 이동

    // 탭 패널 제어
    const allPanels = document.querySelectorAll('.ui-tab-panel');
    const targetPanel = document.getElementById(`panel-${targetId}`);

    // 모든 패널 숨기기
    allPanels.forEach(panel => {
      panel.classList.remove('ui-tab-panel--active');
      panel.setAttribute('aria-hidden', 'true');
    });

    // 선택된 패널 보이기
    if (targetPanel) {
      targetPanel.classList.add('ui-tab-panel--active');
      targetPanel.setAttribute('aria-hidden', 'false');
    }

    // 커스텀 이벤트 발생 (기존 코드 유지)
    const customEvent = new CustomEvent('tab-change', {
      detail: { tabId: targetId, tabElement: tab, tabContainer },
      bubbles: true,
    });
    tabContainer.dispatchEvent(customEvent);
  },

  // 키보드 내비게이션 처리
  handleKeydown(e, currentTab) {
    const tabContainer = currentTab.closest('.ui-tab');
    const allTabs = Array.from(tabContainer?.querySelectorAll('.ui-tab__button') || []);
    const currentIndex = allTabs.indexOf(currentTab);

    let targetTab = null;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        targetTab = allTabs[currentIndex - 1] || allTabs[allTabs.length - 1];
        break;

      case 'ArrowRight':
        e.preventDefault();
        targetTab = allTabs[currentIndex + 1] || allTabs[0];
        break;

      case 'Home':
        e.preventDefault();
        targetTab = allTabs[0];
        break;

      case 'End':
        e.preventDefault();
        targetTab = allTabs[allTabs.length - 1];
        break;
    }

    if (targetTab) {
      this.activateTab(targetTab);
    }
  },

  // 탭 패널 접근성 속성 초기화
  initTabPanels() {
    const panels = document.querySelectorAll('.ui-tab-panel');

    panels.forEach(panel => {
      const tabId = panel.getAttribute('id').replace('panel-', '');
      const tabButton = document.getElementById(`tab-${tabId}`);

      if (tabButton) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${tabId}`);
        panel.setAttribute('aria-hidden', 'true'); // 기본적으로 숨김
      }
    });
  },

  // 전체 초기화
  init() {
    this.initTabs();
  },
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryTab.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryTab.init();
  }, 100);
});
