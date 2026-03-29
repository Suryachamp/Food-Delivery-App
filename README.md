# 🍔 Premium Responsive Food Delivery App

A high-performance, mobile-first food delivery platform featuring a TikTok-style "Reel Feed" for discovering meals, seamless animations, and a premium "Phone Frame" desktop experience.

![Premium UI Showcase](https://raw.githubusercontent.com/Suryachamp/Food-Delivery-App/main/Frontend/src/assets/preview.png) *(Add your own screenshot here)*

## ✨ Key Features

### 📱 Premium Responsive Design
- **Mobile First**: Native-like experience on all mobile devices.
- **Desktop Phone-Frame**: Centered immersive layout for desktop/tablets with premium blurred backgrounds.
- **Framer Motion**: Fluid page transitions and interactive micro-animations.

### 🎥 Reel Discovery Feed
- **Auto-playing Reels**: Discover food through an infinite vertical video feed.
- **Interactive UI**: Double-tap to like, bookmark, and direct "Visit Store" navigation.
- **Skeleton Loaders**: Polished skeleton screens for a smooth loading experience.

### 🍱 Multi-Role Architecture
- **User Side**: Save favorite meals, browse local partners, and manage profiles.
- **Food Partner Side**: Dedicated dashboard for creating food reels and managing business analytics.
- **Auth System**: Secure JWT-based authentication with cookie-based session management.

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Modern utility-first architecture)
- **Animations**: Framer Motion
- **Icons**: Lucide React

**Backend:**
- **Server**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Media**: ImageKit / Multer for video handling
- **Security**: Bcrypt.js + JWT

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Suryachamp/Food-Delivery-App.git
   cd Food-Delivery-App
   ```

2. **Setup Backend:**
   ```bash
   cd Backend
   npm install
   # Create a .env file with your MONGO_URI and JWT_SECRET
   npm start
   ```

3. **Setup Frontend:**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

## 📐 Project Structure
```text
├── Backend/          # Express API & MongoDB Models
├── Frontend/         # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI pieces (BottomNav, ReelFeed)
│   │   ├── layouts/    # Responsive MainLayout wrapper
│   │   ├── pages/      # Route-level screens
│   │   └── context/    # Global State (Theme, Auth)
└── videos/           # Sample media assets
```

## 🤝 Contributing
Feel free to fork this project and submit PRs. Let's make food discovery more fun!

## 📄 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
