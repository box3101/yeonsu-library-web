/**
 * 연수구 도서관 모달 컴포넌트
 * - UiCollectionModal: 소장정보 모달
 */

const LibraryModal = {
  // 소장정보 모달 초기화
  initCollectionModal() {
    const modal = document.querySelector('[data-modal="collection"]');
    if (!modal) return;

    // 이미 초기화된 경우 스킵
    if (modal.dataset.modalInitialized) return;
    modal.dataset.modalInitialized = 'true';

    const openTriggers = document.querySelectorAll('[data-modal-open="collection"]');
    const closeTriggers = modal.querySelectorAll('[data-modal-close]');
    const tabButtons = modal.querySelectorAll('.tab-button');

    // 모달 열기
    openTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.classList.add('modal-open');

        // 첫 번째 탭을 활성화
        this.activateFirstTab(tabButtons);
      });
    });

    // 모달 닫기
    closeTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
      });
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
      }
    });

    // 탭 버튼 기능
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 모든 탭 비활성화
        tabButtons.forEach(tab => {
          tab.classList.remove('is-active');
          tab.setAttribute('aria-selected', 'false');
        });

        // 클릭된 탭 활성화
        button.classList.add('is-active');
        button.setAttribute('aria-selected', 'true');

        // 탭에 따른 콘텐츠 필터링 (여기서는 로그만)
        const selectedTab = button.dataset.tab;
        console.log('Selected library tab:', selectedTab);

        // TODO: 실제로는 선택된 도서관에 따라 테이블 데이터 필터링
        // this.filterCollectionsByLibrary(selectedTab);
      });
    });

    console.log('✅ Collection Modal initialized');
  },

  // 첫 번째 탭 활성화
  activateFirstTab(tabButtons) {
    if (tabButtons.length > 0) {
      tabButtons.forEach(tab => {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-selected', 'false');
      });

      tabButtons[0].classList.add('is-active');
      tabButtons[0].setAttribute('aria-selected', 'true');
    }
  },

  // 전체 초기화
  init() {
    this.initCollectionModal();
  }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryModal.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryModal.init();
  }, 100);
});
