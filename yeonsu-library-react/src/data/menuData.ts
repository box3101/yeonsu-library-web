import { MenuItem } from '@/types';

export interface MenuSection {
  title: string;
  isExpanded?: boolean;
  href?: string;
  items?: MenuItem[];
  external?: boolean;
}

export interface MenuConfig {
  title: string;
  sections: MenuSection[];
}

export const isExternalLink = (href: string, external?: boolean): boolean => {
  if (typeof external === 'boolean') {
    return external;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('www.');
};

export const menuConfig: Record<string, MenuConfig> = {
  도서검색: {
    title: '도서검색',
    sections: [
      {
        title: '소장도서검색',
        href: '/library-search',
      },
      {
        title: '통합검색',
        href: '/integrated-search',
      },
      {
        title: '인기/신착/추천도서',
        items: [
          { id: 'popular', label: '인기도서', href: '/popular-books' },
          { id: 'new', label: '신착도서', href: '/new-books' },
          { id: 'recommended', label: '추천도서', href: '/recommended-books' },
          { id: 'life-library', label: '인생서가', href: 'https://www.inseong.com', external: true },
          { id: 'school-books', label: '스쿨북스', href: 'https://www.schoolbook.com', external: true },
        ],
      },
      {
        title: '도서탐색',
        items: [
          { id: 'category', label: '카테고리분류', href: '/category-classification' },
          { id: 'kdcl', label: '한국십진분류', href: '/kdcl-classification' },
        ],
      },
      {
        title: '스마트도서관비치도서',
        href: '/smart-library-books',
      },
    ],
  },

  '책 읽는 연수구': {
    title: '책 읽는 연수구',
    sections: [
      {
        title: '연수북페스티벌',
        href: '/book-festival',
      },
      {
        title: '희희낙락 북콘서트',
        href: '/book-concert',
      },
      {
        title: '북스타트',
        href: '/bookstart',
      },
      {
        title: '북메이트',
        href: '/bookmate',
      },
      {
        title: '독서동아리 지원 사업',
        items: [
          { id: 'reading-club-info', label: '독서동아리 안내', href: '/reading-club/info' },
          { id: 'reading-club-materials', label: '독서동아리 자료', href: '/reading-club/materials' },
        ],
      },
      {
        title: '범구민 책읽어주기 문화운동',
        href: '/reading-culture-movement',
      },
      {
        title: '북크로싱 센터',
        href: '/book-crossing-center',
      },
      {
        title: '영유아 전집 대여 사업',
        items: [
          { id: 'infant-books-info', label: '서비스 안내', href: '/infant-books/info' },
          { id: 'infant-books-apply', label: '서비스 신청', href: '/infant-books/apply' },
        ],
      },
    ],
  },

  안내마당: {
    title: '안내마당',
    sections: [
      {
        title: '공지사항',
        href: '/announcements',
      },
      {
        title: '이용안내',
        href: '/usage-guide',
      },
      {
        title: '도서관 일정',
        href: '/library-schedule',
      },
      {
        title: '회원대출규정',
        href: '/loan-regulations',
      },
      {
        title: '신간희망자료',
        href: '/new-book-requests',
      },
      {
        title: '디지털자료실',
        href: '/digital-resources',
      },
      {
        title: '학습열람실',
        href: '/study-rooms',
      },
      {
        title: '천체투영관',
        href: '/planetarium',
      },
      {
        title: '국가전자도서관',
        href: 'https://www.nl.go.kr',
        external: true,
      },
      {
        title: '인천광역시 통합도서관',
        href: 'https://lib.incheon.go.kr',
        external: true,
      },
    ],
  },

  도서서비스: {
    title: '도서서비스',
    sections: [
      {
        title: '통합도서서비스',
        href: '/integrated-library-service',
      },
      {
        title: '상호대차서비스',
        href: '/interlibrary-loan',
      },
      {
        title: '책바다서비스',
        href: '/book-sea-service',
      },
      {
        title: '책나래서비스',
        href: '/book-wing-service',
      },
      {
        title: '모바일도서관',
        href: '/mobile-library',
      },
      {
        title: '스마트도서관',
        href: '/smart-library',
      },
      {
        title: '전자도서관',
        href: '/digital-library',
      },
      {
        title: '희망도서 신청',
        items: [
          { id: 'book-request-info', label: '서비스 안내', href: '/book-request/info' },
          { id: 'book-request-apply', label: '서비스 신청', href: '/book-request/apply' },
        ],
      },
      {
        title: '희망전자책 신청',
        items: [
          { id: 'ebook-request-info', label: '서비스 안내', href: '/ebook-request/info' },
          { id: 'ebook-request-apply', label: '서비스 신청', href: '/ebook-request/apply' },
        ],
      },
      {
        title: '무료택배도서대출',
        items: [
          { id: 'delivery-loan-info', label: '서비스 안내', href: '/delivery-loan/info' },
          { id: 'delivery-loan-apply', label: '서비스 신청', href: '/delivery-loan/apply' },
        ],
      },
    ],
  },

  열린참여마당: {
    title: '열린참여마당',
    sections: [
      {
        title: '도서관에 바란다',
        href: '/library-suggestions',
      },
      {
        title: '자원봉사',
        href: '/volunteer',
      },
      {
        title: '도서관 견학',
        items: [
          { id: 'tour-info', label: '도서관 견학 안내', href: '/library-tour/info' },
          { id: 'tour-apply', label: '도서관 견학 신청', href: '/library-tour/apply' },
        ],
      },
      {
        title: '도서기증',
        items: [
          { id: 'donation-info', label: '기증안내', href: '/book-donation/info' },
          { id: 'donation-pledge', label: '서약서작성', href: '/book-donation/pledge' },
          { id: 'donation-status', label: '기증신청조회', href: '/book-donation/status' },
        ],
      },
      {
        title: '독서마라톤',
        items: [
          { id: 'reading-marathon-info', label: '독서마라톤 안내', href: '/reading-marathon/info' },
          { id: 'reading-marathon-join', label: '독서마라톤 참여', href: '/reading-marathon/join' },
        ],
      },
      {
        title: '독서왕',
        items: [
          { id: 'reading-king-info', label: '독서왕 안내', href: '/reading-king/info' },
          { id: 'reading-king-join', label: '독서왕 참여', href: '/reading-king/join' },
        ],
      },
      {
        title: '출석체크 이벤트',
        items: [
          { id: 'attendance-info', label: '출석체크 안내', href: '/attendance/info' },
          { id: 'attendance-check', label: '출석하기', href: '/attendance/check' },
        ],
      },
    ],
  },

  문화마당: {
    title: '문화마당',
    sections: [
      {
        title: '문화행사 신청',
        href: '/cultural-events',
      },
      {
        title: '프로그램 신청',
        href: '/programs',
      },
      {
        title: '영화상영',
        items: [
          { id: 'movie-info', label: '이용안내', href: '/movies/info' },
          { id: 'movie-schedule', label: '상영작', href: '/movies/schedule' },
        ],
      },
      {
        title: '대관안내',
        items: [
          { id: 'rental-apply', label: '대관신청', href: '/facility-rental/apply' },
          { id: 'hall-rental', label: '공연장', href: '/facility-rental/hall' },
          { id: 'seminar-rental', label: '세미나실대관', href: '/facility-rental/seminar' },
          { id: 'community-rental', label: '커뮤니티룸대관', href: '/facility-rental/community' },
          { id: 'program-room', label: '프로그램실', href: '/facility-rental/program-room' },
          { id: 'discussion-room', label: '독서토론실대관', href: '/facility-rental/discussion' },
          { id: 'garden-rental', label: '하늘빛정원대관', href: '/facility-rental/garden' },
          { id: 'club-room', label: '동아리실대관', href: '/facility-rental/club-room' },
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
          { id: 'songdo-intl', label: '송도국제도서관', href: '/libraries/songdo-international' },
          { id: 'cheonghak', label: '연수청학도서관', href: '/libraries/yeonsu-cheonghak' },
          { id: 'yeonsu-dream', label: '연수꿈담도서관', href: '/libraries/yeonsu-dream' },
          { id: 'songdo-children', label: '송도국제어린이도서관', href: '/libraries/songdo-children' },
          { id: 'haedoji', label: '해돋이도서관', href: '/libraries/haedoji' },
          { id: 'sunhak-star', label: '선학별빛도서관', href: '/libraries/sunhak-star' },
          { id: 'dongchun', label: '동춘나래도서관', href: '/libraries/dongchun-narae' },
          { id: 'hambak', label: '함박비류도서관', href: '/libraries/hambak-biryu' },
        ],
      },
      {
        title: '공립작은도서관',
        items: [
          { id: 'okryeon1', label: '옥련1동작은도서관', href: '/small-libraries/okryeon1' },
          { id: 'okryeon2', label: '옥련2동어린이작은도서관', href: '/small-libraries/okryeon2-children' },
          { id: 'yeonsu1', label: '연수1동작은도서관', href: '/small-libraries/yeonsu1' },
          { id: 'songdo2', label: '송도2동작은도서관', href: '/small-libraries/songdo2' },
          { id: 'songdo3', label: '송도3동작은도서관', href: '/small-libraries/songdo3' },
          { id: 'songdo5', label: '송도5동작은도서관', href: '/small-libraries/songdo5' },
          { id: 'solan-park', label: '솔안공원작은도서관', href: '/small-libraries/solan-park' },
          { id: 'haechansol-park', label: '해찬솔공원작은도서관', href: '/small-libraries/haechansol-park' },
          { id: 'nuri-park', label: '누리공원작은도서관', href: '/small-libraries/nuri-park' },
          { id: 'culture-park', label: '문화공원 북크로싱 센터', href: '/small-libraries/culture-park-bookcrossing' },
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
        href: '/my-library/membership-verification',
      },
      {
        title: '대출현황',
        href: '/my-library/loan-status',
      },
      {
        title: '대출이력',
        href: '/my-library/loan-history',
      },
      {
        title: '일반예약현황',
        href: '/my-library/reservation-status',
      },
      {
        title: '상호대차현황',
        href: '/my-library/interlibrary-loan-status',
      },
      {
        title: '희망도서신청현황',
        href: '/my-library/book-request-status',
      },
      {
        title: '희망전자책신청현황',
        href: '/my-library/ebook-request-status',
      },
      {
        title: '내책장',
        href: '/my-library/bookshelf',
      },
      {
        title: '행사신청 조회',
        href: '/my-library/event-applications',
      },
      {
        title: '프로그램신청 조회',
        href: '/my-library/program-applications',
      },
      {
        title: '견학신청 조회',
        href: '/my-library/tour-applications',
      },
      {
        title: '대관신청 조회',
        items: [
          { id: 'hall-rental-status', label: '공연장대관신청 조회', href: '/my-library/facility-rental/hall' },
          { id: 'seminar-rental-status', label: '세미나실대관신청 조회', href: '/my-library/facility-rental/seminar' },
          { id: 'community-rental-status', label: '커뮤니티룸대관신청 조회', href: '/my-library/facility-rental/community' },
          { id: 'program-rental-status', label: '프로그램실대관신청 조회', href: '/my-library/facility-rental/program-room' },
          { id: 'discussion-rental-status', label: '독서토론실대관신청 조회', href: '/my-library/facility-rental/discussion' },
          { id: 'garden-rental-status', label: '하늘빛정원대관신청 조회', href: '/my-library/facility-rental/garden' },
          { id: 'club-rental-status', label: '동아리실대관신청 조회', href: '/my-library/facility-rental/club-room' },
        ],
      },
      {
        title: '영유아전집신청 조회',
        href: '/my-library/infant-book-applications',
      },
    ],
  },

  회원서비스: {
    title: '회원서비스',
    sections: [
      {
        title: '도서검색',
        href: '/library-search',
      },
      {
        title: '사이트맵',
        href: '/sitemap',
      },
      {
        title: '개인정보처리방침',
        href: '/privacy-policy',
      },
      {
        title: '회원서비스',
        items: [
          { id: 'login', label: '로그인', href: '/auth/login' },
          { id: 'find-id', label: '아이디찾기', href: '/auth/find-id' },
          { id: 'find-password', label: '비밀번호찾기', href: '/auth/find-password' },
          { id: 'register', label: '회원가입', href: '/auth/register' },
        ],
      },
      {
        title: "도서관 고양이 '관이'의 하루",
        href: '/library-cat-gwani',
      },
      {
        title: '열람실현황',
        href: '/reading-room-status',
      },
    ],
  },
};

export const getExpandedSectionsForPath = (pathname: string, menuType: string): Record<string, boolean> => {
  const expandedSections: Record<string, boolean> = {};

  if (menuType === '도서검색') {
    if (
      pathname.includes('popular-books') ||
      pathname.includes('new-books') ||
      pathname.includes('recommended-books') ||
      pathname.includes('inseong.com') ||
      pathname.includes('schoolbook.com')
    ) {
      expandedSections['인기/신착/추천도서'] = true;
    } else if (pathname.includes('category-classification') || pathname.includes('kdcl-classification')) {
      expandedSections['도서탐색'] = true;
    }
  }

  return expandedSections;
};

export const getMenuTypeFromPath = (pathname: string): string => {
  if (
    pathname.includes('library-search') ||
    pathname.includes('integrated-search') ||
    pathname.includes('popular-books') ||
    pathname.includes('new-books') ||
    pathname.includes('recommended-books') ||
    pathname.includes('category-classification') ||
    pathname.includes('kdcl-classification') ||
    pathname.includes('smart-library-books')
  ) {
    return '도서검색';
  }

  if (pathname.includes('my-library')) {
    return '나의도서관';
  }

  if (pathname.includes('auth')) {
    return '회원서비스';
  }

  return '도서검색';
};