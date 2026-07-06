# CLAUDE.md — Amaya Frontend (coffee-react)

Storefront SPA for Amaya Roasting Co. Companion backend: the `coffee` repo.

## Stack
- Vite 5 + React 18 + TypeScript
- React Router v6 (`react-router-dom@6`)
- Redux Toolkit + React-Redux for state
- MUI v5 (`@mui/material`, `@mui/icons-material`, `@mui/lab`) + Emotion for styling
- Axios for HTTP, Socket.IO client for realtime, SweetAlert2 for dialogs, Swiper for carousels

## Commands
- `yarn dev` / `yarn start` — dev server on :3000
- `yarn build` — production build to `./build` (the path nginx serves)
- `yarn preview` — serve the built bundle
- `yarn typecheck` — `tsc --noEmit` (note: currently reports pre-existing errors
  from the `process.env` shim; not in the deploy path since `vite build` uses esbuild)
- `yarn test` — `vitest run` (unit tests for pure logic, e.g. `src/lib/cart.ts`)

## Layout
- `src/app/screens/` — page components (homePage, productsPage, ordersPage, userPage, …)
- `src/app/components/` — shared UI
- `src/app/services/` — API clients (MemberService, ProductService, OrderService)
- `src/app/context/SocketContext.tsx` — Socket.IO connection
- `src/app/store.ts` — Redux store; slices colocated with screens
- `src/lib/` — `config.ts` (serverApi + Messages), `data/`, `datetime.ts`, types
- `public/` — static assets (img, video); served at web root `/`

## Environment / config gotchas
- API base URL comes from `REACT_APP_API_URL`. This is a **CRA-era name kept on purpose**:
  `vite.config.ts` shims both `process.env.REACT_APP_API_URL` and `process.env.PUBLIC_URL`
  via `define` + `loadEnv`. Do NOT switch code to `import.meta.env` piecemeal — either
  keep the shim or migrate every usage at once.
- `process.env.PUBLIC_URL` is defined as `""` (Vite serves `public/` at `/`), so asset
  paths like `/video/amaya-ads.mp4` and `/img/event-1.png` resolve correctly.
- `import.meta.env.PROD` is used directly in `store.ts` (Vite-native) — that's fine.

## Deployment
- Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`).
- `check` job builds; `deploy` job SSHes to OCI (`ubuntu@141.147.164.154`),
  `git reset --hard origin/master`, reinstalls with yarn 1.22.22 via corepack, rebuilds
  in place at `/home/max/amaya-project/coffee-react`, then curls `https://amaya.uz`.
- nginx serves the `build/` directory. No process restart needed (static).
- Secrets: `OCI_HOST`, `OCI_USER`, `OCI_SSH_KEY`, optional `REACT_APP_API_URL`.

## Conventions
- No emojis in code/commits. No `Co-Authored-By` in commits.
- Don't add comments/types to code you didn't change.
- Commit prefixes in use: `feat`, `fix`, `perf`, `a11y`, `refactor`, `build`, `seo`,
  `security`, `robustness`, `polish`, `ci`, `chore`, `docs`.
