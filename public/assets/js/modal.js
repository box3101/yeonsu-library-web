/**
 * 연수구 도서관 공통 모달 컴포넌트 - ES5 + jQuery 단순화 버전
 */
$(document).ready(function () {
  // 모달 초기화 함수
  function initModal() {
    $('[data-modal]').each(function () {
      var $modal = $(this);

      // 이미 초기화된 모달은 건너뛰기
      if ($modal.data('modal-initialized')) return;
      $modal.data('modal-initialized', true);

      var modalId = $modal.data('modal');

      // 모달 열기 버튼들 이벤트
      $('[data-modal-open="' + modalId + '"]').on('click', function (e) {
        e.preventDefault();
        openModal($modal);
      });

      // 모달 닫기 버튼들 이벤트
      $modal.find('[data-modal-close]').on('click', function (e) {
        e.preventDefault();
        closeModal($modal);
      });

      // 확인 버튼 이벤트
      $modal.find('[data-modal-confirm]').on('click', function (e) {
        e.preventDefault();

        // 커스텀 이벤트 발생
        var confirmEvent = $.Event('modal:confirm', {
          modalId: modalId,
          modal: $modal[0],
        });
        $(document).trigger(confirmEvent);

        // 기본적으로 모달 닫기
        if (!confirmEvent.isDefaultPrevented()) {
          closeModal($modal);
        }
      });

      // 배경 클릭으로 모달 닫기
      $modal.find('.ui-modal__backdrop').on('click', function () {
        closeModal($modal);
      });
    });

    // ESC 키로 모든 모달 닫기
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        var $openModal = $('.ui-modal.is-open');
        if ($openModal.length > 0) {
          closeModal($openModal);
        }
      }
    });
  }

  // 모달 열기 함수
  function openModal($modal) {
    var modalId = $modal.data('modal');

    // 다른 열린 모달들 먼저 닫기
    $('.ui-modal.is-open').each(function () {
      if (this !== $modal[0]) {
        closeModal($(this));
      }
    });

    // 모달 표시
    $modal.addClass('is-open').attr('aria-hidden', 'false');
    $('body').addClass('modal-open');

    // 첫 번째 버튼에 포커스
    setTimeout(function () {
      var $firstButton = $modal.find('button:not([disabled])').first();
      if ($firstButton.length > 0) {
        $firstButton.focus();
      }
    }, 100);

    // 모달 열림 이벤트
    $(document).trigger('modal:open', {
      modalId: modalId,
      modal: $modal[0],
    });
  }

  // 모달 닫기 함수
  function closeModal($modal) {
    var modalId = $modal.data('modal');

    // 모달 숨기기
    $modal.removeClass('is-open').attr('aria-hidden', 'true');
    $('body').removeClass('modal-open');

    // 모달 닫힘 이벤트
    $(document).trigger('modal:close', {
      modalId: modalId,
      modal: $modal[0],
    });
  }

  // 전역 함수 등록
  window.openModal = function (modalId) {
    var $modal = $('[data-modal="' + modalId + '"]');
    if ($modal.length > 0) {
      openModal($modal);
    } else {
      console.warn('모달 "' + modalId + '"를 찾을 수 없습니다.');
    }
  };

  window.closeModal = function (modalId) {
    var $modal = $('[data-modal="' + modalId + '"]');
    if ($modal.length > 0) {
      closeModal($modal);
    } else {
      console.warn('모달 "' + modalId + '"를 찾을 수 없습니다.');
    }
  };

  window.closeAllModals = function () {
    $('.ui-modal.is-open').each(function () {
      closeModal($(this));
    });
  };

  window.initModal = initModal;

  // 초기화 실행
  initModal();
});
