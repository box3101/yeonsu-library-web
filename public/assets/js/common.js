// 공통 기능 관리자
const LibraryCommon = {
  // 기능별 초기화 맵
  features: {
    accordion: {
      selector: '[data-menu-toggle]',
      init: function () {
        const toggles = document.querySelectorAll(this.selector);
        if (toggles.length === 0) return false;

        toggles.forEach(toggle => {
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

        console.log('✅ Accordion initialized');
        return true;
      },
    },
  },

  // 전체 초기화
  init() {
    console.log('🚀 LibraryCommon initializing...');

    Object.entries(this.features).forEach(([name, feature]) => {
      try {
        const result = feature.init.call(feature);
        if (!result) {
          console.log(`⚠️ ${name} skipped - no elements found`);
        }
      } catch (error) {
        console.error(`❌ ${name} initialization failed:`, error);
      }
    });

    console.log('✨ LibraryCommon ready!');
  },
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function () {
  LibraryCommon.init();
});
