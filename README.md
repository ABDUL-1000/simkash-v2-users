# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
Project Architectural Guidelines & Coding Standards
1. Unified Page Headers
Always use PageHeader: Never write custom flexbox wrappers for page titles. Use the standard @/components/.../PageHeader component.

Configure actions declaratively: Route navigation, export triggers, and CTA buttons must be passed into the actions array (PageHeaderAction[]) using proper variants (default, outline, destructive, ghost).

Live badges/companion bars: Place badges, period dropdowns, or view switchers either directly alongside the title/action slots or in a clean sub-bar immediately underneath PageHeader.

2. Standardized Tables & Data Display
Use the Generic Reusable Table: Never write bare HTML <table> elements. Always implement or consume the shared Ant Design table component (DataTable.tsx).

Built-in standards for tables:

Top-level controls: Integrated search input slot (onSearch), filter slots (extraFilters), and action slots (headerRight).

Explicit columns: Use typed ColumnsType<T> with custom cells for status tags, money formatting, and progress indicators.

Interactive rows: Provide onRowClick handlers for detail modals/drawers.

Built-in pagination: Support responsive, clean pagination controls matching our design system.

3. Strict Theme & Color Tokens (colors.ts)
No hardcoded arbitrary color hexes: Do not hardcode random hex values in inline styles or raw strings unless referencing our exact constants.

Import from colors.ts: All text, borders, backgrounds, tag badges, and status colors must strictly use the design tokens exported in @/constants/colors (or project equivalent colors.ts).

Primary / Accent Blue: colors.primary (#2563EB)

Primary Dark / Text Dark: colors.textPrimary (#0F152A / #0F1F36)

Text Muted / Subtext: colors.textSecondary (#64748B / #8C909B)

Border Colors: colors.border (#E2ECF6)

Success / Green: colors.success (#10B981)

Warning / Amber: colors.warning (#F59E0B / #D97706)

Danger / Red: colors.danger (#EF4444)

4. Component Splitting & Maintainability (No Giant Files)
Single Responsibility Principle: Keep files under ~200–250 lines of code.

Granular folder structure for every domain:

Plaintext
[feature-module]/
├── components/       # Metric cards, filter bars, charts, list views, sub-tables
├── modals/           # Dialogs, drawers, confirmation popups, success states
├── pages/            # Root route pages only (scaffolding, layout, and orchestration)
└── types/            # Dedicated TypeScript types, interfaces, and enums
Break complex pages into small, testable sub-components:

Extract stat cards to ...StatsCard.tsx

Extract filters to ...FilterBar.tsx

Extract matrix/tables to ...Table.tsx

Keep root pages focused only on state management, modal visibility, and data queries.

5. Modals, Success Modals & Precise Wiring
Reusable Modal Wrapper: Always build dialogs on top of the shared base Modal component rather than creating custom fixed overlay divs.

Success Feedback: Every modal that performs an action (sending reminders, distributing stock, exporting data, updating configurations) must link to a confirmed state or display a reusable SuccessModal.

Button-to-Modal Wiring:

Every trigger button (onClick) must be strictly wired to open its intended modal.

Ensure selected record state (e.g., selectedAp, selectedPeriod, selectedActivation) is correctly set before opening the modal.

Close modals cleanly and reset tracking state on cancellation or completion.

6. Mobile Responsiveness First
Adaptive layouts:

Flex wrappers: Always use flex-col sm:flex-row or flex-col md:flex-row.

Grid layouts: Use grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 for stat card grids.

Headers and action buttons: Wrap button groups with flex-wrap and ensure full-width buttons collapse gracefully on mobile (w-full sm:w-auto).

Ant Design Table Responsiveness:

Wrap tables in horizontally scrollable containers or set scroll={{ x: 'max-content' }} so columns never compress awkwardly on small mobile viewports.

Touch-friendly targets: Ensure buttons, pills, and clickable row elements maintain a minimum touch target size (min-h-[38px] or py-2) with comfortable spacing.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
