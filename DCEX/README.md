# ⚡ DCEX - High-Performance Decentralized Exchange

DCEX is a modern, full-stack Decentralized Exchange (DEX) platform built on the **Solana** blockchain. It provides a seamless interface for users to manage assets, swap tokens, and monitor their portfolio with institutional-grade performance and a premium user experience.

---

## ✨ Key Features

- **🔐 Google Authentication**: Secure and frictionless login powered by Google OAuth.
- **🛡️ Solana Wallet Integration**: Automatic creation and management of Solana wallets for every user.
- **💰 Multi-Asset Support**: Support for both on-chain Solana assets (SOL/SPL) and off-chain INR balance tracking.
- **🔄 Instant Swaps**: High-speed token swaps leveraging the Solana ecosystem.
- **📊 Real-time Dashboard**: A comprehensive view of user profiles, balances, and transaction capabilities.
- **🎨 Premium UI/UX**: Crafted with React, Tailwind CSS, and GSAP for fluid animations and a modern look.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State/Routing**: [React Router Dom](https://reactrouter.com/) (v7)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [Passport.js](https://www.passportjs.org/) & Google OAuth 2.0

### Blockchain
- **Network**: Solana
- **Libraries**: `@solana/web3.js`, `@solana/spl-token`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance
- Google Cloud Console Project (for OAuth credentials)

### 📂 Repository Structure
```text
DCEX/
├── backend/    # Express server & Prisma schema
└── src/        # React frontend source
```

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/DCEX.git
   cd DCEX
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file based on the environment variables section below
   npx prisma migrate dev
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ..
   npm install
   # Create a .env file
   npm run dev
   ```

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/dcex_db"
JWT_SECRET="your_jwt_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### Frontend (`/.env`)
```env
VITE_GOOGLE_CLIENT_ID="your_google_client_id"
VITE_API_URL="http://localhost:3000"
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

---

<p align="center">Made with ❤️ for the Solana Ecosystem</p>