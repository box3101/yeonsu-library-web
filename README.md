# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   ├── assets/
│   │   └── images/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Gnb.astro
│   │   └── Header.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── sub.astro
│   └── styles/
│       ├── abstracts/          # 🛠️ Functions & Mixins
│       ├── variables/          # 🎨 Design Tokens
│       ├── utilities/          # ⚡ Atomic Classes
│       ├── components/         # 🧩 Component Styles
│       ├── pages/             # 📄 Page-specific Styles
│       ├── common.scss        # 🌐 Global Styles
│       └── main.scss          # 📦 Main Import File
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🎨 SCSS Architecture & Rules

이 프로젝트는 **SCSS 7-1 아키텍처**를 기반으로 구성되어 있습니다. AI 코딩 시 다음 규칙을 반드시 따라주세요.

### 📁 폴더 구조 및 역할

```scss
src/styles/
├── abstracts/          # 🛠️ 도구상자 (Functions & Mixins)
│   ├── _functions.scss # → to-rem(), vw(), alpha()
│   ├── _mixins.scss    # → flex, 반응형, 컴포넌트 믹스인
│   └── _index.scss     # → Forward 모든 abstracts
├── variables/          # 🎨 디자인 시스템 (Design Tokens)
│   ├── _colors.scss    # → 색상 팔레트
│   ├── _typography.scss # → 폰트 관련 변수
│   └── _layout.scss    # → 브레이크포인트, 간격
├── utilities/          # ⚡ 원자 단위 클래스 (Atomic Classes)
│   └── _flex.scss      # → .flex, .flex-center, .gap-10
├── components/         # 🧩 컴포넌트 스타일
│   ├── _header.scss    # → .header 관련 스타일
│   ├── _footer.scss    # → .footer 관련 스타일
│   └── _buttons.scss   # → .btn 관련 스타일
└── pages/             # 📄 페이지별 고유 스타일
    └── _home.scss     # → 홈페이지 전용 스타일
```

### 🎯 코딩 룰 (AI 필수 준수사항)

#### **1. 변수 사용 룰**

```scss
// ✅ 좋은 예
color: $primary-color;
font-size: to-rem(16);
margin: $spacing-md;

// ❌ 나쁜 예
color: #3b82f6;
font-size: 16px;
margin: 1rem;
```

#### **2. 믹스인 활용 룰**

```scss
// ✅ 좋은 예
@include flex-center;
@include mobile {
  font-size: to-rem(14);
}
@include shadow(2);

// ❌ 나쁜 예
display: flex;
justify-content: center;
align-items: center;
```

#### **3. 반응형 룰**

```scss
// ✅ 항상 믹스인 사용
.hero {
  font-size: to-rem(32);

  @include mobile {
    font-size: to-rem(24);
  }

  @include tablet {
    font-size: to-rem(28);
  }
}
```

#### **4. BEM 방법론**

```scss
// ✅ 컴포넌트는 BEM 사용
.header {
  &__logo {
  }
  &__nav {
  }
  &__menu {
    &--active {
    }
  }
}
```

### 🔧 사용 가능한 Functions & Mixins

#### **Functions**

```scss
to-rem(16)           // px → rem 변환
vw(320)             // px → vw 변환
alpha($color, 0.5)   // 색상 투명도
fluid-font(14, 18)   // 반응형 폰트
```

#### **Mixins**

```scss
// Flex 관련
@include flex($direction, $justify, $align) @include flex-center;
@include flex-between;
@include flex-column;

// 반응형
@include mobile {
} // max-width: 575px
@include tablet {
} // 576px ~ 991px
@include desktop {
} // min-width: 992px

// 컴포넌트
@include button($bg-color, $text-color);
@include shadow(1-3);
@include text-truncate;
```

### 📝 Import 규칙

```scss
// SCSS 파일 상단에 필요한 것만 import
@use '../abstracts' as *; // mixins/functions 필요시
@use '../variables/colors' as *; // 색상 변수 필요시
@use '../variables/layout' as *; // 브레이크포인트 필요시
```

### 🚫 금지 사항

- ❌ 하드코딩된 값 사용 금지 (`20px`, `#333333`)
- ❌ 중복 flex 코드 작성 금지 (믹스인 사용)
- ❌ 잘못된 파일 위치에 코드 작성 금지
- ❌ BEM 방법론 무시 금지

### 💡 AI 작업 체크리스트

1. **변수 확인**: 기존 변수가 있는지 먼저 체크
2. **믹스인 활용**: 반복 패턴은 믹스인 사용
3. **파일 위치**: 올바른 폴더에 코드 작성
4. **BEM 적용**: 컴포넌트는 BEM 방법론 사용
5. **반응형 고려**: 모바일 우선 반응형 작성

## 🤖 자동 Guide 업데이트

이 프로젝트는 커밋할 때 자동으로 `guide.astro`에 작업 내역을 추가하는 기능을 지원합니다.

### 🔧 초기 설정

```bash
# Git hooks 설정 (최초 1회만 실행)
npm run setup-hooks
```

### 📝 사용법

```bash
# 일반적인 Git 워크플로우
git add .
git commit -m "Footer 모바일 반응형 개선"

# 🎉 자동으로 guide.astro에 작업 내역이 추가됩니다!
```

### 🎯 자동 감지되는 작업 유형

- **Component**: UI 컴포넌트 수정 (`src/components/UI/`)
- **Style**: SCSS 스타일 개선 (`src/styles/`)
- **Page**: 페이지 파일 업데이트 (`src/pages/`)
- **Layout**: 레이아웃 컴포넌트 수정 (`src/layouts/`)
- **JavaScript**: 스크립트 기능 개선 (`public/assets/js/`)

### 🔧 수동 실행

필요시 수동으로도 실행 가능합니다:

```bash
# Guide.astro 수동 업데이트
npm run update-guide
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
