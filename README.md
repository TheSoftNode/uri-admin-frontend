# URI Social — Admin Console

Operations console for the URI Social platform: users, billing, agencies, content
moderation, Jane Ads campaigns, market listening, platform alerts and system health.

> **Status:** frontend only. Every screen renders from typed fixtures behind a
> server-side query function, so wiring the backend means replacing one function
> per feature — no component changes.

## Stack

| Concern   | Choice                                                                              |
| --------- | ----------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prefetching, Turbopack)           |
| Language  | TypeScript (strict)                                                                 |
| UI        | shadcn/ui (Radix primitives) + Tailwind CSS v4 design tokens                        |
| Motion    | Framer Motion, respecting `prefers-reduced-motion`                                  |
| Tables    | TanStack Table v8                                                                   |
| Forms     | React Hook Form + Zod                                                               |
| Theming   | `next-themes` (light default, dark supported)                                       |
| Fonts     | Urbanist, Fraunces, JetBrains Mono — self-hosted via Fontsource + `next/font/local` |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /overview
```

| Script                              | Purpose                                          |
| ----------------------------------- | ------------------------------------------------ |
| `pnpm dev`                          | Development server                               |
| `pnpm build` / `pnpm start`         | Production build and server                      |
| `pnpm typecheck`                    | `tsc --noEmit`                                   |
| `pnpm lint`                         | ESLint (Next core-web-vitals + TypeScript rules) |
| `pnpm format` / `pnpm format:check` | Prettier with Tailwind class sorting             |

Requires Node.js ≥ 20.9.

## Project structure

```
src/
├── app/                        # Routing only — pages compose features, nothing else
│   ├── (auth)/                 # Public route group: centred auth layout
│   │   └── login/
│   ├── (console)/              # Authenticated route group: the console shell
│   │   ├── layout.tsx          # Fixed sidebar + sticky top bar; only content scrolls
│   │   ├── template.tsx        # Per-route enter transition
│   │   ├── loading.tsx         # Skeleton shown while dynamic sections stream
│   │   ├── error.tsx           # Section-level error boundary
│   │   └── <section>/page.tsx  # One folder per console section
│   ├── layout.tsx              # Root: fonts, providers, metadata
│   └── globals.css             # Design tokens (light + dark) and base styles
│
├── features/                   # Vertical slices — one folder per domain
│   └── <feature>/
│       ├── api/                # Server-only, cached data access ("use cache")
│       ├── components/         # UI owned by this feature
│       ├── data/               # Fixtures matching the planned API payloads
│       ├── schemas.ts          # (where needed) Zod validation
│       └── types.ts            # Domain types for the feature
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (generated style, owned code)
│   ├── layout/                 # Shell: sidebar, top bar, nav, theme toggle, user menu
│   ├── data-display/           # Stat cards, data table, badges, callouts, meters
│   ├── charts/                 # Animated SVG charts (area, bar, gauge, sparkline)
│   └── motion/                 # Reusable motion primitives (stagger, count-up, transitions)
│
├── config/                     # Navigation and site configuration
├── hooks/                      # Shared React hooks
├── lib/                        # Framework-agnostic utilities (format, motion tokens, tones)
│   └── api/                    # Cache tags and (later) the HTTP client
├── providers/                  # Client providers composed once in AppProviders
└── types/                      # Cross-feature types (tones, KPIs, integrations)
```

### Conventions

- **Routes stay thin.** `app/**/page.tsx` fetches through a feature's `api/` function
  and composes that feature's components. Business UI never lives in `app/`.
- **Features don't import each other.** Shared pieces are promoted to `components/`,
  `lib/` or `types/`.
- **Server first.** Components are Server Components unless they need state, effects,
  browser APIs or animation; client boundaries are pushed as far down as possible
  (e.g. a table's column definitions, not the page).
- **Semantic tones, not colours.** Domain data carries a `Tone`
  (`neutral | brand | info | success | warning | critical`); the theme decides colour.
  This keeps light and dark modes correct by construction.
- **Data access is cached and tagged.** Each `api/get-*.ts` uses `"use cache"`,
  `cacheLife` and a tag from `lib/api/cache.ts`, so mutations can call
  `updateTag(...)` to refresh every view reading that resource. Live surfaces (alerts,
  audit log, system health) use a seconds-long lifetime and stream behind `loading.tsx`.
- **One motion language.** Durations and easings come from `lib/motion.ts`; charts draw
  in, lists stagger, the active nav pill and theme toggle slide with a shared spring.
- **No rule lines.** Rows and lists separate with spacing and hover tint; tables use a
  tinted header bar. Charts have no gridlines.

## Connecting the backend

1. Add an HTTP client in `src/lib/api/` (base URL from `NEXT_PUBLIC_API_BASE_URL`).
2. In each `src/features/<feature>/api/get-*.ts`, replace the fixture return with the
   real request (marked `TODO(api)`), keeping the return type.
3. For authenticated, per-user data, read the session in the query and keep the call
   inside a `<Suspense>` boundary (the console's `loading.tsx` already provides one).
4. Implement mutations as Server Actions next to the feature, then call
   `updateTag(cacheTags.<resource>)`.
5. Wire `src/features/auth` to the password + TOTP endpoints (marked `TODO(auth)`) and
   add a `proxy.ts` that redirects unauthenticated requests to `/login`.

## Adding shadcn/ui components

`components.json` is configured for this project, so the CLI works as usual:

```bash
pnpm dlx shadcn@latest add <component>
```

Existing primitives in `src/components/ui` were authored in the shadcn format and
restyled to the console's tokens; review diffs before overwriting them.

## Design

The current visual design is an interim baseline taken from the design canvas and will
be refined. The token layer in `globals.css` and the primitives in `components/` are
the intended levers: restyling should happen there rather than in feature code.
