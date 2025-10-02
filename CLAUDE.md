# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

##

영어로 먼저 번역 후 영어로 작성

## Development Commands

**Development**

- `npm run dev` - Start dev server with host binding
- `npm run dev:quiet` - Start dev server silently (no logs)
- `npm run dev:turbo` - Dev server + SCSS file watching
- `npm run dev:full` - Dev server + SCSS watching + file change monitoring
- `npm start` - Alias for `npm run dev`

**Build & Production**

- `npm run build` - Standard build with post-formatting
- `npm run build:clean` - Clean build (same as standard build)
- `npm run build:jsp` - Build with JSP compatibility (removes Astro attributes)
- `npm run preview` - Preview production build locally

**Testing**

- `npm test` or `npm run test` - Run Vitest tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

**Code Quality**

- `npm run format:src` - Format source files (Astro, TS, JS, SCSS)
- `npm run format:dist` - Format built files (HTML, CSS, JS)

**File Watching & Monitoring**

- `npm run watch:scss` - Watch SCSS files for changes (not yet implemented)
- `npm run watch:files` - Watch Astro/TS/JS files for changes (not yet implemented)

**Scripts & Utilities**

- `npm run remove-astro-attrs` - Remove Astro attributes for JSP compatibility
- `npm run update-guide` - Update project guide (placeholder - not implemented)
- `npm run setup-hooks` - Setup Git hooks (placeholder - not implemented)
- `npm run pre-commit` - Pre-commit hook (runs update-guide)
- `npm run sass` - Direct SCSS compilation with watch mode

## Architecture Overview

### Tech Stack

- **Framework**: Astro 2.10.15 (static site generation)
- **Styling**: SCSS with 7-1 architecture + BEM methodology
- **JavaScript**: **Vanilla JS only** (TypeScript prohibited)
- **State Management**: Nanostores for client-side state (configured but not actively used)
- **UI Library**: Swiper.js for sliders, jQuery for legacy features
- **Testing**: Vitest (configured but tests not implemented yet)
- **Special Requirements**: JSP compatibility mode via Astro attribute removal

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

**JavaScript Pattern**: Modular vanilla JS/jQuery hybrid approach. Legacy components use jQuery (comGnb.js), while newer components should use vanilla JS with data attributes for initialization.

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
3. **Component Reuse**: Always prefer existing UI components (UiSelect, UiInput, UiButton, etc.) - DO NOT create new components unless absolutely necessary
4. **BEM Methodology**: CSS follows Block__Element--Modifier pattern
5. **Responsive Design**: Mobile-first with specific breakpoints (900px, 1200px)
6. **HTTP Requests Forbidden**: No fetch/axios or HTTP client usage (publishing-only)
7. **No Auth Logic**: Authentication/authorization UI only, no real implementation

### Path Aliases

- `@` → `./src`
- `@components` → `./src/components`
- `@ui` → `./src/components/UI`
- `@layouts` → `./src/layouts`
- `@styles` → `./src/styles`

### Scripts Organization

- Individual feature scripts in `/public/assets/js/`
- jQuery-based legacy patterns (comGnb.js uses jQuery)
- Each script is self-contained and independently loadable
- Data-driven initialization with aria attributes for accessibility
- **No central LibraryCommon system implemented yet** - each module operates independently

### Available JavaScript Modules

```
public/assets/js/
├── collectAccordion.js # Accordion/collapsible components
├── collection.js       # Collection management features
├── collectionModal.js  # Collection-specific modals
├── comAccordian.js     # Common accordion functionality
├── comGnb.js          # Global navigation bar (jQuery-based)
├── comTab.js          # General tab components
├── leftMenu.js        # Left sidebar menu functionality
├── modal.js           # Modal dialog components
├── swiper.js          # Swiper slider integration
├── tagsCloud.js       # Tag cloud visualization
├── wordcloud2.js      # Word cloud library
├── main/
│   └── searchTab.js   # Search interface tabs
├── sub/
│   └── filter.js      # Search and content filtering
└── vendor/            # Third-party libraries
```

**Note**: No global `common.js` exists yet - each feature is self-contained with jQuery dependencies.

