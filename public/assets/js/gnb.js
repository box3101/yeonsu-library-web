(function() {
  const gnb = document.getElementById('gnb');
  if (!gnb) return;

  // 간단한 호버/포커스 기반 서브메뉴 표시
  const mainItems = gnb.querySelectorAll('.gnb-main-item');

  mainItems.forEach((item, index) => {
    const mainLink = item.querySelector('.gnb-main-link');
    const submenu = item.querySelector('.gnb-sub');

    if (!submenu) return;

    // 호버 이벤트
    item.addEventListener('mouseenter', () => showSubmenu(submenu));
    item.addEventListener('mouseleave', (e) => {
      if (!submenu.contains(e.relatedTarget)) {
        setTimeout(() => hideSubmenu(submenu), 100);
      }
    });

    // 포커스 이벤트
    mainLink.addEventListener('focus', () => showSubmenu(submenu));

    // 2depth 호버 시 3depth 업데이트
    const subItems = submenu.querySelectorAll('.gnb-sub-item');
    const thirdTitle = submenu.querySelector('[data-third-title]');
    const thirdItems = submenu.querySelector('[data-third-items]');

    subItems.forEach((subItem) => {
      const subLink = subItem.querySelector('.gnb-sub-link');

      ['mouseenter', 'focus'].forEach(eventType => {
        subLink.addEventListener(eventType, () => {
          updateThirdContent(subItem, thirdTitle, thirdItems);
        });
      });
    });
  });

  // 전체 GNB 벗어날 때 숨기기
  gnb.addEventListener('mouseleave', () => {
    gnb.querySelectorAll('.gnb-sub').forEach(hideSubmenu);
  });

  function showSubmenu(submenu) {
    hideAllSubmenus();
    submenu.hidden = false;
  }

  function hideSubmenu(submenu) {
    submenu.hidden = true;
  }

  function hideAllSubmenus() {
    gnb.querySelectorAll('.gnb-sub').forEach(hideSubmenu);
  }

  function updateThirdContent(subItem, thirdTitle, thirdItems) {
    const label = subItem.querySelector('.gnb-sub-text')?.textContent;
    const subItemsData = subItem.getAttribute('data-sub-items');

    // 선택된 상태 업데이트
    subItem.parentElement.querySelectorAll('.gnb-sub-item').forEach(item => {
      item.classList.remove('selected');
    });
    subItem.classList.add('selected');

    // 타이틀 업데이트
    if (thirdTitle && label) {
      thirdTitle.textContent = label;
    }

    // 3depth 컨텐츠 업데이트
    if (thirdItems && subItemsData && subItemsData !== '') {
      try {
        const subItemsParsed = JSON.parse(subItemsData);
        thirdItems.innerHTML = `
          <div class="gnb-third-column">
            ${subItemsParsed.map(item => `
              <div class="gnb-third-item ${item.isSelected ? 'selected' : ''}">
                <a href="${item.href}" class="gnb-third-link">
                  <span class="gnb-third-text">${item.label}</span>
                </a>
              </div>
            `).join('')}
          </div>
        `;
      } catch (e) {
        thirdItems.innerHTML = '';
      }
    } else {
      thirdItems.innerHTML = '';
    }
  }
})();


