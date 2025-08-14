/**
 * 연수구 도서관 모바일 메뉴 관리자
 * - 1, 2, 3depth 아코디언 메뉴 지원
 * - 슬라이드 인/아웃 애니메이션
 * - 접근성 지원 (ARIA 속성)
 * - 터치 제스처 지원
 */

const LibraryMobileMenu = {
  // 설정
  config: {
    triggerSelector: '#mobileMenuTrigger',
    menuSelector: '#mobileMenu',
    overlaySelector: '#mobileMenuOverlay',
    closeSelector: '#mobileMenuClose',
    toggleSelector: '[data-menu-toggle]',
    contentSelector: '[data-menu-content]',
    activeClass: 'active',
    expandedClass: 'expanded',
    bodyLockClass: 'mobile-menu-open',
  },

  // DOM 요소들
  elements: {
    trigger: null,
    menu: null,
    overlay: null,
    close: null,
    body: null,
  },

  // 상태 관리
  state: {
    isOpen: false,
    expandedMenus: new Set(),
    touchStartX: 0,
    touchStartY: 0,
  },

  // 초기화
  init() {
    this.cacheElements();
    if (!this.elements.trigger || !this.elements.menu) {
      console.warn('⚠️ Mobile menu elements not found');
      return false;
    }

    this.bindEvents();
    this.initializeMenuState();
    console.log('✅ Mobile Menu initialized');
    return true;
  },

  // DOM 요소 캐싱
  cacheElements() {
    this.elements.trigger = document.querySelector(this.config.triggerSelector);
    this.elements.menu = document.querySelector(this.config.menuSelector);
    this.elements.overlay = document.querySelector(this.config.overlaySelector);
    this.elements.close = document.querySelector(this.config.closeSelector);
    this.elements.body = document.body;
  },

  // 이벤트 바인딩
  bindEvents() {
    // 메뉴 토글 버튼
    if (this.elements.trigger) {
      this.elements.trigger.addEventListener('click', () => this.toggle());
    }

    // 메뉴 닫기 버튼
    if (this.elements.close) {
      this.elements.close.addEventListener('click', () => this.close());
    }

    // 오버레이 클릭으로 닫기
    if (this.elements.overlay) {
      this.elements.overlay.addEventListener('click', () => this.close());
    }

    // 아코디언 토글 버튼들
    this.bindAccordionEvents();

    // 키보드 이벤트
    document.addEventListener('keydown', e => this.handleKeyDown(e));

    // 터치 제스처 (스와이프로 닫기)
    this.bindTouchEvents();

    // 윈도우 리사이즈 시 처리
    window.addEventListener('resize', () => this.handleResize());
  },

  // 아코디언 이벤트 바인딩
  bindAccordionEvents() {
    const toggles = document.querySelectorAll(this.config.toggleSelector);

    toggles.forEach(toggle => {
      // 이미 초기화된 경우 스킵
      if (toggle.dataset.mobileMenuInitialized) return;
      toggle.dataset.mobileMenuInitialized = 'true';

      toggle.addEventListener('click', e => {
        e.preventDefault();
        this.toggleAccordion(toggle);
      });
    });
  },

  // 아코디언 토글
  toggleAccordion(toggle) {
    const menuId = toggle.getAttribute('data-menu-toggle');
    const content = document.querySelector(`[data-menu-content="${menuId}"]`);
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    if (!content || !menuId) return;

    // 현재 메뉴 토글
    const newExpandedState = !isExpanded;
    this.setAccordionState(toggle, content, newExpandedState);

    // 상태 추적
    if (newExpandedState) {
      this.state.expandedMenus.add(menuId);
    } else {
      this.state.expandedMenus.delete(menuId);
      // 하위 메뉴들도 닫기
      this.closeChildMenus(content);
    }
  },

  // 아코디언 상태 설정
  setAccordionState(toggle, content, isExpanded) {
    toggle.setAttribute('aria-expanded', isExpanded.toString());

    if (isExpanded) {
      toggle.classList.add(this.config.expandedClass);
      content.classList.add(this.config.expandedClass);
    } else {
      toggle.classList.remove(this.config.expandedClass);
      content.classList.remove(this.config.expandedClass);
    }
  },

  // 하위 메뉴들 닫기
  closeChildMenus(parentContent) {
    const childToggles = parentContent.querySelectorAll(
      this.config.toggleSelector
    );
    const childContents = parentContent.querySelectorAll(
      this.config.contentSelector
    );

    childToggles.forEach(toggle => {
      const menuId = toggle.getAttribute('data-menu-toggle');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove(this.config.expandedClass);
      this.state.expandedMenus.delete(menuId);
    });

    childContents.forEach(content => {
      content.classList.remove(this.config.expandedClass);
    });
  },

  // 메뉴 초기 상태 설정
  initializeMenuState() {
    const toggles = document.querySelectorAll(this.config.toggleSelector);
    const contents = document.querySelectorAll(this.config.contentSelector);

    // 모든 메뉴 닫힌 상태로 초기화
    toggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove(this.config.expandedClass);
    });

    contents.forEach(content => {
      content.classList.remove(this.config.expandedClass);
    });

    this.state.expandedMenus.clear();
  },

  // 메뉴 열기/닫기 토글
  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  // 메뉴 열기
  open() {
    if (this.state.isOpen) return;

    this.state.isOpen = true;

    // 클래스 추가
    this.elements.trigger?.classList.add(this.config.activeClass);
    this.elements.menu?.classList.add(this.config.activeClass);
    this.elements.overlay?.classList.add(this.config.activeClass);
    this.elements.body?.classList.add(this.config.bodyLockClass);

    // 접근성
    this.elements.trigger?.setAttribute('aria-expanded', 'true');
    this.elements.menu?.setAttribute('aria-hidden', 'false');

    // 첫 번째 포커스 가능한 요소에 포커스
    setTimeout(() => {
      const firstFocusable = this.elements.menu?.querySelector(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 100);

    // 커스텀 이벤트 발생
    this.dispatchEvent('mobileMenuOpen');
  },

  // 메뉴 닫기
  close() {
    if (!this.state.isOpen) return;

    this.state.isOpen = false;

    // 클래스 제거
    this.elements.trigger?.classList.remove(this.config.activeClass);
    this.elements.menu?.classList.remove(this.config.activeClass);
    this.elements.overlay?.classList.remove(this.config.activeClass);
    this.elements.body?.classList.remove(this.config.bodyLockClass);

    // 접근성
    this.elements.trigger?.setAttribute('aria-expanded', 'false');
    this.elements.menu?.setAttribute('aria-hidden', 'true');

    // 트리거 버튼으로 포커스 복원
    this.elements.trigger?.focus();

    // 커스텀 이벤트 발생
    this.dispatchEvent('mobileMenuClose');
  },

  // 키보드 이벤트 처리
  handleKeyDown(e) {
    if (!this.state.isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.handleTabKey(e);
        break;
    }
  },

  // Tab 키 포커스 트랩
  handleTabKey(e) {
    if (!this.elements.menu) return;

    const focusableElements = this.elements.menu.querySelectorAll(
      'button:not([disabled]), a:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  },

  // 터치 이벤트 바인딩 (스와이프로 닫기)
  bindTouchEvents() {
    if (!this.elements.menu) return;

    this.elements.menu.addEventListener(
      'touchstart',
      e => {
        this.state.touchStartX = e.touches[0].clientX;
        this.state.touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    this.elements.menu.addEventListener(
      'touchend',
      e => {
        if (!this.state.isOpen) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - this.state.touchStartX;
        const deltaY = touchEndY - this.state.touchStartY;

        // 오른쪽으로 스와이프 감지 (최소 100px, 수직 이동은 50px 이하)
        if (deltaX > 100 && Math.abs(deltaY) < 50) {
          this.close();
        }
      },
      { passive: true }
    );
  },

  // 윈도우 리사이즈 처리
  handleResize() {
    // 데스크톱 크기로 변경 시 모바일 메뉴 닫기
    if (window.innerWidth > 768 && this.state.isOpen) {
      this.close();
    }
  },

  // 커스텀 이벤트 발생
  dispatchEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        isOpen: this.state.isOpen,
        expandedMenus: Array.from(this.state.expandedMenus),
      },
    });
    document.dispatchEvent(event);
  },

  // 프로그래매틱 API
  api: {
    open: () => LibraryMobileMenu.open(),
    close: () => LibraryMobileMenu.close(),
    toggle: () => LibraryMobileMenu.toggle(),
    isOpen: () => LibraryMobileMenu.state.isOpen,
    expandMenu: menuId => {
      const toggle = document.querySelector(`[data-menu-toggle="${menuId}"]`);
      const content = document.querySelector(`[data-menu-content="${menuId}"]`);
      if (toggle && content) {
        LibraryMobileMenu.setAccordionState(toggle, content, true);
        LibraryMobileMenu.state.expandedMenus.add(menuId);
      }
    },
    collapseMenu: menuId => {
      const toggle = document.querySelector(`[data-menu-toggle="${menuId}"]`);
      const content = document.querySelector(`[data-menu-content="${menuId}"]`);
      if (toggle && content) {
        LibraryMobileMenu.setAccordionState(toggle, content, false);
        LibraryMobileMenu.state.expandedMenus.delete(menuId);
        LibraryMobileMenu.closeChildMenus(content);
      }
    },
  },

  // 동적 콘텐츠 로드 후 재초기화
  reinitialize() {
    console.log('🔄 Mobile Menu reinitializing...');
    this.bindAccordionEvents();
  },
};

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function () {
  LibraryMobileMenu.init();
});

// 전역으로 노출
window.LibraryMobileMenu = LibraryMobileMenu;

// common.js와의 통합을 위한 익스포트
if (typeof window.LibraryCommon !== 'undefined') {
  window.LibraryCommon.features.mobileMenu = {
    selector: '#mobileMenu',
    init: () => LibraryMobileMenu.init(),
  };
}
