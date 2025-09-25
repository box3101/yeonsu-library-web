$(document).ready(function() {
  const $faqToggles = $('[data-faq-toggle]');

  $faqToggles.on('click', function() {
    const $this = $(this);
    const isExpanded = $this.attr('aria-expanded') === 'true';
    const $content = $this.next();

    // 다른 모든 FAQ 닫기
    $faqToggles.not($this).attr('aria-expanded', 'false');
    $faqToggles.not($this).next().attr('aria-hidden', 'true');

    // 현재 클릭된 FAQ 토글
    $this.attr('aria-expanded', !isExpanded);
    $content.attr('aria-hidden', isExpanded);
  });

  // 키보드 접근성
  $faqToggles.on('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).click();
    }
  });
});