(function() {
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  // 1depth 바 탭 버튼들
  const depthBarItems = document.querySelectorAll('.depth-bar-item');
  // 메뉴 콘텐츠들
  const menuContents = document.querySelectorAll('.menu-detail-content');
  // 2depth 메뉴 토글 버튼들
  const menuToggleButtons = document.querySelectorAll('.menu-item-toggle');

      // 메뉴 열기
  if (mobileMenuTrigger && mobileMenu && mobileMenuOverlay) {
    mobileMenuTrigger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      mobileMenuTrigger.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // 메뉴 닫기
  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
    }
    if (mobileMenuTrigger) {
      mobileMenuTrigger.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', closeMenu);
  }

  if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', closeMenu);
  }

  // 1depth 바 탭 전환
  depthBarItems.forEach((item) => {
    item.addEventListener('click', () => {
      // 모든 탭에서 selected 클래스 제거
      depthBarItems.forEach(tab => tab.classList.remove('selected'));
      // 클릭된 탭에 selected 클래스 추가
      item.classList.add('selected');

      // 모든 메뉴 콘텐츠 숨기기
      menuContents.forEach(content => content.classList.remove('active'));

      // 해당하는 메뉴 콘텐츠 보이기
      const category = item.getAttribute('data-category');
      const targetContent = document.querySelector(`[data-content="${category}"]`);
      if (targetContent) {
        targetContent.classList.add('active');

        // 해당 메뉴 콘텐츠 위치로 스크롤
        const menuDetailArea = document.querySelector('.mobile-menu-detail');
        if (menuDetailArea) {
          // 잠시 후 스크롤 (DOM 업데이트 후)
          setTimeout(() => {
            const targetContentRect = targetContent.getBoundingClientRect();
            const containerRect = menuDetailArea.getBoundingClientRect();

            // 컨테이너 기준 상대적 위치 계산
            const relativeTop = targetContentRect.top - containerRect.top;
            const targetScrollPosition = Math.max(0, menuDetailArea.scrollTop + relativeTop);

            menuDetailArea.scrollTo({
              top: targetScrollPosition,
              behavior: 'smooth'
            });
          }, 50);
        }
      }
    });
  });

      // 2depth 메뉴 아코디언 토글 함수
  function handleMenuToggle(button) {
      const toggleId = button.getAttribute('data-toggle');
      const targetSubmenu = document.querySelector(`[data-submenu="${toggleId}"]`);

      if (targetSubmenu) {
        const isExpanded = button.classList.contains('expanded');

        if (isExpanded) {
          // 접기
          button.classList.remove('expanded');
          button.classList.remove('selected');
          targetSubmenu.classList.remove('active');
        } else {
          // 같은 섹션의 다른 메뉴들 닫기
          const parentSection = button.closest('.menu-section');
          if (parentSection) {
            const otherButtons = parentSection.querySelectorAll('.menu-item-toggle');
            const otherSubmenus = parentSection.querySelectorAll('.menu-submenu');

            otherButtons.forEach((otherBtn) => {
              otherBtn.classList.remove('expanded', 'selected');
            });
            otherSubmenus.forEach((otherSubmenu) => {
              otherSubmenu.classList.remove('active');
            });
          }

          // 펼치기
          button.classList.add('expanded');
          button.classList.add('selected');
          targetSubmenu.classList.add('active');

                      // 3depth 서브메뉴 위치로 스크롤 이동
          setTimeout(() => {
            const menuDetailArea = document.querySelector('.mobile-menu-detail');
            if (menuDetailArea && targetSubmenu) {

              // 방법 1: getBoundingClientRect를 사용한 정확한 위치 계산
              const containerRect = menuDetailArea.getBoundingClientRect();
              const buttonRect = button.getBoundingClientRect();

              // 컨테이너 기준 상대적 위치 + 현재 스크롤 위치
              const relativeTop = buttonRect.top - containerRect.top;
              const targetScrollPosition = Math.max(0, menuDetailArea.scrollTop + relativeTop - 20);

              console.log('스크롤 디버깅:', {
                buttonTop: buttonRect.top,
                containerTop: containerRect.top,
                relativeTop: relativeTop,
                currentScroll: menuDetailArea.scrollTop,
                targetScroll: targetScrollPosition
              });

              // 방법 1: scrollTo 시도 (부드러운 스크롤)
              try {
                menuDetailArea.scrollTo({
                  top: targetScrollPosition,
                  behavior: 'smooth'
                });
              } catch (e) {
                console.log('scrollTo 실패, scrollTop 사용');
              }

              // 방법 2: 즉시 스크롤 (폴백)
              setTimeout(() => {
                if (Math.abs(menuDetailArea.scrollTop - targetScrollPosition) > 10) {
                  console.log('부드러운 스크롤 실패, 강제 스크롤');
                  menuDetailArea.scrollTop = targetScrollPosition;
                }
              }, 100);

              // 방법 3: Element.scrollIntoView 사용 (추가 폴백)
              setTimeout(() => {
                try {
                  targetSubmenu.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                } catch (e) {
                  console.log('scrollIntoView 실패');
                }
              }, 50);
            }
          }, 250); // 시간을 더 늘림
        }
      }
  }

      // 2depth 메뉴 아코디언 토글 이벤트 등록
  menuToggleButtons.forEach(button => {
    // 클릭 이벤트
    button.addEventListener('click', (e) => {
      e.preventDefault();
      handleMenuToggle(button);
    });

    // 터치 이벤트 (모바일 대응)
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleMenuToggle(button);
    });
  });

  // ESC 키로 메뉴 닫기
  document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // 터치 스와이프로 메뉴 닫기 (선택사항)
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  if (mobileMenu) {
    mobileMenu.addEventListener('touchstart', (e) => {
      startX = e.touches[0]?.clientX || 0;
      isDragging = true;
    });

    mobileMenu.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0]?.clientX || 0;
      const diffX = currentX - startX;

      // 오른쪽으로 스와이프 시 메뉴를 따라 이동
      if (diffX > 0) {
        mobileMenu.style.transform = `translateX(${diffX}px)`;
      }
    });

    mobileMenu.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      const diffX = currentX - startX;

      // 50px 이상 스와이프하면 메뉴 닫기
      if (diffX > 50) {
        closeMenu();
      }

      // 원래 위치로 복원
      mobileMenu.style.transform = '';
    });
  }
  });
})();