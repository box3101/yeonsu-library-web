/**
 * 연수구 도서관 소장정보 관리 - ES5 + jQuery 단순화 버전
 * - UiBookCard의 소장정보 토글 기능
 */
$(document).ready(function () {
  // 책 카드 소장정보 토글 기능 초기화
  function initBookCardCollection() {
    $('.collection-toggle-button').each(function () {
      var $button = $(this);

      // 이미 이벤트가 등록되었는지 확인
      if ($button.data('event-registered')) return;
      $button.data('event-registered', true);

      $button.on('click', function (e) {
        e.preventDefault();

        // 해당 버튼이 속한 북카드의 소장정보 래퍼 찾기
        var $bookCard = $button.closest('.ui-book-card');
        if ($bookCard.length === 0) {
          console.error('Book card not found');
          return;
        }

        var $wrapper = $bookCard.find('.ui-book-card__collection-wrapper');
        if ($wrapper.length === 0) {
          console.error('Collection wrapper not found');
          return;
        }

        // 소장정보 표시 (항상 펼쳐진 상태로)
        $wrapper.show();

        // 아코디언을 펼친 상태로 강제 설정
        var $accordion = $wrapper.find('.book-card-accordion');
        if ($accordion.length > 0) {
          // 아코디언 전체를 다시 표시 (X 버튼으로 숨겨졌을 수 있음)
          $accordion.show();

          var $trigger = $accordion.find('.ui-collection-accordion__trigger');
          var $content = $accordion.find('.ui-collection-accordion__content');

          if ($trigger.length > 0 && $content.length > 0) {
            // 아코디언 상태를 완전히 리셋하고 펼친 상태로 설정
            $trigger.attr('aria-expanded', 'true');
            $content.attr('data-expanded', 'true');

            // maxHeight를 일시적으로 제거하여 정확한 scrollHeight를 계산
            $content.css('max-height', 'none');
            var scrollHeight = $content[0].scrollHeight;
            $content.css('max-height', scrollHeight + 'px');
          }
        }
      });
    });

  }

  // 초기화 실행
  initBookCardCollection();

  // 페이지 로드 후에도 실행 (동적 콘텐츠 대응)
  $(window).on('load', function () {
    initBookCardCollection();
  });
});
