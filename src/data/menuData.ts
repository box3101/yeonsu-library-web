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
	isExternal?: boolean; // 외부 링크 여부를 나타내는 새로운 속성
}

export interface MenuSection {
	title: string;
	isExpanded?: boolean;
	href?: string; // 2depth만 있는 경우 직접 링크
	items?: MenuItem[]; // 3depth가 있는 경우 하위 아이템들
	isExternal?: boolean; // 섹션 레벨에서도 외부 링크 지원
}

export interface MenuConfig {
	title: string;
	sections: MenuSection[];
}

/**
 * URL이 외부 링크인지 판단하는 함수
 * http:// 또는 https://로 시작하거나 isExternal 속성이 true인 경우 외부 링크로 판단
 */
export const isExternalLink = (href: string, isExternal?: boolean): boolean => {
	// isExternal 속성이 명시적으로 설정된 경우 우선 사용
	if (typeof isExternal === 'boolean') {
		return isExternal;
	}

	// URL 패턴으로 외부 링크 자동 감지
	return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('www.');
};

// 메인 메뉴 데이터 - 기존의 첫 번째 menuConfig를 삭제하고 여기에 외부 링크 예시를 추가
export const menuConfig: Record<string, MenuConfig> = {
	도서검색: {
		title: '도서검색',
		sections: [
			{
				title: '소장도서검색',
				href: './소장도서검색',
			},
			{
				title: '통합검색',
				href: './통합검색',
			},
			{
				title: '인기/신착/추천도서',
				items: [
					{ label: '인기도서', href: './인기도서' },
					{ label: '신착도서', href: './신착도서' },
					{ label: '추천도서', href: './추천도서' },
					{ label: '인생서가', href: 'https://www.inseong.com', isExternal: true },
					{ label: '스쿨북스', href: 'https://www.schoolbook.com', isExternal: true },
				],
			},
			{
				title: '도서탐색',
				items: [
					{ label: '카테고리분류', href: './카테고리분류' },
					{ label: '한국십진분류', href: './한국십진분류' },
				],
			},
			{
				title: '스마트도서관비치도서',
				href: './스마트도서관비치도서',
			},
		],
	},

	'책 읽는 연수구': {
		title: '책 읽는 연수구',
		sections: [
			{
				title: '연수북페스티벌',
				href: './연수북페스티벌',
			},
			{
				title: '희희낙락 북콘서트',
				href: './희희낙락 북콘서트',
			},
			{
				title: '북스타트',
				href: './북스타트',
			},
			{
				title: '북메이트',
				href: './북메이트',
			},
			{
				title: '독서동아리 지원 사업',
				items: [
					{ label: '독서동아리 안내', href: './독서동아리 안내' },
					{ label: '독서동아리 자료', href: './독서동아리 자료' },
				],
			},
			{
				title: '범구민 책읽어주기 문화운동',
				href: './범구민 책읽어주기 문화운동',
			},
			{
				title: '북크로싱 센터',
				href: './북크로싱 센터',
			},
			{
				title: '영유아 전집 대여 사업',
				items: [
					{ label: '서비스 안내', href: './서비스 안내' },
					{ label: '서비스 신청', href: './서비스 신청' },
				],
			},
		],
	},

	안내마당: {
		title: '안내마당',
		sections: [
			{
				title: '공지사항',
				href: './공지사항',
			},
			{
				title: '이용안내',
				href: './이용안내',
			},
			{
				title: '도서관 일정',
				href: './도서관 일정',
			},
			{
				title: '회원대출규정',
				href: './회원대출규정',
			},
			{
				title: '신간희망자료',
				href: './신간희망자료',
			},
			{
				title: '디지털자료실',
				href: './디지털자료실',
			},
			{
				title: '학습열람실',
				href: './학습열람실',
			},
			{
				title: '천체투영관',
				href: './천체투영관',
			},
			{
				title: '도서관 유튜브',
				href: './도서관 유튜브',
			},
			{
				title: '도서관 소식지',
				href: './도서관 소식지',
			},
			{
				title: '연수구 지역서점',
				href: './연수구 지역서점',
			},
			{
				title: '부대시설',
				href: './부대시설',
			},
			{
				title: '자주하는 질문',
				href: './자주하는 질문',
			},
			// 외부 링크 예시 추가
			{
				title: '국가전자도서관',
				href: 'https://www.nl.go.kr',
				isExternal: true,
			},
			{
				title: '인천광역시 통합도서관',
				href: 'https://lib.incheon.go.kr',
				isExternal: true,
			},
		],
	},

	도서서비스: {
		title: '도서서비스',
		sections: [
			{
				title: '통합도서서비스',
				href: './통합도서서비스',
			},
			{
				title: '상호대차서비스',
				href: './상호대차서비스',
			},
			{
				title: '책바다서비스',
				href: './책바다서비스',
			},
			{
				title: '책나래서비스',
				href: './책나래서비스',
			},
			{
				title: '모바일도서관',
				href: './모바일도서관',
			},
			{
				title: '스마트도서관',
				href: './스마트도서관',
			},
			{
				title: '전자도서관',
				href: './전자도서관',
			},
			{
				title: '희망도서 신청',
				items: [
					{ label: '서비스 안내', href: './희망도서신청-서비스안내' },
					{ label: '서비스 신청', href: './희망도서신청-서비스신청' },
				],
			},
			{
				title: '희망전자책 신청',
				items: [
					{ label: '서비스 안내', href: './희망전자책신청-서비스안내' },
					{ label: '서비스 신청', href: './희망전자책신청-서비스신청' },
				],
			},
			{
				title: '무료택배도서대출',
				items: [
					{ label: '서비스 안내', href: './무료택배도서대출-서비스안내' },
					{ label: '서비스 신청', href: './무료택배도서대출-서비스신청' },
				],
			},
		],
	},

	열린참여마당: {
		title: '열린참여마당',
		sections: [
			{
				title: '도서관에 바란다',
				href: './도서관에 바란다',
			},
			{
				title: '자원봉사',
				href: './자원봉사',
			},
			{
				title: '도서관 견학',
				items: [
					{ label: '도서관 견학 안내', href: './도서관 견학 안내' },
					{ label: '도서관 견학 신청', href: './도서관 견학 신청' },
				],
			},
			{
				title: '도서기증',
				items: [
					{ label: '기증안내', href: './기증안내' },
					{ label: '서약서작성', href: './서약서작성' },
					{ label: '기증신청조회', href: './기증신청조회' },
				],
			},
			{
				title: '독서마라톤',
				items: [
					{ label: '독서마라톤 안내', href: './독서마라톤 안내' },
					{ label: '독서마라톤 참여', href: './독서마라톤 참여' },
				],
			},
			{
				title: '독서왕',
				items: [
					{ label: '독서왕 안내', href: './독서왕 안내' },
					{ label: '독서왕 참여', href: './독서왕 참여' },
				],
			},
			{
				title: '출석체크 이벤트',
				items: [
					{ label: '출석체크 안내', href: './출석체크 안내' },
					{ label: '출석하기', href: './출석하기' },
				],
			},
		],
	},

	문화마당: {
		title: '문화마당',
		sections: [
			{
				title: '문화행사 신청',
				href: './문화행사 신청',
			},
			{
				title: '프로그램 신청',
				href: './프로그램 신청',
			},
			{
				title: '영화상영',
				items: [
					{ label: '이용안내', href: './이용안내' },
					{ label: '상영작', href: './상영작' },
				],
			},
			{
				title: '대관안내',
				items: [
					{ label: '대관신청', href: './대관신청' },
					{ label: '공연장', href: './공연장' },
					{ label: '세미나실대관', href: './세미나실대관' },
					{ label: '커뮤니티룸대관', href: './커뮤니티룸대관' },
					{ label: '프로그램실', href: './프로그램실' },
					{ label: '독서토론실대관', href: './독서토론실대관' },
					{ label: '하늘빛정원대관', href: './하늘빛정원대관' },
					{ label: '동아리실대관', href: './동아리실대관' },
				],
			},
		],
	},

	도서관소개: {
		title: '도서관소개',
		sections: [
			{
				title: '인사말',
				href: './인사말',
			},
			{
				title: '연혁',
				href: './연혁',
			},
			{
				title: '상징',
				href: './상징',
			},
			{
				title: '조직도',
				href: './조직도',
			},
			{
				title: '자료현황',
				href: './자료현황',
			},
			{
				title: '구립도서관',
				items: [
					{ label: '송도국제도서관', href: './송도국제도서관' },
					{ label: '연수청학도서관', href: './연수청학도서관' },
					{ label: '연수꿈담도서관', href: './연수꿈담도서관' },
					{ label: '송도국제어린이도서관', href: './송도국제어린이도서관' },
					{ label: '해돋이도서관', href: './해돋이도서관' },
					{ label: '선학별빛도서관', href: './선학별빛도서관' },
					{ label: '동춘나래도서관', href: './동춘나래도서관' },
					{ label: '함박비류도서관', href: './함박비류도서관' },
				],
			},
			{
				title: '공립작은도서관',
				items: [
					{ label: '옥련1동작은도서관', href: './옥련1동작은도서관' },
					{ label: '옥련2동어린이작은도서관', href: './옥련2동어린이작은도서관' },
					{ label: '연수1동작은도서관', href: './연수1동작은도서관' },
					{ label: '송도2동작은도서관', href: './송도2동작은도서관' },
					{ label: '송도3동작은도서관', href: './송도3동작은도서관' },
					{ label: '송도5동작은도서관', href: './송도5동작은도서관' },
					{ label: '솔안공원작은도서관', href: './솔안공원작은도서관' },
					{ label: '해찬솔공원작은도서관', href: './해찬솔공원작은도서관' },
					{ label: '누리공원작은도서관', href: './누리공원작은도서관' },
					{ label: '문화공원 북크로싱 센터', href: './문화공원 북크로싱 센터' },
				],
			},
		],
	},

	나의도서관: {
		title: '나의도서관',
		sections: [
			{
				title: '내정보',
				href: './내정보',
			},
			{
				title: '모바일회원증',
				href: './모바일회원증',
			},
			{
				title: '정회원인증',
				href: './정회원인증',
			},
			{
				title: '대출현황',
				href: './대출현황',
			},
			{
				title: '대출이력',
				href: './대출이력',
			},
			{
				title: '일반예약현황',
				href: './일반예약현황',
			},
			{
				title: '상호대차현황',
				href: './상호대차현황',
			},
			{
				title: '희망도서신청현황',
				href: './희망도서신청현황',
			},
			{
				title: '희망전자책신청현황',
				href: './희망전자책신청현황',
			},
			{
				title: '내책장',
				href: './내책장',
			},
			{
				title: '행사신청 조회',
				href: './행사신청 조회',
			},
			{
				title: '프로그램신청 조회',
				href: './프로그램신청 조회',
			},
			{
				title: '견학신청 조회',
				href: './견학신청 조회',
			},
			{
				title: '대관신청 조회',
				items: [
					{ label: '공연장대관신청 조회', href: './공연장대관신청 조회' },
					{ label: '세미나실대관신청 조회', href: './세미나실대관신청 조회' },
					{ label: '커뮤니티룸대관신청 조회', href: './커뮤니티룸대관신청 조회' },
					{ label: '프로그램실대관신청 조회', href: './프로그램실대관신청 조회' },
					{ label: '독서토론실대관신청 조회', href: './독서토론실대관신청 조회' },
					{ label: '하늘빛정원대관신청 조회', href: './하늘빛정원대관신청 조회' },
					{ label: '동아리실대관신청 조회', href: './동아리실대관신청 조회' },
				],
			},
			{
				title: '영유아전집신청 조회',
				href: './영유아전집신청 조회',
			},
		],
	},

	회원서비스: {
		title: '회원서비스',
		sections: [
			{
				title: '도서검색',
				href: './도서검색',
			},
			{
				title: '사이트맵',
				href: './사이트맵',
			},
			{
				title: '개인정보처리방침',
				href: './개인정보처리방침',
			},
			{
				title: '회원서비스',
				items: [
					{ label: '로그인', href: './로그인' },
					{ label: '아이디찾기', href: './아이디찾기' },
					{ label: '비밀번호찾기', href: './비밀번호찾기' },
					{ label: '회원가입', href: './회원가입' },
				],
			},
			{
				title: "도서관 고양이 '관이'의 하루",
				href: "/도서관 고양이 '관이'의 하루",
			},
			{
				title: '열람실현황',
				href: './열람실현황',
			},
		],
	},

	기타: {
		title: '기타',
		sections: [
			{
				title: '사이트맵',
				href: './사이트맵',
			},
			{
				title: '개인정보처리방침',
				href: './개인정보처리방침',
			},
			{
				title: "도서관 고양이 '관이'의 하루",
				href: "/도서관 고양이 '관이'의 하루",
			},
			{
				title: '열람실현황',
				href: './열람실현황',
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
