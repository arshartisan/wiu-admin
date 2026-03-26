# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GiftFlow Admin Dashboard — a React admin panel for the "WrapItUp" gift ordering and management system. Currently frontend-only with mock data (no backend/API).

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

No test runner or linter is configured.

## Architecture

**Stack:** React 19 + Vite 8, Tailwind CSS 3, React Router v7 (DOM), Recharts for charts, React Hook Form + Zod for forms, Sonner for toasts.

**Path alias:** `@` maps to `./src` (configured in `vite.config.js`).

**Routing:** `App.jsx` defines flat routes under a single `AppLayout` wrapper. All routes are siblings under `/` — no nested route groups. `/` redirects to `/dashboard`.

**Layout:** `AppLayout` renders a collapsible `Sidebar` + `Topbar` + `<Outlet>`. Sidebar collapse state is local `useState` in AppLayout.

**Component layers:**
- `src/components/ui/` — shadcn/ui primitives (Button, Dialog, Badge, etc.). These follow standard shadcn patterns with `class-variance-authority` for variants.
- `src/components/shared/` — reusable app-level components: `DataTable` (custom, not TanStack — handles search, sort, pagination, row selection), `StatsCard`, `DeleteDialog`, `FormField`.
- `src/components/layout/` — AppLayout, Sidebar, Topbar.
- `src/pages/` — one component per route (Dashboard, Orders, Payments, etc.).

**Data:** All data lives in `src/data/mockData.js` as exported arrays. No API calls, no state management library — pages import mock data directly.

**Styling:**
- Brand colors are defined in `tailwind.config.js` (warm terracotta palette: primary `#C1724F`).
- Fonts: Bricolage Grotesque (body), Playfair Display (headings), JetBrains Mono (monospace data).
- Custom utilities in `src/index.css`: `.animate-fade-up`, `.skeleton`, `.font-mono-data`.

## Key Patterns

- The custom `DataTable` component (not TanStack React Table) accepts `columns`, `data`, `renderCell`, `renderActions`, and `toolbar` props. Page size is hardcoded at 8.
- `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge), `formatCurrency()`, `formatDate()`, and `generateId()`.
- Icons come exclusively from `lucide-react`.
- The `.orchids/` directory contains the original project spec/prompt — reference it for intended page designs and feature details.
