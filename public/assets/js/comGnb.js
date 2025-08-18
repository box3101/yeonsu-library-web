/**
 * 통합 내비게이션 스크립트
 * - 데스크톱 GNB 드롭다운 메뉴
 * - 모바일 햄버거 메뉴
 */
(function () {
  'use strict';

  // ==========================================
  // 유틸리티 함수들
  // ==========================================

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => context.querySelectorAll(selector);

  const addClass = (element, className) => element?.classList.add(className);
  const removeClass = (element, className) => element?.classList.remove(className);
  const toggleClass = (element, className) => element?.classList.toggle(className);
  const hasClass = (element, className) => element?.classList.contains(className);

  // ==========================================
  // 데스크톱 GNB 관리
  // ==========================================

  function initDesktopGNB() {
    const gnb = $('#gnb');
    if (!gnb) return;

    const mainItems = $$('.gnb-main-item', gnb);

    // 모든 서브메뉴 숨기기
    const hideAllSubmenus = () => {
      $$('.gnb-sub', gnb).forEach(sub => (sub.hidden = true));
    };

    // 서브메뉴 표시/숨기기
    const showSubmenu = submenu => {
      hideAllSubmenus();
      submenu.hidden = false;
    };

    // 3depth 컨텐츠 업데이트
    const updateThirdContent = (subItem, thirdTitle, thirdItems) => {
      const label = $('.gnb-sub-text', subItem)?.textContent;
      const subItemsData = subItem.getAttribute('data-sub-items');

      // 선택 상태 업데이트
      $$('.gnb-sub-item', subItem.parentElement).forEach(item => removeClass(item, 'selected'));
      addClass(subItem, 'selected');

      // 타이틀 업데이트
      if (thirdTitle && label) {
        thirdTitle.textContent = label;
      }

      // 3depth 아이템 렌더링
      if (thirdItems && subItemsData) {
        try {
          const items = JSON.parse(subItemsData);
          thirdItems.innerHTML = `
            <div class="gnb-third-column">
              ${items
                .map(
                  item => `
                <div class="gnb-third-item ${item.isSelected ? 'selected' : ''}">
                  <a href="${item.href}" class="gnb-third-link">
                    <span class="gnb-third-text">${item.label}</span>
                  </a>
                </div>
              `
                )
                .join('')}
            </div>
          `;
        } catch (e) {
          thirdItems.innerHTML = '';
        }
      } else if (thirdItems) {
        thirdItems.innerHTML = '';
      }
    };

    // 각 메인 아이템에 이벤트 등록
    mainItems.forEach(item => {
      const mainLink = $('.gnb-main-link', item);
      const submenu = $('.gnb-sub', item);

      if (!submenu) return;

      // 호버 및 포커스 이벤트
      item.addEventListener('mouseenter', () => showSubmenu(submenu));
      item.addEventListener('mouseleave', e => {
        if (!submenu.contains(e.relatedTarget)) {
          setTimeout(() => (submenu.hidden = true), 100);
        }
      });
      mainLink?.addEventListener('focus', () => showSubmenu(submenu));

      // 2depth 호버 시 3depth 업데이트
      const subItems = $$('.gnb-sub-item', submenu);
      const thirdTitle = $('[data-third-title]', submenu);
      const thirdItems = $('[data-third-items]', submenu);

      subItems.forEach(subItem => {
        const subLink = $('.gnb-sub-link', subItem);
        ['mouseenter', 'focus'].forEach(event => {
          subLink?.addEventListener(event, () => updateThirdContent(subItem, thirdTitle, thirdItems));
        });
      });
    });

    // GNB 전체 벗어날 때 숨기기
    gnb.addEventListener('mouseleave', hideAllSubmenus);
  }

  // ==========================================
  // 모바일 메뉴 관리
  // ==========================================

  function initMobileMenu() {
    const elements = {
      trigger: $('#mobileMenuTrigger'),
      menu: $('#mobileMenu'),
      overlay: $('#mobileMenuOverlay'),
      close: $('#mobileMenuClose'),
      detailArea: $('.mobile-menu-detail'),
    };

    // 필수 요소 체크
    if (!elements.trigger || !elements.menu) return;

    // 메뉴 열기
    const openMenu = () => {
      addClass(elements.menu, 'active');
      addClass(elements.overlay, 'active');
      addClass(elements.trigger, 'active');
      document.body.style.overflow = 'hidden';
    };

    // 메뉴 닫기
    const closeMenu = () => {
      removeClass(elements.menu, 'active');
      removeClass(elements.overlay, 'active');
      removeClass(elements.trigger, 'active');
      document.body.style.overflow = '';
      elements.menu.style.transform = ''; // 스와이프 시 변형 초기화
    };

    // 스크롤 이동 (부드러운 스크롤 + 폴백)
    const smoothScrollTo = (container, target, offset = 20) => {
      if (!container || !target) return;

      setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top;
        const scrollPosition = Math.max(0, container.scrollTop + relativeTop - offset);

        // 부드러운 스크롤 시도
        try {
          container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        } catch (e) {
          container.scrollTop = scrollPosition; // 폴백
        }

        // 추가 폴백 (scrollIntoView)
        setTimeout(() => {
          try {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (e) {
            // 무시
          }
        }, 50);
      }, 250);
    };

    // 이벤트 리스너 등록
    elements.trigger.addEventListener('click', openMenu);
    elements.close?.addEventListener('click', closeMenu);
    elements.overlay?.addEventListener('click', closeMenu);

    // ESC 키로 닫기
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && hasClass(elements.menu, 'active')) {
        closeMenu();
      }
    });

    // 1depth 탭 전환
    $$('.depth-bar-item').forEach(item => {
      item.addEventListener('click', () => {
        // 탭 상태 업데이트
        $$('.depth-bar-item').forEach(tab => removeClass(tab, 'selected'));
        addClass(item, 'selected');

        // 컨텐츠 전환
        const category = item.getAttribute('data-category');
        const targetContent = $(`[data-content="${category}"]`);

        $$('.menu-detail-content').forEach(content => removeClass(content, 'active'));

        if (targetContent) {
          addClass(targetContent, 'active');
          smoothScrollTo(elements.detailArea, targetContent);
        }
      });
    });

    // 2depth 아코디언 토글
    const handleMenuToggle = button => {
      const toggleId = button.getAttribute('data-toggle');
      const targetSubmenu = $(`[data-submenu="${toggleId}"]`);

      if (!targetSubmenu) return;

      const isExpanded = hasClass(button, 'expanded');
      const parentSection = button.closest('.menu-section');

      if (isExpanded) {
        // 접기
        removeClass(button, 'expanded');
        removeClass(button, 'selected');
        removeClass(targetSubmenu, 'active');
      } else {
        // 같은 섹션의 다른 메뉴들 닫기
        if (parentSection) {
          $$('.menu-item-toggle', parentSection).forEach(btn => {
            removeClass(btn, 'expanded');
            removeClass(btn, 'selected');
          });
          $$('.menu-submenu', parentSection).forEach(submenu => removeClass(submenu, 'active'));
        }

        // 펼치기
        addClass(button, 'expanded');
        addClass(button, 'selected');
        addClass(targetSubmenu, 'active');

        // 펼친 메뉴로 스크롤
        smoothScrollTo(elements.detailArea, button);
      }
    };

    // 2depth 토글 버튼 이벤트 등록
    $$('.menu-item-toggle').forEach(button => {
      const handleClick = e => {
        e.preventDefault();
        handleMenuToggle(button);
      };

      button.addEventListener('click', handleClick);
      button.addEventListener('touchend', handleClick);
    });

    // 스와이프로 메뉴 닫기
    let touchStart = { x: 0, isDragging: false };

    elements.menu.addEventListener('touchstart', e => {
      touchStart.x = e.touches[0]?.clientX || 0;
      touchStart.isDragging = true;
    });

    elements.menu.addEventListener('touchmove', e => {
      if (!touchStart.isDragging) return;

      const currentX = e.touches[0]?.clientX || 0;
      const diffX = currentX - touchStart.x;

      // 오른쪽 스와이프 시 메뉴 이동
      if (diffX > 0) {
        elements.menu.style.transform = `translateX(${diffX}px)`;
      }
    });

    elements.menu.addEventListener('touchend', e => {
      if (!touchStart.isDragging) return;

      const currentX = e.changedTouches[0]?.clientX || 0;
      const diffX = currentX - touchStart.x;

      touchStart.isDragging = false;

      // 50px 이상 스와이프하면 메뉴 닫기
      if (diffX > 50) {
        closeMenu();
      } else {
        elements.menu.style.transform = ''; // 원래 위치로 복원
      }
    });
  }

  // ==========================================
  // 초기화
  // ==========================================

  // DOM 로드 완료 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initDesktopGNB();
      initMobileMenu();
    });
  } else {
    initDesktopGNB();
    initMobileMenu();
  }
})();
