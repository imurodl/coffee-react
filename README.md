# Amaya Frontend ☕️

Storefront for **Amaya Roasting Co.**, a specialty-coffee e-commerce platform.
A React single-page app with product browsing, cart and checkout, member
accounts, order tracking, and real-time updates.

🔗 **Live site**: [https://amaya.uz](https://amaya.uz)
🔗 **API**: [https://api.amaya.uz](https://api.amaya.uz) ([backend repo](https://github.com/imurodl/coffee))
🛠️ Built with **React 18**, **TypeScript**, **Vite**, **Redux Toolkit**, and **MUI**

---

## 🚀 Features

- Product catalog with collections, search, and pagination
- Product detail pages with related items
- Cart and order flow (Paused → Process → Finished)
- Member accounts and profile management
- Real-time updates via Socket.IO
- Responsive layout for desktop and mobile
- Route-level code-splitting with an error boundary and loading fallback

---

## 🧱 Tech Stack

- **Build tool**: Vite 5
- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router v6
- **State**: Redux Toolkit + React-Redux
- **UI**: MUI (Material UI v5) + Emotion
- **HTTP**: Axios
- **Realtime**: Socket.IO client
- **Deployment**: Static build served by nginx on OCI

---

## ⚙️ Getting Started

```bash
# Clone the repository
git clone https://github.com/imurodl/coffee-react.git
cd coffee-react

# Install dependencies
yarn install

# Start the dev server (http://localhost:3000)
yarn dev

# Type-check without emitting
yarn typecheck

# Build for production (outputs to ./build)
yarn build

# Preview the production build locally
yarn preview
```

---

## 🌱 Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=https://api.amaya.uz
```

The `REACT_APP_API_URL` name is preserved from the pre-Vite (Create React App)
setup and shimmed into `process.env` via `define` in `vite.config.ts`, so no
source changes were needed during the migration. See `.env.example` for
reference.

---

## 🚢 Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`:

1. **check** — installs deps and runs `yarn build` (fails the pipeline on a broken build).
2. **deploy** — SSHes into OCI, hard-resets to `origin/master`, reinstalls, rebuilds
   in place, and verifies `https://amaya.uz` responds. nginx serves the `./build` directory.

---

## ✨ Author

Built by [@imurodl](https://github.com/imurodl)
