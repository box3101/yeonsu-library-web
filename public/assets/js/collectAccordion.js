/**
 * 연수구 도서관 아코디언 컴포넌트 - ES5 + jQuery 단순화 버전
 */
$(document).ready(function () {
  // 일반 아코디언 초기화
  function initStandardAccordion() {
    $('[data-accordion-id]:not(.ui-collection-accordion)').each(function () {
      var $accordion = $(this);
      var $trigger = $accordion.find('.ui-accordion__trigger');
      var $content = $accordion.find('.ui-accordion__content');

      if ($trigger.length === 0 || $content.length === 0) return;
      if ($trigger.data('accordion-initialized')) return;

      $trigger.data('accordion-initialized', true);

      $trigger.on('click', function () {
        var $this = $(this);
        var isExpanded = $this.attr('aria-expanded') === 'true';
        var newExpanded = !isExpanded;

        $this.attr('aria-expanded', newExpanded);
        $content.attr('data-expanded', newExpanded);
      });
    });
  }

  // 소장정보 아코디언 초기화
  function initCollectionAccordion() {
    $('.ui-collection-accordion').each(function () {
      var $accordion = $(this);

      if ($accordion.data('accordion-initialized')) return;
      $accordion.data('accordion-initialized', true);

      var $trigger = $accordion.find('.ui-collection-accordion__trigger');
      var $content = $accordion.find('.ui-collection-accordion__content');
      var $closeBtn = $accordion.find('.ui-collection-accordion__close-btn');
      var iconType = $accordion.data('icon-type') || 'arrow';

      if ($trigger.length === 0 || $content.length === 0) return;

      if (iconType === 'close' && $closeBtn.length > 0) {
        // X 버튼 클릭시 닫기
        $closeBtn.on('click', function (e) {
          e.stopPropagation();
          $accordion.hide();

          var $wrapper = $accordion.closest('.ui-book-card__collection-wrapper');
          if ($wrapper.length > 0) {
            $wrapper.hide();
          }
        });
      } else if ($trigger.is('button')) {
        // 초기 상태 설정
        var initialExpanded = $content.attr('data-expanded') === 'true';
        $trigger.attr('aria-expanded', initialExpanded);

        // 아코디언 토글
        $trigger.on('click', function () {
          var $this = $(this);
          var isExpanded = $this.attr('aria-expanded') === 'true';
          var newExpanded = !isExpanded;

          $this.attr('aria-expanded', newExpanded);
          $content.attr('data-expanded', newExpanded);
        });
      }
    });
  }

  // 초기화 실행
  initStandardAccordion();
  initCollectionAccordion();
});
