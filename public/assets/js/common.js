// 공통 기능 관리자
const LibraryCommon = {
  // 기능별 초기화 맵
  features: {
    accordion: {
      selector: '[data-menu-toggle]',
      init: function () {
        const toggles = document.querySelectorAll(this.selector);
        if (toggles.length === 0) return false;

        toggles.forEach((toggle) => {
          toggle.addEventListener('click', function () {
            const index = this.getAttribute('data-menu-toggle');
            const content = document.querySelector(`[data-menu-content="${index}"]`);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            if (!content || !index) return;

            this.setAttribute('aria-expanded', (!isExpanded).toString());
            this.classList.toggle('expanded');
            content.classList.toggle('expanded');
          });
        });

        console.log('✅ Accordion initialized');
        return true;
      }
    },

    // 향후 추가될 기능들
    tabs: {
      selector: '[data-tab-trigger]',
      init: function () {
        const triggers = document.querySelectorAll(this.selector);
        if (triggers.length === 0) return false;

        // 탭 로직
        console.log('✅ Tabs initialized');
        return true;
      }
    },

    modal: {
      selector: '[data-modal-trigger]',
      init: function () {
        const triggers = document.querySelectorAll(this.selector);
        if (triggers.length === 0) return false;

        // 모달 로직
        console.log('✅ Modal initialized');
        return true;
      }
    }
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
  }
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function () {
  LibraryCommon.init();
});