/**
 * =====================================================
 * 연수구 도서관 공통 모달 컴포넌트 JavaScript
 * =====================================================
 *
 * 이 파일은 UiModal.astro 컴포넌트와 함께 사용되는 JavaScript입니다.
 * 복잡한 기능은 없고, 단순하게 모달을 열고 닫는 기능만 있습니다.
 *
 * 주요 기능:
 * 1. 버튼 클릭으로 모달 열기
 * 2. 버튼 클릭으로 모달 닫기
 * 3. ESC 키로 모달 닫기
 * 4. 배경 클릭으로 모달 닫기
 * 5. 모달이 열릴 때 스크롤 방지
 *
 * 사용법:
 * - 모달 열기 버튼에 data-modal-open="모달ID" 속성 추가
 * - 모달 닫기 버튼에 data-modal-close 속성 추가
 * - 확인 버튼에 data-modal-confirm 속성 추가
 *
 * =====================================================
 */

(function () {
  'use strict';

  // =====================================================
  // LibraryCommon 시스템에 모달 기능 등록
  // =====================================================
  // 이 부분은 프로젝트의 공통 JavaScript 시스템과 연결하는 부분입니다.
  // LibraryCommon.init()이 호출되면 자동으로 initModal() 함수가 실행됩니다.
  if (window.LibraryCommon) {
    window.LibraryCommon.features.modal = {
      selector: '[data-modal]', // 모달을 찾을 때 사용하는 선택자
      init: initModal, // 초기화할 때 실행할 함수
    };
  }

  /**
   * =====================================================
   * 모달 초기화 함수 (메인 함수)
   * =====================================================
   *
   * 이 함수가 모든 일을 처리합니다.
   * 페이지에 있는 모든 모달을 찾아서 이벤트를 등록합니다.
   *
   * 처리하는 일:
   * 1. 페이지에서 모든 모달 찾기 (data-modal 속성이 있는 요소들)
   * 2. 각 모달마다 열기/닫기 버튼 찾기
   * 3. 클릭 이벤트 등록하기
   * 4. 키보드 이벤트 등록하기 (ESC 키)
   *
   */
  function initModal() {
    // 페이지에서 모든 모달 찾기
    // data-modal="모달ID" 속성이 있는 모든 요소를 찾습니다
    const modals = document.querySelectorAll('[data-modal]');

    // 찾은 모달들을 하나씩 처리합니다
    modals.forEach(function (modal) {
      // 이미 초기화된 모달은 건너뛰기
      // (같은 모달에 중복으로 이벤트가 등록되는 것을 방지)
      if (modal.dataset.modalInitialized) {
        return;
      }

      // 초기화 완료 표시 (중복 방지용)
      modal.dataset.modalInitialized = 'true';

      // 모달 ID 가져오기 (data-modal 속성값)
      const modalId = modal.dataset.modal;

      // =====================================================
      // 1. 모달 열기 버튼들 찾기 및 이벤트 등록
      // =====================================================
      // data-modal-open="모달ID" 속성이 있는 모든 버튼을 찾습니다
      const openButtons = document.querySelectorAll(`[data-modal-open="${modalId}"]`);

      // 각 열기 버튼에 클릭 이벤트 등록
      openButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault(); // 기본 동작 방지 (링크라면 페이지 이동 방지)
          openModal(modal); // 모달 열기 함수 호출
        });
      });

      // =====================================================
      // 2. 모달 닫기 버튼들 찾기 및 이벤트 등록
      // =====================================================
      // 모달 안에서 data-modal-close 속성이 있는 모든 버튼을 찾습니다
      // (X 버튼, 취소 버튼 등)
      const closeButtons = modal.querySelectorAll('[data-modal-close]');

      // 각 닫기 버튼에 클릭 이벤트 등록
      closeButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault(); // 기본 동작 방지
          closeModal(modal); // 모달 닫기 함수 호출
        });
      });

      // =====================================================
      // 3. 확인 버튼들 찾기 및 이벤트 등록
      // =====================================================
      // 모달 안에서 data-modal-confirm 속성이 있는 모든 버튼을 찾습니다
      // (확인, 예약, 삭제 등의 액션 버튼들)
      const confirmButtons = modal.querySelectorAll('[data-modal-confirm]');

      // 각 확인 버튼에 클릭 이벤트 등록
      confirmButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault(); // 기본 동작 방지

          // 확인 버튼이 클릭되었다는 커스텀 이벤트를 발생시킵니다
          // 다른 JavaScript에서 이 이벤트를 감지해서 실제 처리를 할 수 있습니다
          const confirmEvent = new CustomEvent('modal:confirm', {
            detail: {
              modalId: modalId, // 어떤 모달인지
              modal: modal, // 모달 요소 자체
            },
          });
          document.dispatchEvent(confirmEvent);

          // 기본적으로는 확인 버튼을 누르면 모달이 닫힙니다
          // 만약 다른 곳에서 event.preventDefault()를 호출하면 닫히지 않습니다
          if (!confirmEvent.defaultPrevented) {
            closeModal(modal);
          } else {
          }
        });
      });

      // =====================================================
      // 4. 배경 클릭으로 모달 닫기 이벤트 등록
      // =====================================================
      // 모달의 배경(백드롭)을 클릭하면 모달이 닫히도록 합니다
      const backdrop = modal.querySelector('.ui-modal__backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', function () {
          closeModal(modal);
        });
      } else {
      }
    });

    // =====================================================
    // 5. ESC 키로 모든 모달 닫기 이벤트 등록
    // =====================================================
    // 이 이벤트는 한 번만 등록하면 됩니다 (모든 모달에 적용)
    document.addEventListener('keydown', function (event) {
      // ESC 키가 눌렸는지 확인
      if (event.key === 'Escape') {
        // 현재 열려있는 모달 찾기
        const openModal = document.querySelector('.ui-modal.is-open');
        if (openModal) {
          const modalId = openModal.dataset.modal;
          closeModal(openModal);
        } else {
        }
      }
    });
  }

  /**
   * =====================================================
   * 모달 열기 함수
   * =====================================================
   *
   * 이 함수는 모달을 화면에 표시합니다.
   *
   * 처리하는 일:
   * 1. 다른 열린 모달들 먼저 닫기 (한 번에 하나의 모달만 열리도록)
   * 2. 모달에 'is-open' 클래스 추가 (CSS로 표시됨)
   * 3. 접근성을 위한 aria-hidden 속성 변경
   * 4. 배경 스크롤 방지를 위해 body에 클래스 추가
   * 5. 첫 번째 버튼에 포커스 이동
   * 6. 모달 열림 이벤트 발생
   *
   * @param {HTMLElement} modal - 열어야 할 모달 요소
   */
  function openModal(modal) {
    const modalId = modal.dataset.modal;

    // =====================================================
    // 1. 다른 열린 모달들 먼저 닫기
    // =====================================================
    // 한 번에 하나의 모달만 열리도록 합니다
    const otherOpenModals = document.querySelectorAll('.ui-modal.is-open');
    if (otherOpenModals.length > 0) {
      otherOpenModals.forEach(function (otherModal) {
        if (otherModal !== modal) {
          // 현재 열려고 하는 모달이 아닌 경우에만 닫기
          closeModal(otherModal);
        }
      });
    }

    // =====================================================
    // 2. 모달 표시하기
    // =====================================================
    modal.classList.add('is-open'); // CSS로 모달이 보이도록 함
    modal.setAttribute('aria-hidden', 'false'); // 스크린 리더에서 읽을 수 있도록 함

    // =====================================================
    // 3. 배경 스크롤 방지
    // =====================================================
    // 모달이 열려있을 때는 배경 페이지가 스크롤되지 않도록 합니다
    document.body.classList.add('modal-open');

    // =====================================================
    // 4. 첫 번째 버튼에 포커스 이동
    // =====================================================
    // 키보드 사용자를 위해 모달 안의 첫 번째 버튼에 포커스를 이동합니다
    const firstButton = modal.querySelector('button:not([disabled])');
    if (firstButton) {
      // 약간의 지연을 두어 CSS 애니메이션이 완료된 후 포커스 이동
      setTimeout(function () {
        firstButton.focus();
      }, 100);
    } else {
    }

    // =====================================================
    // 5. 모달 열림 이벤트 발생
    // =====================================================
    // 다른 JavaScript에서 모달이 열렸다는 것을 감지할 수 있도록 이벤트를 발생시킵니다
    const openEvent = new CustomEvent('modal:open', {
      detail: {
        modalId: modalId,
        modal: modal,
      },
    });
    document.dispatchEvent(openEvent);
  }

  /**
   * =====================================================
   * 모달 닫기 함수
   * =====================================================
   *
   * 이 함수는 모달을 화면에서 숨깁니다.
   *
   * 처리하는 일:
   * 1. 모달에서 'is-open' 클래스 제거 (CSS로 숨겨짐)
   * 2. 접근성을 위한 aria-hidden 속성 변경
   * 3. 배경 스크롤 방지 해제
   * 4. 모달 닫힘 이벤트 발생
   *
   * @param {HTMLElement} modal - 닫아야 할 모달 요소
   */
  function closeModal(modal) {
    const modalId = modal.dataset.modal;

    // =====================================================
    // 1. 모달 숨기기
    // =====================================================
    modal.classList.remove('is-open'); // CSS로 모달이 숨겨지도록 함
    modal.setAttribute('aria-hidden', 'true'); // 스크린 리더에서 읽지 않도록 함

    // =====================================================
    // 2. 배경 스크롤 복원
    // =====================================================
    // 모달이 닫혔으므로 배경 페이지를 다시 스크롤할 수 있도록 합니다
    document.body.classList.remove('modal-open');

    // =====================================================
    // 3. 모달 닫힘 이벤트 발생
    // =====================================================
    // 다른 JavaScript에서 모달이 닫혔다는 것을 감지할 수 있도록 이벤트를 발생시킵니다
    const closeEvent = new CustomEvent('modal:close', {
      detail: {
        modalId: modalId,
        modal: modal,
      },
    });
    document.dispatchEvent(closeEvent);
  }

  // =====================================================
  // 외부에서 사용할 수 있는 함수들 등록
  // =====================================================
  // 다른 JavaScript 파일에서 모달을 조작할 수 있도록 전역 함수로 등록합니다

  /**
   * ID로 모달 열기
   * 사용법: openModal('my-modal-id')
   */
  window.openModal = function (modalId) {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (modal) {
      openModal(modal);
    } else {
      console.warn(`❌ 모달 "${modalId}"를 찾을 수 없습니다!`);
      alert(`모달 "${modalId}"를 찾을 수 없습니다.`);
    }
  };

  /**
   * ID로 모달 닫기
   * 사용법: closeModal('my-modal-id')
   */
  window.closeModal = function (modalId) {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (modal) {
      closeModal(modal);
    } else {
      console.warn(`❌ 모달 "${modalId}"를 찾을 수 없습니다!`);
    }
  };

  /**
   * 모든 열린 모달 닫기
   * 사용법: closeAllModals()
   */
  window.closeAllModals = function () {
    const openModals = document.querySelectorAll('.ui-modal.is-open');
    if (openModals.length > 0) {
      openModals.forEach(function (modal) {
        closeModal(modal);
      });
    } else {
    }
  };

  /**
   * 수동으로 모달 시스템 초기화
   * 사용법: initModal()
   * (보통은 자동으로 초기화되지만, 필요시 수동으로 호출 가능)
   */
  window.initModal = initModal;

  // =====================================================
  // 초기화 완료 로그
  // =====================================================
})();
