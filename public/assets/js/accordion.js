/**
 * 연수구 도서관 아코디언 컴포넌트
 * - UiAccordion: 일반 아코디언
 * - UiCollectionAccordion: 소장정보 아코디언 (탭 포함)
 */

const LibraryAccordion = {
  // 일반 아코디언 초기화
  initStandardAccordion() {
    const accordions = document.querySelectorAll('[data-accordion-id]');

    accordions.forEach(accordion => {
      const accordionId = accordion.dataset.accordionId;
      const trigger = accordion.querySelector('.ui-accordion__trigger');
      const content = accordion.querySelector('.ui-accordion__content');
      const icon = accordion.querySelector('.ui-accordion__icon');

      if (!trigger || !content) return;

      // 이미 초기화된 경우 스킵
      if (trigger.dataset.accordionInitialized) return;
      trigger.dataset.accordionInitialized = 'true';

      // 초기 상태 설정
      const initialExpanded = content.dataset.expanded === 'true';
      if (initialExpanded) {
        content.style.maxHeight = 'max-content';
        if (icon) icon.classList.add('ui-accordion__icon--expanded');
      } else {
        content.style.maxHeight = 'max-content';
      }

      // 토글 함수
      function toggleAccordion() {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const newExpanded = !isExpanded;

        // 현재 아코디언 상태 변경
        trigger.setAttribute('aria-expanded', newExpanded.toString());
        content.dataset.expanded = newExpanded.toString();

        // 아이콘 회전 애니메이션
        if (icon) {
          if (newExpanded) {
            icon.classList.add('ui-accordion__icon--expanded');
          } else {
            icon.classList.remove('ui-accordion__icon--expanded');
          }
        }

        // 콘텐츠 높이 애니메이션
        if (newExpanded) {
          content.style.maxHeight = 'max-content';
        } else {
          content.style.maxHeight = '0';
        }

        // 커스텀 이벤트 발생
        const event = new CustomEvent('accordion-toggle', {
          detail: {
            accordionId,
            isExpanded: newExpanded,
            trigger,
            content,
          },
          bubbles: true,
        });
        accordion.dispatchEvent(event);
      }

      // 이벤트 리스너 등록
      trigger.addEventListener('click', toggleAccordion);

      // 키보드 접근성
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleAccordion();
        }
      });
    });

    console.log('✅ Standard Accordion initialized');
  },

  // 소장정보 아코디언 초기화
  initCollectionAccordion() {
    const accordions = document.querySelectorAll('.ui-collection-accordion');

    accordions.forEach(accordion => {
      const trigger = accordion.querySelector(
        '.ui-collection-accordion__trigger'
      );
      const content = accordion.querySelector(
        '.ui-collection-accordion__content'
      );
      const tabsContainer = accordion.querySelector('.ui-tabs');

      if (!trigger || !content) return;

      // 이미 초기화된 경우 스킵
      if (trigger.dataset.accordionInitialized) return;
      trigger.dataset.accordionInitialized = 'true';

      const iconType =
        trigger.closest('[data-icon-type]')?.dataset.iconType || 'arrow';

      // 아이콘 타입에 따른 클릭 동작 구분
      trigger.addEventListener('click', function (e) {
        e.preventDefault();

        if (iconType === 'close') {
          // X 아이콘인 경우: 전체 아코디언을 완전히 숨김
          accordion.style.display = 'none';

          // 만약 특정 래퍼가 있다면 그것도 숨김
          const wrapper = accordion.closest(
            '.ui-book-card__collection-wrapper'
          );
          if (wrapper) {
            wrapper.style.display = 'none';
          }
        } else {
          // 화살표 아이콘인 경우: 아코디언 토글 동작
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          const newExpanded = !isExpanded;

          trigger.setAttribute('aria-expanded', newExpanded.toString());
          content.setAttribute('data-expanded', newExpanded.toString());

          if (newExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            content.style.maxHeight = '0';
          }
        }
      });

      // 초기 상태 설정
      if (content.getAttribute('data-expanded') === 'true') {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = 'max-content';
      }

      // 탭 변경 이벤트 처리
      if (tabsContainer) {
        tabsContainer.addEventListener('tabchange', function (event) {
          const selectedLibrary = event.detail.activeTab;
          console.log('Selected library:', selectedLibrary);
          // TODO: 실제로는 선택된 도서관에 따라 테이블 데이터 필터링
        });
      }
    });

    console.log('✅ Collection Accordion initialized');
  },

  // 전체 초기화
  init() {
    this.initStandardAccordion();
    this.initCollectionAccordion();
  },
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryAccordion.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryAccordion.init();
  }, 200);
});
