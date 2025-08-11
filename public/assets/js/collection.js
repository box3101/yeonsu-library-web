/**
 * 연수구 도서관 소장정보 관리
 * - UiBookCard의 소장정보 토글 기능
 */

const LibraryCollection = {
  // 책 카드 소장정보 토글 기능 초기화
  initBookCardCollection() {
    const buttons = document.querySelectorAll('.collection-toggle-button');

    buttons.forEach((button, index) => {
      // 이미 이벤트가 등록되었는지 확인
      if (button.dataset.eventRegistered) return;

      button.dataset.eventRegistered = 'true';

      button.addEventListener('click', function (e) {
        e.preventDefault();

        // 해당 버튼이 속한 북카드의 소장정보 래퍼 찾기
        const bookCard = this.closest('.ui-book-card');
        if (!bookCard) {
          console.error('Book card not found');
          return;
        }

        const wrapper = bookCard.querySelector('.ui-book-card__collection-wrapper');
        if (!wrapper) {
          console.error('Collection wrapper not found');
          return;
        }

        // 소장정보 표시 (항상 펼쳐진 상태로)
        wrapper.style.display = 'block';

        // 아코디언을 펼친 상태로 강제 설정
        setTimeout(() => {
          const accordion = wrapper.querySelector('.book-card-accordion');
          if (accordion) {
            // 아코디언 전체를 다시 표시 (X 버튼으로 숨겨졌을 수 있음)
            accordion.style.display = 'block';

            const trigger = accordion.querySelector('.ui-collection-accordion__trigger');
            const content = accordion.querySelector('.ui-collection-accordion__content');

            if (trigger && content) {
              // 아코디언 상태를 완전히 리셋하고 펼친 상태로 설정
              trigger.setAttribute('aria-expanded', 'true');
              content.setAttribute('data-expanded', 'true');

              // maxHeight를 일시적으로 제거하여 정확한 scrollHeight를 계산
              content.style.maxHeight = 'none';
              const scrollHeight = content.scrollHeight;
              content.style.maxHeight = scrollHeight + 'px';
            }
          }
        }, 100);
      });
    });

    if (buttons.length > 0) {
      console.log('✅ Book Card Collection initialized');
    }
  },

  // 전체 초기화
  init() {
    this.initBookCardCollection();
  }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryCollection.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryCollection.init();
  }, 500);
});
