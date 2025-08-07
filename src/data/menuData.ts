export interface MenuItem {
  label: string;
  href: string;
}

export interface MenuSection {
  title: string;
  isExpanded?: boolean;
  href?: string; // 2depth만 있는 경우 직접 링크
  items?: MenuItem[]; // 3depth가 있는 경우 하위 아이템들
}

export interface MenuConfig {
  title: string;
  sections: MenuSection[];
}

export const menuConfig: Record<string, MenuConfig> = {
  '도서검색': {
    title: '도서검색',
    sections: [
      {
        title: '소장도서검색',
        isExpanded: true,
        items: [
          { label: '통합검색', href: '/search/integrated' },
          { label: '상세검색', href: '/search/detailed' },
          { label: '신착도서', href: '/search/new-arrivals' },
        ],
      },
      {
        title: '통합검색',
        isExpanded: false,
        items: [
          { label: '도서', href: '/search/books' },
          { label: '연속간행물', href: '/search/serials' },
          { label: '비도서자료', href: '/search/non-books' },
        ],
      },
      {
        title: '인기/신착/추천도서',
        isExpanded: false,
        items: [
          { label: '인기도서', href: '/search/popular' },
          { label: '신착도서', href: '/search/new' },
          { label: '추천도서', href: '/search/recommended' },
          { label: '사서추천', href: '/search/librarian-pick' },
        ],
      },
      {
        title: '인생서가',
        isExpanded: false,
        items: [
          { label: '내 서재', href: '/mypage/bookshelf' },
          { label: '독서기록', href: '/mypage/reading-log' },
          { label: '관심도서', href: '/mypage/wishlist' },
        ],
      },
      {
        title: '스쿨북스',
        isExpanded: false,
        items: [
          { label: '교과서', href: '/schoolbooks/textbooks' },
          { label: '참고서', href: '/schoolbooks/reference' },
          { label: '문제집', href: '/schoolbooks/workbooks' },
        ],
      },
      {
        title: '도서탐색',
        isExpanded: false,
        items: [
          { label: '주제별 탐색', href: '/browse/subjects' },
          { label: '저자별 탐색', href: '/browse/authors' },
          { label: '출판사별 탐색', href: '/browse/publishers' },
        ],
      },
      {
        title: '스마트도서관비치도서',
        isExpanded: false,
        items: [
          { label: '스마트도서관 안내', href: '/smart-library/info' },
          { label: '비치도서 목록', href: '/smart-library/books' },
          { label: '이용현황', href: '/smart-library/status' },
        ],
      },
    ],
  },
  '열린참여마당': {
    title: '열린참여마당',
    sections: [
      {
        title: '도서관에 바란다',
        href: '/BBS_USER_REG1_LIST_도서관에바란다',
      },
      {
        title: '희망도서신청',
        items: [
          { label: '희망도서신청', href: '/BBS_USER_REG1_LIST_도서관에바란다' },
        ],
      },
      {
        title: '분실신고',
        href: '/support/lost-report',
      },
      {
        title: 'FAQ',
        href: '/support/faq',
      },
    ],
  }
  
};

// URL 기반으로 메뉴 타입을 자동 감지하는 함수
export const getMenuTypeFromPath = (pathname: string): string => {
  if (pathname.startsWith('/search') || pathname.startsWith('/SRCH_')) return '도서검색';
  if (pathname.startsWith('/support') || pathname.startsWith('/BBS_')) return '열린참여마당';
  // 기본값: 도서검색
  return '도서검색';
};