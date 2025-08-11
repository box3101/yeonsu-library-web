/**
 * 연수구 도서관 다국어 키보드 컴포넌트
 * - UiKeyboard: 다국어 입력기
 */

const LibraryKeyboard = {
  // 키보드 초기화
  initKeyboards() {
    const keyboards = document.querySelectorAll('.keyboard-wrapper');

    keyboards.forEach(keyboardWrapper => {
      const keyboardId = keyboardWrapper.id;
      if (!keyboardId) return;

      // 이미 초기화된 경우 스킵
      if (keyboardWrapper.dataset.keyboardInitialized) return;
      keyboardWrapper.dataset.keyboardInitialized = 'true';

      const keyboardPanel = keyboardWrapper.querySelector('.worldword-wrap');
      const closeButton = keyboardWrapper.querySelector('.worldword-close');
      const languageButtons = keyboardWrapper.querySelectorAll('.language a');
      const languageContents = keyboardWrapper.querySelectorAll('.language-contents');
      const characterButtons = keyboardWrapper.querySelectorAll('.language-contents a');

      if (!keyboardPanel) return;

      // 전역 함수로 키보드 제어 함수 등록
      this.registerGlobalFunctions(keyboardPanel, keyboardId);

      // 언어 탭 기능
      this.initLanguageTabs(languageButtons, languageContents);

      // 문자 입력 기능
      this.initCharacterInput(characterButtons, keyboardWrapper);

      // 닫기 버튼
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          keyboardPanel.style.display = 'none';
        });
      }

      // ESC 키로 키보드 닫기
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && keyboardPanel.style.display === 'block') {
          keyboardPanel.style.display = 'none';
        }
      });
    });

    if (keyboards.length > 0) {
      console.log('✅ Keyboard Component initialized');
    }
  },

  // 전역 함수 등록
  registerGlobalFunctions(keyboardPanel, keyboardId) {
    // 키보드 열기 함수 (전역)
    window.openKeyboard = function () {
      keyboardPanel.style.display = 'block';
    };

    // 키보드 닫기 함수 (전역)
    window.closeKeyboard = function () {
      keyboardPanel.style.display = 'none';
    };

    // 특정 키보드 열기 함수
    window[`openKeyboard_${keyboardId}`] = function () {
      keyboardPanel.style.display = 'block';
    };

    // 특정 키보드 닫기 함수
    window[`closeKeyboard_${keyboardId}`] = function () {
      keyboardPanel.style.display = 'none';
    };
  },

  // 언어 탭 기능 초기화
  initLanguageTabs(languageButtons, languageContents) {
    languageButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = button.dataset.focusNext;

        // 모든 언어 버튼에서 selected 클래스 제거
        languageButtons.forEach(btn => btn.classList.remove('selected'));

        // 클릭된 버튼에 selected 클래스 추가
        button.classList.add('selected');

        // 모든 언어 콘텐츠 숨기기
        languageContents.forEach(content => {
          content.style.display = 'none';
        });

        // 선택된 언어 콘텐츠 표시
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
        }
      });
    });
  },

  // 문자 입력 기능 초기화
  initCharacterInput(characterButtons, keyboardWrapper) {
    characterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const character = button.textContent;
        if (!character) return;

        // 타겟 인풋 찾기
        const targetInput = this.findTargetInput(keyboardWrapper);
        if (targetInput) {
          // 현재 커서 위치에 문자 삽입
          this.insertAtCursor(targetInput, character);
        }
      });
    });
  },

  // 타겟 인풋 찾기
  findTargetInput(keyboardWrapper) {
    // data-target-input 속성으로 지정된 인풋 찾기
    const targetInputId = keyboardWrapper.dataset.targetInput;
    if (targetInputId) {
      return document.getElementById(targetInputId);
    }

    // 또는 가장 최근에 포커스된 인풋 찾기
    const focusedElement = document.activeElement;
    if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
      return focusedElement;
    }

    // 기본적으로 search 인풋 사용
    return document.getElementById('search');
  },

  // 커서 위치에 문자 삽입
  insertAtCursor(input, text) {
    if (!input) return;

    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    const value = input.value;

    input.value = value.substring(0, startPos) + text + value.substring(endPos);

    // 커서 위치 조정
    const newPos = startPos + text.length;
    input.setSelectionRange(newPos, newPos);

    // 입력 이벤트 발생
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // 포커스 유지
    input.focus();
  },

  // 전체 초기화
  init() {
    this.initKeyboards();
  }
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  LibraryKeyboard.init();
});

// 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
window.addEventListener('load', function () {
  setTimeout(() => {
    LibraryKeyboard.init();
  }, 100);
});
