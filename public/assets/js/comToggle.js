(function () {
  'use strict';

  // LibraryCommon이 로드되었을 때 기능 등록
  if (window.LibraryCommon) {
    window.LibraryCommon.features.toggle = {
      selector: '[data-toggle]',
      init: initToggle,
    };
  }

  function initToggle() {
    const toggles = document.querySelectorAll('[data-toggle]');

    toggles.forEach(toggle => {
      // 이미 초기화된 경우 스킵
      if (toggle.dataset.toggleInitialized) return;
      toggle.dataset.toggleInitialized = 'true';

      const targetId = toggle.dataset.toggle;
      const target = document.querySelector(`[data-toggle-target="${targetId}"]`);

      if (!target) return;

      toggle.addEventListener('click', function () {
        const isActive = this.classList.contains('is-active');

        // 토글 상태 변경
        this.classList.toggle('is-active');
        target.classList.toggle('is-active');

        // aria 속성 업데이트
        this.setAttribute('aria-expanded', !isActive);
        target.setAttribute('aria-hidden', isActive);
      });
    });
  }

  // 수동 호출 가능하도록 전역 함수로도 등록
  window.initToggle = initToggle;
})();
