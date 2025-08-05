# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server at localhost:3000
- `npm run dev:turbo` - Development with SCSS file watching
- `npm run dev:full` - Development with both SCSS and file watching
- `npm run build` - Build production site with formatting
- `npm run build:clean` - Build with formatting and post-build cleanup
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Code Quality
- `npm run format:src` - Format source files with Prettier
- `npm run format:dist` - Format distribution files

### File Watching
- `npm run watch:scss` - Watch SCSS files for changes
- `npm run watch:files` - Watch Astro/TS/JS files for changes

## Architecture Overview

### Framework & Tech Stack
- **Astro 4.15.0** - Static site generator with component-based architecture
- **TypeScript** - Type-safe development with strictest configuration
- **SCSS** - CSS preprocessing with 7-1 architecture
- **Vitest** - Unit testing framework with jsdom environment
- **Prettier** - Code formatting

### Path Aliases
The project uses path aliases configured in both `astro.config.mjs` and `tsconfig.json`:
- `@/*` → `src/*`
- `@components` → `src/components`
- `@ui/*` → `src/components/ui/*`
- `@styles/*` → `src/styles/*`
- `@layouts/*` → `src/layouts/*`

### SCSS Architecture (7-1 Pattern)

The project follows strict SCSS architectural rules:

#### File Structure
```
src/styles/
├── abstracts/          # Functions & Mixins
├── variables/          # Design tokens (colors, typography, layout)
├── utilities/          # Atomic utility classes
├── components/         # Component-specific styles
├── pages/             # Page-specific styles
├── common.scss        # Global styles
└── main.scss          # Main import file
```

#### Critical SCSS Rules
1. **Always use variables instead of hardcoded values**: `$primary-color` not `#3b82f6`
2. **Use functions for units**: `to-rem(16)` not `16px`
3. **Use mixins for repetitive patterns**: `@include flex-center` not manual flex properties
4. **Follow BEM methodology** for component naming
5. **Use responsive mixins**: `@include mobile { }`, `@include tablet { }`, `@include desktop { }`

#### Available Functions
- `to-rem($px)` - Convert px to rem
- `vw($px, $base: 1920)` - Convert px to vw
- `alpha($color, $opacity)` - Add transparency to colors
- `fluid-font($min-size, $max-size)` - Responsive font sizing

#### Available Mixins
- `@include flex($direction, $justify, $align, $wrap)`
- `@include flex-center`, `@include flex-between`, `@include flex-column`
- `@include mobile { }`, `@include tablet { }`, `@include desktop { }`
- `@include button($bg-color, $text-color)`
- `@include shadow(1-3)`
- `@include text-truncate`

### Component Architecture

#### Component Export Pattern
All UI components are centrally exported from `src/components/index.ts`:
```typescript
export { default as UiRadio } from './UiRadio.astro';
export { default as UiSelect } from './UiSelect.astro';
export { default as UiNavButton } from './UiNavButton.astro';
```

#### Layout System
- `BaseLayout.astro` - Core HTML structure
- `Layout.astro` - Page-specific layout wrapper

### Development Configuration

#### Server Settings
- Development server runs on port 3000
- HMR (Hot Module Replacement) on port 3001
- Source maps enabled for both development and production
- File watching optimized with polling disabled

#### Build Configuration
- File-based routing
- Assets prefixed with `./` for relative paths
- Rollup optimizations for CSS/JS output organization
- Production builds include source maps

### Testing Setup
- Vitest with jsdom environment
- Global test utilities available
- Setup file: `src/test/setup.ts`
- Test files: `src/**/*.{test,spec}.{js,ts}`

## Important Notes

### SCSS Development Rules
- **NEVER** use hardcoded pixel values or hex colors
- **ALWAYS** import required abstracts: `@use '../abstracts' as *;`
- **MUST** follow BEM naming for components
- **REQUIRED** to use responsive mixins for breakpoints

### File Watching
- SCSS changes are monitored via chokidar
- Use `npm run dev:turbo` for optimal SCSS development experience
- File changes trigger automatic rebuilds with HMR

### Code Quality
- TypeScript strict mode enabled
- Prettier formatting enforced
- Source maps available in both dev and production