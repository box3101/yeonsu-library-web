/**
 * 단순화된 토글 컴포넌트 - ES5 + jQuery
 * 데이터 속성 기반 토글 기능
 */
$(document).ready(function () {
  // 토글 기능 초기화
  function initToggle() {
    $('[data-toggle]').each(function () {
      var $toggle = $(this);

      // 이미 초기화된 경우 스킵
      if ($toggle.data('toggle-initialized')) return;
      $toggle.data('toggle-initialized', true);

      var targetId = $toggle.data('toggle');
      var $target = $('[data-toggle-target="' + targetId + '"]');

      if ($target.length === 0) return;

      $toggle.on('click', function () {
        var $this = $(this);
        var isActive = $this.hasClass('is-active');

        // 토글 상태 변경
        $this.toggleClass('is-active');
        $target.toggleClass('is-active');

        // 화살표 아이콘 토글 (카테고리 아이템용)
        var $toggleIcon = $this.find('.ui-category-item__toggle');
        if ($toggleIcon.length > 0) {
          $toggleIcon.toggleClass('is-active');
        }

        // aria 속성 업데이트
        $this.attr('aria-expanded', !isActive);
        $target.attr('aria-hidden', isActive);
      });
    });
  }

  // 프로그래매틱 토글 제어 (외부에서 호출 가능)
  window.toggleElement = function (toggleId) {
    var $toggle = $('[data-toggle="' + toggleId + '"]');
    if ($toggle.length > 0) {
      $toggle.click();
    }
  };

  // 토글 상태 확인
  window.isToggleActive = function (toggleId) {
    var $toggle = $('[data-toggle="' + toggleId + '"]');
    return $toggle.length > 0 ? $toggle.hasClass('is-active') : false;
  };

  // 초기화 실행
  initToggle();

  // 동적 콘텐츠 대응
  $(window).on('load', function () {
    initToggle();
  });

  // 전역 함수로도 등록 (기존 코드 호환성)
  window.initToggle = initToggle;
});
