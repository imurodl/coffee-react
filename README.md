# Amaya Frontend ☕️

Storefront for **Amaya Roasting Co.**, a specialty-coffee e-commerce platform.
A React single-page app with product browsing, cart and checkout, member
accounts, order tracking, and real-time updates.

🔗 **Live site**: [https://amaya.uz](https://amaya.uz)
🔗 **API**: [https://api.amaya.uz](https://api.amaya.uz) ([backend repo](https://github.com/imurodl/coffee))
🛠️ Built with **React**, **TypeScript**, **Redux Toolkit**, and **MUI**

---

## 🚀 Features

- Product catalog with collections, search, and pagination
- Product detail pages with related items
- Cart and order flow (Paused → Process → Finished)
- Member accounts and profile management
- Real-time updates via Socket.IO
- Responsive layout for desktop and mobile

---

## 🧱 Tech Stack

- **Framework**: React (Create React App)
- **Language**: TypeScript
- **State**: Redux Toolkit + React-Redux
- **UI**: MUI (Material UI)
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
yarn start

# Build for production (outputs to ./build)
yarn build
```

---

## 🌱 Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=https://api.amaya.uz
```

See `.env.example` for reference.

---

## ✨ Author

Built by [@imurodl](https://github.com/imurodl)
