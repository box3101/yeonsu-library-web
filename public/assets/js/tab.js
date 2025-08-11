/**
 * 연수구 도서관 탭 컴포넌트
 * - UiTab: 탭 메뉴 기능
 */

const LibraryTab = {
  // 탭 기능 초기화
  initTabs() {
    const tabs = document.querySelectorAll('.ui-tab__button');

    tabs.forEach(tab => {
      // 이미 초기화된 경우 스킵
      if (tab.dataset.tabInitialized) return;
      tab.dataset.tabInitialized = 'true';

      tab.addEventListener('click', () => {
        const tabContainer = tab.closest('.ui-tab');
        const allTabs = tabContainer?.querySelectorAll('.ui-tab__button');
        const targetId = tab.getAttribute('data-tab-target');

        // 모든 탭에서 active 제거
        allTabs?.forEach(t => {
          t.classList.remove('ui-tab__button--active');
          t.setAttribute('aria-selected', 'false');
        });

        // 클릭한 탭에 active 추가
        tab.classList.add('ui-tab__button--active');
        tab.setAttribute('aria-selected', 'true');

        // 탭 패널 제어
        const allPanels = document.querySelectorAll('.ui-tab-panel');
        const targetPanel = document.getElementById(`panel-${targetId}`);

        // 모든 패널 숨기기
        allPanels.forEach(panel => {
          panel.classList.remove('ui-tab-panel--active');
        });

        // 선택된 패널 보이기
        if (targetPanel) {
          targetPanel.classList.add('ui-tab-panel--active');
        }

        // UiTab 컴포넌트용 커스텀 이벤트 발생
        const customEvent = new CustomEvent('tab-change', {
          detail: {
            tabId: targetId,
            tabElement: tab,
            tabContainer: tabContainer,
          },
          bubbles: true,
        });
        tabContainer.dispatchEvent(customEvent);

        // 기존 호환성을 위한 이벤트도 발생
        document.dispatchEvent(
          new CustomEvent('tab-change', {
            detail: { targetId, tab },
          })
        );
      });
    });

    if (tabs.length > 0) {
      console.log('✅ Tab Component initialized');
    }
  },

  // 전체 초기화
  init() {
    this.initTabs();
  }
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