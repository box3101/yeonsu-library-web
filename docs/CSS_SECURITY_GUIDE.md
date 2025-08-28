# CSS 무결성 검증 가이드

## 현재 상태

### ✅ 완료된 항목
1. **인라인 스타일 제거**: 모든 스타일이 외부 CSS 파일로 분리됨
2. **로컬 CSS 파일**: 프로젝트 내부 CSS 파일들은 자체 제작으로 안전함
   - `main.css` (SCSS 컴파일 결과)
   - `vendor/swiper.css` (공식 Swiper 라이브러리)
   - `vendor/aos.css` (공식 AOS 라이브러리)

### ⚠️ 수정된 항목  
1. **위험한 CDN 제거**: `cdn.rawgit.com` (deprecated) → Google Fonts로 대체
2. **안전한 폰트 로딩**: `preconnect`, `crossorigin` 속성 추가

## SRI (SubResource Integrity) 적용 방법

### CDN 사용시 권장사항

```html
<!-- ❌ 위험한 방법 -->
<link rel="stylesheet" href="https://unpkg.com/library@1.0.0/dist/style.css" />

<!-- ✅ 안전한 방법 -->
<link 
  rel="stylesheet" 
  href="https://unpkg.com/library@1.0.0/dist/style.css"
  integrity="sha384-hash값여기에입력"
  crossorigin="anonymous"
/>
```

### 현재 프로젝트 권장사항

1. **로컬 파일 사용 우선**: 현재처럼 vendor 파일들을 로컬에 저장하여 사용
2. **신뢰할 수 있는 CDN 사용**: Google Fonts, jsDelivr, cdnjs 등
3. **SRI 해시 생성**: https://www.srihash.org/ 사용

## 보안 체크리스트

- [x] 인라인 스타일 제거
- [x] 로컬 CSS 파일 사용 (자체 제작)
- [x] 위험한 CDN 제거 (rawgit 등)
- [x] 안전한 CDN 사용 (Google Fonts)
- [x] crossorigin 속성 추가
- [ ] SRI 해시 적용 (CDN 사용시)

## 추가 권장사항

1. **정기적인 라이브러리 업데이트**
2. **알려진 취약점 체크** (npm audit 등)
3. **CSP(Content Security Policy) 설정** (서버 레벨)