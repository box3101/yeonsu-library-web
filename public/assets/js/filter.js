/**
 * 연수구 도서관 필터 컴포넌트
 * - UiLibraryFilter: 도서관 선택 필터
 */

const LibraryFilter = {
  // 필터 초기화
  initFilters() {
    const filters = document.querySelectorAll('.ui-library-filter');

    filters.forEach(filter => {
      const filterId = this.extractFilterId(filter);
      if (!filterId) return;

      const toggle = document.getElementById(`toggle-${filterId}`);
      const content = document.getElementById(`content-${filterId}`);
      const mainCheckbox = document.getElementById(`all-${filterId}`);
      const searchInput = filter.querySelector('#search');
      const searchDropdown = document.getElementById(
        `search-dropdown-${filterId}`
      );
      const searchTabs = filter.querySelectorAll('.search-tab-button');
      const searchContents = filter.querySelectorAll('.search-content');
      const keyboardTrigger = filter.querySelector('.ui-keyboard-trigger');

      if (!toggle || !content || !mainCheckbox) return;

      // 이미 초기화된 경우 스킵
      if (filter.dataset.filterInitialized) return;
      filter.dataset.filterInitialized = 'true';

      // 토글 기능
      this.initToggle(toggle, content);

      // 체크박스 기능
      this.initCheckboxes(mainCheckbox, content);

      // 검색 드롭다운 기능
      if (searchInput && searchDropdown) {
        this.initSearchDropdown(
          searchInput,
          searchDropdown,
          searchTabs,
          searchContents
        );
      }

      // 다국어입력기 버튼
      if (keyboardTrigger) {
        this.initKeyboardTrigger(keyboardTrigger);
      }

      // ESC 키로 드롭다운 닫기
      this.initEscapeHandler(searchDropdown, searchInput);
    });

    if (filters.length > 0) {
      console.log('✅ Library Filter initialized');
    }
  },

  // 필터 ID 추출
  extractFilterId(filter) {
    const toggle = filter.querySelector('[id^="toggle-"]');
    if (!toggle) return null;
    return toggle.id.replace('toggle-', '');
  },

  // 토글 기능 초기화
  initToggle(toggle, content) {
    toggle.addEventListener('click', function () {
      const isExpanded = content.dataset.expanded === 'true';
      const newExpanded = !isExpanded;

      content.dataset.expanded = newExpanded.toString();
      toggle.setAttribute('aria-expanded', newExpanded.toString());

      if (newExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });

    // 초기 상태 설정
    if (content.dataset.expanded === 'true') {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = 'max-content';
    }
  },

  // 체크박스 기능 초기화
  initCheckboxes(mainCheckbox, content) {
    // 전체 선택 체크박스
    mainCheckbox.addEventListener('change', function () {
      const libraryCheckboxes = content.querySelectorAll(
        '.ui-library-filter__item-checkbox input[type="checkbox"]'
      );
      libraryCheckboxes.forEach(checkbox => {
        checkbox.checked = mainCheckbox.checked;
      });
    });

    // 개별 체크박스
    const libraryCheckboxes = content.querySelectorAll(
      '.ui-library-filter__item-checkbox input[type="checkbox"]'
    );

    libraryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const totalCheckboxes = libraryCheckboxes.length;
        const checkedCheckboxes = content.querySelectorAll(
          '.ui-library-filter__item-checkbox input[type="checkbox"]:checked'
        ).length;

        if (checkedCheckboxes === totalCheckboxes) {
          mainCheckbox.checked = true;
          mainCheckbox.indeterminate = false;
        } else if (checkedCheckboxes === 0) {
          mainCheckbox.checked = false;
          mainCheckbox.indeterminate = false;
        } else {
          mainCheckbox.checked = false;
          mainCheckbox.indeterminate = true;
        }
      });
    });

    // 초기 상태 설정
    const initialChecked = content.querySelectorAll(
      '.ui-library-filter__item-checkbox input[type="checkbox"]:checked'
    ).length;
    const totalLibraries = libraryCheckboxes.length;

    if (initialChecked === totalLibraries && totalLibraries > 0) {
      mainCheckbox.checked = true;
    } else if (initialChecked > 0) {
      mainCheckbox.indeterminate = true;
    }
  },

  // 검색 드롭다운 기능 초기화
  initSearchDropdown(searchInput, searchDropdown, searchTabs, searchContents) {
    // 검색 입력 시 드롭다운 표시
    searchInput.addEventListener('focus', function () {
      searchDropdown.classList.add('is-open');
    });

    // 검색 입력 포커스 벗어날 때 드롭다운 숨기기
    searchInput.addEventListener('blur', function () {
      setTimeout(() => {
        searchDropdown.classList.remove('is-open');
      }, 200);
    });

    // 드롭다운 내부 클릭 시 포커스 유지
    searchDropdown.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    // 탭 기능
    searchTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetTab = this.dataset.tab;

        // 모든 탭 비활성화
        searchTabs.forEach(t => {
          t.classList.remove('active');
          t.dataset.active = 'false';
        });

        // 현재 탭 활성화
        this.classList.add('active');
        this.dataset.active = 'true';

        // 모든 컨텐츠 숨기기
        searchContents.forEach(content => {
          content.classList.remove('active');
        });

        // 선택된 컨텐츠 표시
        const targetContent = document.getElementById(`${targetTab}-searches`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  },

  // 다국어입력기 버튼 초기화
  initKeyboardTrigger(keyboardTrigger) {
    keyboardTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      // 전역 함수 호출로 키보드 열기
      if (typeof window.openKeyboard === 'function') {
        window.openKeyboard();
      }
    });
  },

  // ESC 키 핸들러 초기화
  initEscapeHandler(searchDropdown, searchInput) {
    document.addEventListener('keydown', function (e) {
      if (
        e.key === 'Escape' &&
        searchDropdown &&
        searchDropdown.classList.contains('is-open')
      ) {
        searchDropdown.classList.remove('is-open');
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  },

  // 전체 초기화
  init() {
    this.initFilters();
  },
};

// 저자 필터 접근성 개선 (최소한의 JS)
const AuthorFilterA11y = {
  init() {
    const toggles = document.querySelectorAll('#author-filter-toggle');

    toggles.forEach(toggle => {
      const button = toggle.parentElement.querySelector('.filter-label-btn');

      if (button) {
        // 초기 aria 속성 설정
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', 'author-filter-content');

        // 토글 상태 변경 시 aria 속성 업데이트
        toggle.addEventListener('change', function () {
          button.setAttribute('aria-expanded', this.checked.toString());
        });
      }
    });
  },
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryFilter.init();
  AuthorFilterA11y.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryFilter.init();
    AuthorFilterA11y.init();
  }, 100);
});
