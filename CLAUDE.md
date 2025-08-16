# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development**
- `npm run dev` - Start dev server with host binding
- `npm run dev:turbo` - Dev server + SCSS file watching
- `npm run dev:full` - Dev server + SCSS watching + file change monitoring

**Build & Production**
- `npm run build` - Standard build with post-formatting
- `npm run build:clean` - Clean build with formatting and post-processing
- `npm run build:jsp` - Build with JSP compatibility (removes Astro attributes)

**Testing**
- `npm test` or `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Generate test coverage

**Code Quality**
- `npm run format:src` - Format source files (Astro, TS, JS, SCSS)
- `npm run format:dist` - Format built files (HTML, CSS, JS)

## Architecture Overview

### Tech Stack
- **Framework**: Astro 4.15.0 (static site generation)
- **Styling**: SCSS with 7-1 architecture + BEM methodology
- **JavaScript**: **Vanilla JS only** (TypeScript prohibited per .cursorrules)
- **State Management**: Nanostores for client-side state
- **UI Library**: Swiper.js for sliders
- **Testing**: Vitest with jsdom environment

### Project Structure
```
src/
├── components/
│   ├── UI/              # Reusable UI components (Ui prefix)
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   └── index.ts         # Central component exports
├── layouts/             # Page layout templates
├── pages/               # Route-based pages
├── styles/              # SCSS 7-1 architecture
├── data/                # Static data (menuData.ts)
└── stores/              # Nanostores state management
```

### Component Architecture

**UI Components**: All reusable components use `Ui` prefix (UiButton, UiSelect, UiInput, etc.). The project emphasizes reusing existing UI components rather than creating new ones.

**Layout System**: 
- `BaseLayout.astro` - Core HTML structure with Header/Footer
- `Layout.astro` - Standard page layout  
- `SearchLayout.astro` - Search-specific layout
- `SubLayout.astro` - Sub-page layout

**JavaScript Pattern**: Modular vanilla JS with feature registration system. Each feature registers with `LibraryCommon.features` and uses data attributes for initialization.

### Styling System (SCSS 7-1)

**Core Structure**:
- `variables/` - Colors, typography, layout constants
- `abstracts/` - Functions (to-rem(), vw(), alpha()) and mixins
- `utilities/` - Atomic utility classes (flex, spacing, typography, width)
- `components/` - Component-specific styles using BEM methodology

**Key SCSS Functions**:
- `to-rem()` - Convert px to rem (required for fonts, padding, margins)
- `vw()` - Responsive size calculation (1920px base)
- `alpha()` - Color transparency adjustment
- **Mobile**: Use px directly, NOT to-rem()

**Utility Classes**: Tailwind-style utilities for flex, spacing, width, and typography.

### Data Attribute JavaScript Pattern

Components use data attributes for functionality:
```html
<button data-menu-toggle="menu-1" aria-expanded="false">Toggle</button>
<div data-menu-content="menu-1" aria-hidden="true">Content</div>
```

Each feature auto-registers with LibraryCommon and initializes based on selectors.

### Important Constraints

1. **Publishing-Only Project**: No backend API integration, no server-side logic, no real form submissions
2. **Vanilla JS Only**: TypeScript usage is explicitly prohibited
3. **Component Reuse**: Always prefer existing UI components (UiSelect, UiInput, UiButton, etc.)
4. **BEM Methodology**: CSS follows Block__Element--Modifier pattern
5. **Responsive Design**: Mobile-first with specific breakpoints (900px, 1200px)

### Path Aliases
- `@` → `./src`
- `@components` → `./src/components`
- `@ui` → `./src/components/UI`
- `@layouts` → `./src/layouts`
- `@styles` → `./src/styles`

### Scripts Organization
- Individual feature scripts in `/public/assets/js/`
- Central registration via `LibraryCommon.features`
- Selective loading based on page requirements
- Data-driven initialization with aria attributes for accessibility