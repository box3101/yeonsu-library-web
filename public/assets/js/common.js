/**
 * 연수구 도서관 공통 기능 관리자
 * - 전역 초기화 및 관리
 * - 기존 아코디언 메뉴 기능 유지
 * - 새로운 UI 컴포넌트들과 연동
 */

const LibraryCommon = {
  // 기능별 초기화 맵
  features: {
    // 기존 레프트 메뉴 아코디언 (GNB용)
    menuAccordion: {
      selector: '[data-menu-toggle]',
      init: function () {
        const toggles = document.querySelectorAll(this.selector);
        if (toggles.length === 0) return false;

        toggles.forEach(toggle => {
          // 이미 초기화된 경우 스킵
          if (toggle.dataset.menuAccordionInitialized) return;
          toggle.dataset.menuAccordionInitialized = 'true';

          toggle.addEventListener('click', function () {
            const index = this.getAttribute('data-menu-toggle');
            const content = document.querySelector(
              `[data-menu-content="${index}"]`
            );
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // 현재 메뉴의 컨테이너 찾기
            const container = this.closest('.left-menu-nav, .menu-container');

            if (!content || !index) return;

            // exclusive 동작: 같은 컨테이너 내의 다른 모든 메뉴 닫기
            if (container) {
              const otherToggles =
                container.querySelectorAll('[data-menu-toggle]');
              const otherContents = container.querySelectorAll(
                '[data-menu-content]'
              );

              otherToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                  otherToggle.setAttribute('aria-expanded', 'false');
                  otherToggle.classList.remove('expanded');
                }
              });

              otherContents.forEach(otherContent => {
                if (otherContent !== content) {
                  otherContent.classList.remove('expanded');
                }
              });
            }

            // 현재 클릭한 메뉴는 토글
            this.setAttribute('aria-expanded', (!isExpanded).toString());
            this.classList.toggle('expanded');
            content.classList.toggle('expanded');
          });
        });

        console.log('✅ Menu Accordion initialized');
        return true;
      },
    },
  },

  // 전체 초기화
  init() {
    console.log('🚀 LibraryCommon initializing...');

    // 기존 메뉴 아코디언 초기화
    this.features.menuAccordion.init();

    // 외부 컴포넌트들이 로드되었는지 확인하고 초기화
    this.initExternalComponents();
  },

  // 외부 컴포넌트 초기화 (선택적)
  initExternalComponents() {
    // 각 컴포넌트가 로드되었는지 확인하고 초기화
    const components = [
      'LibraryAccordion',
      'LibraryTab',
      'LibrarySwiper',
      'LibraryCollection',
      'LibraryFilter',
      'LibraryModal',
      'LibraryKeyboard'
    ];

    components.forEach(componentName => {
      if (window[componentName] && typeof window[componentName].init === 'function') {
        try {
          window[componentName].init();
          console.log(`✅ ${componentName} re-initialized from common`);
        } catch (error) {
          console.warn(`⚠️ ${componentName} initialization failed:`, error);
        }
      }
    });
  },

  // 동적 콘텐츠 로드 후 재초기화 함수
  reinitialize() {
    console.log('🔄 LibraryCommon reinitializing...');
    this.init();
  }
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function () {
  LibraryCommon.init();
});

// 전역으로 노출 (동적 콘텐츠 대응)
window.LibraryCommon = LibraryCommon;
