/**
 * 연수구립도서관 메뉴 데이터 구조 정의
 * 3depth 메뉴 구조를 지원하는 메뉴 시스템
 *
 * 구조:
 * - MenuItem: 최하위 메뉴 아이템 (3depth)
 * - MenuSection: 2depth 메뉴 섹션 (하위에 MenuItem들을 가질 수 있음)
 * - MenuConfig: 1depth 메뉴 카테고리 (하위에 MenuSection들을 가짐)
 */

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
  도서검색: {
    title: '도서검색',
    sections: [
      {
        title: '소장도서검색',
        href: './01_소장도서검색',
      },
      {
        title: '통합검색',
        href: './05_통합검색',
      },
      {
        title: '인기/신착/추천도서',
        items: [
          { label: '인기도서', href: './06_인기도서' },
          { label: '신착도서', href: './07_신착도서' },
          { label: '추천도서', href: './08_추천도서' },
          { label: '인생서가', href: '/books/life-library' },
          { label: '스쿨북스', href: '/books/school-books' },
        ],
      },
      {
        title: '도서탐색',
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

  '책 읽는 연수구': {
    title: '책 읽는 연수구',
    sections: [
      {
        title: '연수북페스티벌',
        href: '/reading-yeonsu/book-festival',
      },
      {
        title: '희희낙락 북콘서트',
        href: '/reading-yeonsu/book-concert',
      },
      {
        title: '북스타트',
        href: '/reading-yeonsu/book-start',
      },
      {
        title: '북메이트',
        href: '/reading-yeonsu/book-mate',
      },
      {
        title: '독서동아리 지원 사업',
        items: [
          { label: '독서동아리 안내', href: '/reading-yeonsu/reading-club/info' },
          { label: '독서동아리 자료', href: '/reading-yeonsu/reading-club/materials' },
        ],
      },
      {
        title: '범구민 책읽어주기 문화운동',
        href: '/reading-yeonsu/reading-culture-movement',
      },
      {
        title: '북크로싱 센터',
        href: '/reading-yeonsu/book-crossing',
      },
      {
        title: '영유아 전집 대여 사업',
        items: [
          { label: '서비스 안내', href: '/reading-yeonsu/infant-books/info' },
          { label: '서비스 신청', href: '/reading-yeonsu/infant-books/apply' },
        ],
      },
    ],
  },

  안내마당: {
    title: '안내마당',
    sections: [
      {
        title: '공지사항',
        href: './04_공지사항',
      },
      {
        title: '이용안내',
        href: '/info/guide',
      },
      {
        title: '도서관 일정',
        href: '/info/schedule',
      },
      {
        title: '회원대출규정',
        href: '/info/loan-rules',
      },
      {
        title: '신간희망자료',
        href: '/info/new-request',
      },
      {
        title: '디지털자료실',
        href: '/info/digital-room',
      },
      {
        title: '학습열람실',
        href: '/info/study-room',
      },
      {
        title: '천체투영관',
        href: '/info/planetarium',
      },
      {
        title: '도서관 유튜브',
        href: '/info/youtube',
      },
      {
        title: '도서관 소식지',
        href: '/info/newsletter',
      },
      {
        title: '연수구 지역서점',
        href: '/info/local-bookstores',
      },
      {
        title: '부대시설',
        href: '/info/facilities',
      },
      {
        title: '자주하는 질문',
        href: '/info/faq',
      },
    ],
  },

  도서서비스: {
    title: '도서서비스',
    sections: [
      {
        title: '통합도서서비스',
        href: '/services/integrated-library',
      },
      {
        title: '상호대차서비스',
        href: '/services/interlibrary-loan',
      },
      {
        title: '책바다서비스',
        href: '/services/book-sea',
      },
      {
        title: '책나래서비스',
        href: '/services/book-wing',
      },
      {
        title: '모바일도서관',
        href: '/services/mobile-library',
      },
      {
        title: '스마트도서관',
        href: '/services/smart-library',
      },
      {
        title: '전자도서관',
        href: './20.전자도서관',
      },
      {
        title: '희망도서 신청',
        items: [
          { label: '서비스 안내', href: './21.희망도서신청-서비스안내' },
          { label: '서비스 신청', href: './21.희망도서신청-서비스신청' },
        ],
      },
      {
        title: '희망전자책 신청',
        items: [
          { label: '서비스 안내', href: '/services/ebook-request/info' },
          { label: '서비스 신청', href: '/services/ebook-request/apply' },
        ],
      },
      {
        title: '무료택배도서대출',
        items: [
          { label: '서비스 안내', href: '/services/delivery-loan/info' },
          { label: '서비스 신청', href: '/services/delivery-loan/apply' },
        ],
      },
    ],
  },

  열린참여마당: {
    title: '열린참여마당',
    sections: [
      {
        title: '도서관에 바란다',
        href: './03_도서관에바란다',
      },
      {
        title: '자원봉사',
        href: '/participation/volunteer',
      },
      {
        title: '도서관 견학',
        items: [
          { label: '도서관 견학 안내', href: '/participation/tour/info' },
          { label: '도서관 견학 신청', href: '/participation/tour/apply' },
        ],
      },
      {
        title: '도서기증',
        items: [
          { label: '기증안내', href: '/participation/donation/info' },
          { label: '서약서작성', href: '/participation/donation/pledge' },
          { label: '기증신청조회', href: '/participation/donation/status' },
        ],
      },
      {
        title: '독서마라톤',
        items: [
          { label: '독서마라톤 안내', href: '/participation/reading-marathon/info' },
          { label: '독서마라톤 참여', href: '/participation/reading-marathon/join' },
        ],
      },
      {
        title: '독서왕',
        items: [
          { label: '독서왕 안내', href: '/participation/reading-king/info' },
          { label: '독서왕 참여', href: '/participation/reading-king/join' },
        ],
      },
      {
        title: '출석체크 이벤트',
        items: [
          { label: '출석체크 안내', href: '/participation/attendance/info' },
          { label: '출석하기', href: '/participation/attendance/check' },
        ],
      },
    ],
  },

  문화마당: {
    title: '문화마당',
    sections: [
      {
        title: '문화행사 신청',
        href: '/culture/events',
      },
      {
        title: '프로그램 신청',
        href: '/culture/programs',
      },
      {
        title: '영화상영',
        items: [
          { label: '이용안내', href: '/culture/movie/info' },
          { label: '상영작', href: '/culture/movie/schedule' },
        ],
      },
      {
        title: '대관안내',
        items: [
          { label: '대관신청', href: '/culture/rental/apply' },
          { label: '공연장', href: '/culture/rental/performance-hall' },
          { label: '세미나실대관', href: '/culture/rental/seminar-room' },
          { label: '커뮤니티룸대관', href: '/culture/rental/community-room' },
          { label: '프로그램실', href: '/culture/rental/program-room' },
          { label: '독서토론실대관', href: '/culture/rental/discussion-room' },
          { label: '하늘빛정원대관', href: '/culture/rental/sky-garden' },
          { label: '동아리실대관', href: '/culture/rental/club-room' },
        ],
      },
    ],
  },

  도서관소개: {
    title: '도서관소개',
    sections: [
      {
        title: '인사말',
        href: '/about/greeting',
      },
      {
        title: '연혁',
        href: '/about/history',
      },
      {
        title: '상징',
        href: '/about/symbol',
      },
      {
        title: '조직도',
        href: '/about/organization',
      },
      {
        title: '자료현황',
        href: '/about/collection-status',
      },
      {
        title: '구립도서관',
        items: [
          { label: '송도국제도서관', href: '/about/district-libraries/songdo-international' },
          { label: '연수청학도서관', href: '/about/district-libraries/yeonsu-cheonghak' },
          { label: '연수꿈담도서관', href: '/about/district-libraries/yeonsu-kkumdam' },
          { label: '송도국제어린이도서관', href: '/about/district-libraries/songdo-children' },
          { label: '해돋이도서관', href: '/about/district-libraries/haedoji' },
          { label: '선학별빛도서관', href: '/about/district-libraries/seonhak-starlight' },
          { label: '동춘나래도서관', href: '/about/district-libraries/dongchun-narae' },
          { label: '함박비류도서관', href: '/about/district-libraries/hambak-biryu' },
        ],
      },
      {
        title: '공립작은도서관',
        items: [
          { label: '옥련1동작은도서관', href: '/about/small-libraries/okryeon1' },
          { label: '옥련2동어린이작은도서관', href: '/about/small-libraries/okryeon2-children' },
          { label: '연수1동작은도서관', href: '/about/small-libraries/yeonsu1' },
          { label: '송도2동작은도서관', href: '/about/small-libraries/songdo2' },
          { label: '송도3동작은도서관', href: '/about/small-libraries/songdo3' },
          { label: '송도5동작은도서관', href: '/about/small-libraries/songdo5' },
          { label: '솔안공원작은도서관', href: '/about/small-libraries/solan-park' },
          { label: '해찬솔공원작은도서관', href: '/about/small-libraries/haechan-park' },
          { label: '누리공원작은도서관', href: '/about/small-libraries/nuri-park' },
          { label: '문화공원 북크로싱 센터', href: '/about/small-libraries/culture-park-bookcrossing' },
        ],
      },
    ],
  },

  나의도서관: {
    title: '나의도서관',
    sections: [
      {
        title: '내정보',
        href: '/my-library/profile',
      },
      {
        title: '모바일회원증',
        href: '/my-library/mobile-card',
      },
      {
        title: '정회원인증',
        href: '/my-library/member-verification',
      },
      {
        title: '대출현황',
        href: './11.대출현황',
      },
      {
        title: '대출이력',
        href: './12.대출이력',
      },
      {
        title: '일반예약현황',
        href: './13.일반예약현황',
      },
      {
        title: '상호대차현황',
        href: './14.상호대차현황',
      },
      {
        title: '희망도서신청현황',
        href: './15.희망도서신청현황',
      },
      {
        title: '희망전자책신청현황',
        href: './16.희망전자책신청현황',
      },
      {
        title: '내책장',
        href: './17.내책장',
      },
      {
        title: '행사신청 조회',
        href: './18.행사신청조회',
      },
      {
        title: '프로그램신청 조회',
        href: './19.프로그램신청조회',
      },
      {
        title: '견학신청 조회',
        href: './견학신청조회',
      },
      {
        title: '대관신청 조회',
        items: [
          { label: '공연장대관신청 조회', href: '/my-library/rental-status/performance-hall' },
          { label: '세미나실대관신청 조회', href: '/my-library/rental-status/seminar-room' },
          { label: '커뮤니티룸대관신청 조회', href: '/my-library/rental-status/community-room' },
          { label: '프로그램실대관신청 조회', href: '/my-library/rental-status/program-room' },
          { label: '독서토론실대관신청 조회', href: '/my-library/rental-status/discussion-room' },
          { label: '하늘빛정원대관신청 조회', href: '/my-library/rental-status/sky-garden' },
          { label: '동아리실대관신청 조회', href: '/my-library/rental-status/club-room' },
        ],
      },
      {
        title: '영유아전집신청 조회',
        href: './영유아전집신청조회',
      },
    ],
  },

  회원서비스: {
    title: '회원서비스',
    sections: [
      {
        title: '로그인',
        href: '/member/login',
      },
      {
        title: '아이디찾기',
        href: '/member/find-id',
      },
      {
        title: '비밀번호찾기',
        href: '/member/find-password',
      },
      {
        title: '회원가입',
        href: '/member/join',
      },
    ],
  },

  기타: {
    title: '기타',
    sections: [
      {
        title: '사이트맵',
        href: '/etc/sitemap',
      },
      {
        title: '개인정보처리방침',
        href: '/etc/privacy-policy',
      },
      {
        title: "도서관 고양이 '관이'의 하루",
        href: '/etc/library-cat',
      },
      {
        title: '열람실현황',
        href: '/etc/reading-room-status',
      },
    ],
  },
};

/**
 * 현재 URL에 따라 메뉴 섹션의 확장 상태를 동적으로 설정하는 함수
 * 사용자가 현재 페이지에 해당하는 메뉴 항목을 쉽게 찾을 수 있도록 도움
 */
export const getExpandedSectionsForPath = (pathname: string, menuType: string): Record<string, boolean> => {
  const expandedSections: Record<string, boolean> = {};

  // 도서검색 메뉴의 확장 상태 결정
  if (menuType === '도서검색') {
    if (
      pathname.includes('인기도서') ||
      pathname.includes('신착도서') ||
      pathname.includes('추천도서') ||
      pathname.includes('life-library') ||
      pathname.includes('school-books')
    ) {
      expandedSections['인기/신착/추천도서'] = true;
    } else if (pathname.includes('카테고리분류') || pathname.includes('한국십진분류')) {
      expandedSections['도서탐색'] = true;
    }
  }

  // 책 읽는 연수구 메뉴의 확장 상태 결정
  else if (menuType === '책 읽는 연수구') {
    if (pathname.includes('reading-club')) {
      expandedSections['독서동아리 지원 사업'] = true;
    } else if (pathname.includes('infant-books')) {
      expandedSections['영유아 전집 대여 사업'] = true;
    }
  }

  // 도서서비스 메뉴의 확장 상태 결정
  else if (menuType === '도서서비스') {
    if (pathname.includes('희망도서신청')) {
      expandedSections['희망도서 신청'] = true;
    } else if (pathname.includes('ebook-request')) {
      expandedSections['희망전자책 신청'] = true;
    } else if (pathname.includes('delivery-loan')) {
      expandedSections['무료택배도서대출'] = true;
    }
  }

  // 열린참여마당 메뉴의 확장 상태 결정
  else if (menuType === '열린참여마당') {
    if (pathname.includes('tour')) {
      expandedSections['도서관 견학'] = true;
    } else if (pathname.includes('donation')) {
      expandedSections['도서기증'] = true;
    } else if (pathname.includes('reading-marathon')) {
      expandedSections['독서마라톤'] = true;
    } else if (pathname.includes('reading-king')) {
      expandedSections['독서왕'] = true;
    } else if (pathname.includes('attendance')) {
      expandedSections['출석체크 이벤트'] = true;
    }
  }

  // 문화마당 메뉴의 확장 상태 결정
  else if (menuType === '문화마당') {
    if (pathname.includes('movie')) {
      expandedSections['영화상영'] = true;
    } else if (pathname.includes('rental')) {
      expandedSections['대관안내'] = true;
    }
  }

  // 도서관소개 메뉴의 확장 상태 결정
  else if (menuType === '도서관소개') {
    if (pathname.includes('district-libraries')) {
      expandedSections['구립도서관'] = true;
    } else if (pathname.includes('small-libraries')) {
      expandedSections['공립작은도서관'] = true;
    }
  }

  // 나의도서관 메뉴의 확장 상태 결정
  else if (menuType === '나의도서관') {
    if (pathname.includes('rental-status')) {
      expandedSections['대관신청 조회'] = true;
    }
  }

  return expandedSections;
};

/**
 * URL 기반으로 메뉴 타입을 자동 감지하는 함수
 * 현재 페이지 URL을 분석하여 해당하는 메뉴 카테고리를 반환
 */
export const getMenuTypeFromPath = (pathname: string): string => {
  // 도서검색 관련 페이지
  if (
    pathname.includes('소장도서검색') ||
    pathname.includes('통합검색') ||
    pathname.includes('인기도서') ||
    pathname.includes('신착도서') ||
    pathname.includes('추천도서') ||
    pathname.includes('카테고리분류') ||
    pathname.includes('한국십진분류') ||
    pathname.includes('스마트도서관비치도서') ||
    pathname.includes('life-library') ||
    pathname.includes('school-books')
  ) {
    return '도서검색';
  }

  // 책 읽는 연수구 관련 페이지
  if (pathname.includes('reading-yeonsu')) {
    return '책 읽는 연수구';
  }

  // 안내마당 관련 페이지
  if (pathname.includes('공지사항') || pathname.includes('info')) {
    return '안내마당';
  }

  // 도서서비스 관련 페이지
  if (pathname.includes('services')) {
    return '도서서비스';
  }

  // 열린참여마당 관련 페이지
  if (pathname.includes('도서관에바란다') || pathname.includes('participation')) {
    return '열린참여마당';
  }

  // 문화마당 관련 페이지
  if (pathname.includes('culture')) {
    return '문화마당';
  }

  // 도서관소개 관련 페이지
  if (pathname.includes('about')) {
    return '도서관소개';
  }

  // 나의도서관 관련 페이지
  if (
    pathname.includes('대출현황') ||
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
    pathname.includes('영유아전집신청조회') ||
    pathname.includes('my-library')
  ) {
    return '나의도서관';
  }

  // 회원서비스 관련 페이지
  if (pathname.includes('member')) {
    return '회원서비스';
  }

  // 기타 관련 페이지
  if (pathname.includes('etc')) {
    return '기타';
  }

  // 기본값: 도서검색
  return '도서검색';
};
