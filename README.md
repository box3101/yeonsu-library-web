# 연수구립도서관 웹사이트 (~ing)

연수구립도서관 공식 웹사이트 프로젝트입니다. Astro 4.15.0을 기반으로 한 정적 사이트 생성 프로젝트입니다. 

## 🚀 DEMO URL

[연수그립 도서관 GUDIE 페이지]https://yeonsu-library-web.netlify.app/guide)

## 🚀 프로젝트 개요

### 기술 스택
- **프레임워크**: Astro 4.15.0 (정적 사이트 생성)
- **스타일링**: SCSS (7-1 아키텍처 + BEM 방법론)
- **JavaScript**: Vanilla JS (TypeScript 금지)
- **상태 관리**: Nanostores (클라이언트 사이드 상태)
- **UI 라이브러리**: Swiper.js (슬라이더)
- **테스팅**: Vitest (jsdom 환경)

### 프로젝트 구조
```
src/
├── components/
│   ├── UI/              # 재사용 가능한 UI 컴포넌트 (Ui 접두사)
│   ├── layout/          # 레이아웃 컴포넌트 (Header, Footer 등)
│   └── index.ts         # 중앙 컴포넌트 내보내기
├── layouts/             # 페이지 레이아웃 템플릿
├── pages/               # 라우트 기반 페이지
├── styles/              # SCSS 7-1 아키텍처
├── data/                # 정적 데이터 (menuData.ts)
└── stores/              # Nanostores 상태 관리
```

## 📋 주요 페이지

### 도서관 서비스
- **소장도서검색**: 도서관 소장 자료 검색
- **통합검색**: 통합 도서 검색 서비스
- **인기/신착/추천도서**: 도서 추천 시스템
- **스마트도서관비치도서**: 스마트도서관 도서 현황

### 사용자 서비스 (나의도서관)
- **대출현황**: 사용자 도서 대출 상태 조회
- **대출이력**: 과거 대출 기록 조회
- **예약현황**: 일반예약/상호대차 현황
- **희망도서/전자책 신청현황**: 신청 도서 현황
- **내책장**: 개인 서재 관리
- **행사신청 조회**: 도서관 행사 신청 현황
- **프로그램신청 조회**: 프로그램 참여 신청 현황
- **견학신청 조회**: 도서관 견학 신청 현황
- **대관신청 조회**: 시설 대관 신청 현황
- **영유아전집신청 조회**: 영유아 도서 신청 현황

### 커뮤니티
- **공지사항**: 도서관 공지사항
- **도서관에바란다**: 사용자 건의사항

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 16.x 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 프로젝트 클론
git clone [repository-url]
cd yeonsu-library-web/yeonsu

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

## 📚 개발 명령어

### 개발 환경
```bash
npm run dev          # 개발 서버 (호스트 바인딩)
npm run dev:quiet    # 개발 서버 (로그 없음)
npm run dev:turbo    # 개발 서버 + SCSS 파일 감시
npm run dev:full     # 개발 서버 + SCSS 감시 + 파일 변경 모니터링
npm start            # npm run dev 별칭
```

### 빌드 & 프로덕션
```bash
npm run build        # 표준 빌드 + 포스트 포매팅
npm run build:clean  # 클린 빌드 + 포매팅 + 후처리
npm run build:jsp    # JSP 호환 빌드 (Astro 속성 제거)
npm run preview      # 프로덕션 빌드 로컬 미리보기
```

### 테스팅
```bash
npm test             # Vitest 테스트 (감시 모드)
npm run test:ui      # 테스트 UI 인터페이스
npm run test:run     # 테스트 한 번 실행 (CI 모드)
npm run test:watch   # 테스트 감시 모드
npm run test:coverage # 테스트 커버리지 리포트
```

### 코드 품질
```bash
npm run format:src   # 소스 파일 포매팅 (Astro, TS, JS, SCSS)
npm run format:dist  # 빌드된 파일 포매팅 (HTML, CSS, JS)
```

### 파일 감시 & 모니터링
```bash
npm run watch:scss   # SCSS 파일 변경 감시
npm run watch:files  # Astro/TS/JS 파일 변경 감시
```

## 🎨 스타일링 시스템 (SCSS 7-1)

### 핵심 구조
```
styles/
├── variables/     # 색상, 타이포그래피, 레이아웃 상수
├── abstracts/     # 함수 및 믹스인
├── utilities/     # 원자적 유틸리티 클래스
├── components/    # 컴포넌트별 스타일 (BEM 방법론)
└── pages/         # 페이지별 스타일
```

### 주요 SCSS 함수
- `to-rem()`: px를 rem으로 변환 (폰트, 패딩, 마진 필수)
- `vw()`: 반응형 크기 계산 (1920px 기준)
- `alpha()`: 색상 투명도 조정

### 반응형 디자인
- **모바일**: px 직접 사용 (to-rem() 사용 안 함)
- **브레이크포인트**: 900px, 1200px
- **모바일 우선** 접근법

## 🧩 컴포넌트 아키텍처

### UI 컴포넌트
모든 재사용 가능한 컴포넌트는 `Ui` 접두사 사용:
- `UiButton`, `UiSelect`, `UiInput`, `UiTable` 등
- 새로운 컴포넌트 생성보다 기존 UI 컴포넌트 재사용 우선

### 레이아웃 시스템
- `BaseLayout.astro`: 핵심 HTML 구조 (Header/Footer)
- `Layout.astro`: 표준 페이지 레이아웃
- `SearchLayout.astro`: 검색 전용 레이아웃
- `SubLayout.astro`: 서브 페이지 레이아웃

### JavaScript 패턴
- **모듈식 Vanilla JS**: 기능 등록 시스템
- **데이터 속성 기반**: `data-*` 속성으로 기능 초기화
- **중앙 등록**: `LibraryCommon.features`를 통한 관리

## 🔧 중요한 제약사항

1. **퍼블리싱 전용 프로젝트**: 백엔드 API 통합 없음, 서버 사이드 로직 없음
2. **Vanilla JS 전용**: TypeScript 사용 금지 (.cursorrules에 명시)
3. **컴포넌트 재사용**: 기존 UI 컴포넌트 우선 사용
4. **BEM 방법론**: CSS는 Block__Element--Modifier 패턴
5. **HTTP 요청 금지**: fetch/axios 등 HTTP 클라이언트 사용 금지
6. **인증 로직 없음**: 인증/권한 UI만 구현, 실제 구현 없음

## 📂 경로 별칭

```javascript
'@' → './src'
'@components' → './src/components'
'@ui' → './src/components/UI'
'@layouts' → './src/layouts'
'@styles' → './src/styles'
```

## 🔍 JavaScript 모듈

```
public/assets/js/
├── common.js           # 핵심 LibraryCommon + 전역 초기화
├── accordion.js        # 아코디언/접을 수 있는 컴포넌트
├── collection.js       # 컬렉션 관리 기능
├── filter.js          # 검색 및 콘텐츠 필터링
├── mobile-menu.js      # 모바일 네비게이션 메뉴
├── modal.js           # 모달 다이얼로그 컴포넌트
├── search-tabs.js      # 검색 인터페이스 탭
├── swiper.js          # Swiper 슬라이더 통합
└── tab.js             # 일반 탭 컴포넌트
```

## 🚨 중요 참고사항

- 새 파일 생성은 절대적으로 필요한 경우에만
- 항상 기존 파일 편집 우선
- 문서 파일(*.md)이나 README 파일을 자발적으로 생성 금지
- 사용자가 명시적으로 요청한 경우에만 문서 파일 생성

## 📄 라이선스

연수구립도서관 공식 웹사이트 프로젝트
