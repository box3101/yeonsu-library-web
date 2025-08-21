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
          { label: '통합검색', href: './01_소장도서검색' },
          { label: '상세검색', href: './01-1.소장도서검색_상세' },
          { label: '고급검색', href: './01-2.소장도서검색_고급검색' },
        ],
      },
      {
        title: '통합검색',
        href: './05_통합검색',
      },
      {
        title: '인기/신착/추천도서',
        isExpanded: false,
        items: [
          { label: '인기도서', href: './06_인기도서' },
          { label: '신착도서', href: './07_신착도서' },
          { label: '추천도서', href: './08_추천도서' },
        ],
      },
      {
        title: '도서탐색',
        isExpanded: false,
        items: [
          { label: '카테고리분류', href: './09_카테고리분류' },
          { label: '한국십진분류', href: './10_한국십진분류' },
        ],
      },
      {
        title: '스마트도서관비치도서',
        href: './02_스마트도서관비치도서',
      },
    ],
  },
  '열린참여마당': {
    title: '열린참여마당',
    sections: [
      {
        title: '도서관에 바란다',
        href: './03_도서관에바란다',
      },
      {
        title: '희망도서신청',
        href: './21.희망도서신청',
      },
      {
        title: '자원봉사',
        href: '/participation/volunteer',
      },
      {
        title: '도서관 견학',
        href: '/participation/tour',
      },
    ],
  },
  '안내마당': {
    title: '안내마당',
    sections: [
      {
        title: '공지사항',
        href: './04_공지사항',
      },
      {
        title: '신간희망자료',
        href: '/info/new-request',
      },
      {
        title: '도서관 유튜브',
        href: '/info/youtube',
      },
      {
        title: '자주하는 질문',
        href: '/info/faq',
      },
    ],
  },
  '나의도서관': {
    title: '나의도서관',
    sections: [
      {
        title: '대출/예약',
        isExpanded: false,
        items: [
          { label: '대출현황', href: './11.대출현황' },
          { label: '대출이력', href: './12.대출이력' },
          { label: '일반예약현황', href: './13.일반예약현황' },
          { label: '상호대차현황', href: './14.상호대차현황' },
        ],
      },
      {
        title: '희망신청',
        isExpanded: false,
        items: [
          { label: '희망도서신청현황', href: './15.희망도서신청현황' },
          { label: '희망전자책신청현황', href: './16.희망전자책신청현황' },
        ],
      },
      {
        title: '내책장',
        href: './17.내책장',
      },
      {
        title: '전자도서관',
        href: './20.전자도서관',
      },
      {
        title: '신청조회',
        isExpanded: false,
        items: [
          { label: '행사신청조회', href: './18.행사신청조회' },
          { label: '프로그램신청조회', href: './19.프로그램신청조회' },
          { label: '견학신청조회', href: './견학신청조회' },
          { label: '대관신청조회', href: './대관신청조회' },
          { label: '영유아전집신청조회', href: './영유아전집신청조회' },
        ],
      },
    ],
  }
};

// URL 기반으로 메뉴 타입을 자동 감지하는 함수
export const getMenuTypeFromPath = (pathname: string): string => {
  // 도서검색 관련 페이지
  if (pathname.includes('소장도서검색') || 
      pathname.includes('통합검색') || 
      pathname.includes('인기도서') || 
      pathname.includes('신착도서') || 
      pathname.includes('추천도서') || 
      pathname.includes('카테고리분류') || 
      pathname.includes('한국십진분류') || 
      pathname.includes('스마트도서관비치도서')) {
    return '도서검색';
  }
  
  // 열린참여마당 관련 페이지
  if (pathname.includes('도서관에바란다') || 
      pathname.includes('희망도서신청') || 
      pathname.includes('participation')) {
    return '열린참여마당';
  }
  
  // 안내마당 관련 페이지
  if (pathname.includes('공지사항') || 
      pathname.includes('info')) {
    return '안내마당';
  }
  
  // 나의도서관 관련 페이지
  if (pathname.includes('대출현황') || 
      pathname.includes('대출이력') || 
      pathname.includes('예약현황') || 
      pathname.includes('상호대차현황') || 
      pathname.includes('희망도서신청현황') || 
      pathname.includes('희망전자책신청현황') || 
      pathname.includes('내책장') || 
      pathname.includes('전자도서관') || 
      pathname.includes('행사신청조회') || 
      pathname.includes('프로그램신청조회') || 
      pathname.includes('견학신청조회') || 
      pathname.includes('대관신청조회') || 
      pathname.includes('영유아전집신청조회')) {
    return '나의도서관';
  }
  
  // 기본값: 도서검색
  return '도서검색';
};