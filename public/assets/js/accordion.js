/**
 * 연수구 도서관 아코디언 컴포넌트
 */

const LibraryAccordion = {
  // 일반 아코디언 초기화
  initStandardAccordion() {
    const accordions = document.querySelectorAll(
      '[data-accordion-id]:not(.ui-collection-accordion)'
    );

    accordions.forEach(accordion => {
      const trigger = accordion.querySelector('.ui-accordion__trigger');
      const content = accordion.querySelector('.ui-accordion__content');

      if (!trigger || !content || trigger.dataset.accordionInitialized) return;
      trigger.dataset.accordionInitialized = 'true';

      trigger.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const newExpanded = !isExpanded;

        this.setAttribute('aria-expanded', newExpanded.toString());
        content.dataset.expanded = newExpanded.toString();
      });
    });
  },

  // 소장정보 아코디언 초기화
  initCollectionAccordion() {
    const accordions = document.querySelectorAll('.ui-collection-accordion');

    accordions.forEach(accordion => {
      if (accordion.dataset.accordionInitialized) return;
      accordion.dataset.accordionInitialized = 'true';

      const trigger = accordion.querySelector(
        '.ui-collection-accordion__trigger'
      );
      const content = accordion.querySelector(
        '.ui-collection-accordion__content'
      );
      const closeBtn = accordion.querySelector(
        '.ui-collection-accordion__close-btn'
      );
      const iconType = accordion.dataset.iconType || 'arrow';

      if (!trigger || !content) return;

      if (iconType === 'close' && closeBtn) {
        // X 버튼 클릭시 닫기
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          accordion.style.display = 'none';

          const wrapper = accordion.closest(
            '.ui-book-card__collection-wrapper'
          );
          if (wrapper) wrapper.style.display = 'none';
        });
      } else if (trigger.tagName === 'BUTTON') {
        // 아코디언 토글
        trigger.addEventListener('click', function () {
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          const newExpanded = !isExpanded;

          this.setAttribute('aria-expanded', newExpanded.toString());
          content.setAttribute('data-expanded', newExpanded.toString());
        });
      }
    });
  },

  init() {
    this.initStandardAccordion();
    this.initCollectionAccordion();
  },
};

// 초기화
document.addEventListener('DOMContentLoaded', () => LibraryAccordion.init());
