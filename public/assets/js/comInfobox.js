/**
 * comInfobox.js
 * 정보박스 컴포넌트 - 도서관 운영시간 안내 등에 사용
 */

(function() {
    'use strict';

    // 정보박스 초기화
    function initInfobox() {
        const infoboxes = document.querySelectorAll('.com-infobox');

        infoboxes.forEach(function(infobox) {
            // 접근성 향상을 위한 role 추가
            if (!infobox.getAttribute('role')) {
                infobox.setAttribute('role', 'region');
                infobox.setAttribute('aria-label', '중요 정보');
            }
        });
    }

    // DOM 로드 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInfobox);
    } else {
        initInfobox();
    }

    // 전역 함수로 등록 (필요시 외부에서 호출 가능)
    window.initInfobox = initInfobox;

})();