### Color System

**Primary Colors**:
- `$primary-color: #3c79c2` (Main blue)
- `$secondary-color: #063a74` (Dark blue)
- `$text-color: #333`
- `$border-color: #ecf2fe`

**Institution Colors** (연수구 도서관 시스템):
- `$institution-전체: #008f37`
- `$institution-연수꿈담: #a3cf62`
- `$institution-송도국제: #8e63aa`
- `$institution-청학: #7fa7d7`
- `$institution-해돋이: #ef6601`
- `$institution-해찬솔공원: #189ba7`
- `$institution-선학별빛: #ffacc1`
- `$institution-누리공원: #7b19d7`

### Component Conventions

**UiButton Variants**: primary, secondary, tertiary, darkBlue, darkGray, text, ghost
**UiButton Sizes**: xsmall, small, medium, large, xlarge

**Props Pattern** for UI components:
```astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  // Modal-specific data attributes
  'data-modal-open'?: string;
  'data-modal-close'?: boolean;
}
```

### Menu System

Menu configuration is centralized in `src/data/menuData.ts` with TypeScript interfaces but plain JS objects. The system supports:

- Multi-level navigation (2-3 depth)
- Expandable sections with `isExpanded` property
- Direct links via `href` or nested `items` arrays
- Dynamic menu type detection from URL paths

### Development Guidelines

1. **Always check existing components** before creating new ones
2. **Use BEM methodology** for CSS class naming
3. **Follow data-attribute pattern** for JavaScript functionality
4. **Implement proper ARIA attributes** for accessibility
5. **Use SCSS functions** (to-rem(), vw(), alpha()) consistently
6. **Mobile-first responsive design** with defined breakpoints
7. **No TypeScript** - use vanilla JavaScript with extensive comments
8. **Publishing-only** - no real backend integration or API calls

### Figma MCP Integration Guidelines

**Style Reuse Priority Policy**:
1. **First Priority**: Search and reuse existing styles from the codebase
   - Check existing components for similar UI patterns before creating new styles
   - Look for common form layouts, button styles, modal patterns, etc.
   - Prefer extending existing component variants over creating new ones
2. **Second Priority**: Create new styles only when no suitable existing styles are found
   - Follow established SCSS architecture (7-1 pattern)
   - Use existing design tokens (colors, typography, spacing)
   - Maintain consistency with existing UI patterns
3. **Common Form Design**: Design similar forms with shared/common components
   - Reuse existing form layouts and styling patterns
   - Standardize form validation, error states, and success states
   - Create reusable form sections for consistent user experience

### Build Configuration

**Astro Config Key Features**:
- `format: 'file'` - Generates `page.html` instead of `page/index.html`
- `assets: '_custom'` - Custom assets directory naming
- JSP compatibility mode via post-build attribute removal
- Path aliases configured for cleaner imports
- Dev toolbar disabled for cleaner development experience

**JSP Compatibility**:
- `npm run build:jsp` removes Astro-specific attributes from HTML
- Uses custom script (`scripts/format-tags.cjs`) for post-processing
- Ensures compatibility with JSP template systems

### Testing Strategy

**Current State**:
- Vitest configured but no tests implemented yet
- HTML beautification and Prettier formatting for consistent output
- Manual testing through development server

**Recommended Test Commands**:
- `npm run test:run` - Single test run (CI mode)
- `npm run test:watch` - Watch mode for development
- `npm run test:ui` - Visual test interface
- `npm run test:coverage` - Coverage reporting

### Korean Naming Conventions

This project uses Korean file names for pages to match the Korean library system:

**Page Naming Pattern**:
- Korean descriptive names: `소장도서검색.astro`, `통합검색.astro`, `내책장.astro`
- Service-specific pages: `무료택배도서대출-서비스신청.astro`
- Status/history pages: `대출현황.astro`, `희망도서신청현황.astro`

**Menu Data Structure**:
- Menu keys use Korean: `도서검색`, `디지털자료`, `문화프로그램`
- Institution colors mapped to Korean names: `$institution-연수꿈담`, `$institution-송도국제`
- Supports 3-level menu hierarchy with Korean labels

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
