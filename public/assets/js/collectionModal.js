/**
 * 연수구 도서관 모달 컴포넌트 - ES5 + jQuery 단순화 버전
 * - UiCollectionModal: 소장정보 모달
 */
$(document).ready(function () {
  // 소장정보 모달 초기화
  function initCollectionModal() {
    var $modal = $('[data-modal="collection"]');
    if ($modal.length === 0) return;

    // 이미 초기화된 경우 스킵
    if ($modal.data('modal-initialized')) return;
    $modal.data('modal-initialized', true);

    var $openTriggers = $('[data-modal-open="collection"]');
    var $closeTriggers = $modal.find('[data-modal-close]');
    var $tabButtons = $modal.find('.tab-button');

    // 모달 열기
    $openTriggers.on('click', function () {
      $modal.addClass('is-open');
      $('body').addClass('modal-open');

      // 첫 번째 탭을 활성화
      activateFirstTab($tabButtons);
    });

    // 모달 닫기
    $closeTriggers.on('click', function () {
      $modal.removeClass('is-open');
      $('body').removeClass('modal-open');
    });

    // 배경 클릭으로 모달 닫기
    $modal.on('click', function (e) {
      if (e.target === this) {
        $modal.removeClass('is-open');
        $('body').removeClass('modal-open');
      }
    });

    // ESC 키로 모달 닫기
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $modal.hasClass('is-open')) {
        $modal.removeClass('is-open');
        $('body').removeClass('modal-open');
      }
    });

    // 탭 버튼 기능
    $tabButtons.on('click', function () {
      var $button = $(this);

      // 모든 탭 비활성화
      $tabButtons.each(function () {
        $(this).removeClass('is-active').attr('aria-selected', 'false');
      });

      // 클릭된 탭 활성화
      $button.addClass('is-active').attr('aria-selected', 'true');

      // 탭에 따른 콘텐츠 필터링
      var selectedTab = $button.data('tab');

      // TODO: 실제로는 선택된 도서관에 따라 테이블 데이터 필터링
      // filterCollectionsByLibrary(selectedTab);
    });

  }

  // 첫 번째 탭 활성화
  function activateFirstTab($tabButtons) {
    if ($tabButtons.length > 0) {
      $tabButtons.removeClass('is-active').attr('aria-selected', 'false');
      $tabButtons.first().addClass('is-active').attr('aria-selected', 'true');
    }
  }

  // 도서관별 소장정보 필터링 (예시 함수)
  function filterCollectionsByLibrary(libraryId) {
    var $tableRows = $('.collection-table tbody tr');

    if (libraryId === 'all') {
      $tableRows.show();
    } else {
      $tableRows.each(function () {
        var $row = $(this);
        var rowLibraryId = $row.data('library-id');

        if (rowLibraryId === libraryId) {
          $row.show();
        } else {
          $row.hide();
        }
      });
    }
  }

  // 모달 프로그래매틱 제어 함수 (외부에서 호출 가능)
  window.openCollectionModal = function () {
    var $modal = $('[data-modal="collection"]');
    if ($modal.length > 0) {
      $modal.addClass('is-open');
      $('body').addClass('modal-open');
    }
  };

  window.closeCollectionModal = function () {
    var $modal = $('[data-modal="collection"]');
    if ($modal.length > 0) {
      $modal.removeClass('is-open');
      $('body').removeClass('modal-open');
    }
  };

  // 초기화 실행
  initCollectionModal();

  // 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
  $(window).on('load', function () {
    setTimeout(function () {
      initCollectionModal();
    }, 100);
  });
});
