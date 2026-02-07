# 🛍️ Mitul's Market - Premium E-Commerce Experience

[![Status](https://img.shields.io/badge/Status-Ultra--Attractive-brightgreen)](https://github.com/mitulaghara/Mitul-s-Market-E-Commerce)
[![Live Demo](https://img.shields.io/badge/Demo-Live-blue)](http://localhost:5173)

Welcome to **Mitul's Market**, a high-end, full-stack e-commerce platform designed for a premium shopping experience. Featuring an ultra-attractive UI, real-time interactions, and a seamless checkout flow.

---

## ✨ Features

### 🎨 **Ultra-Premium UI/UX**
- **Sleek Hero Section**: Animated gradients, glassmorphism cards, and floating elements.
- **Smart User Avatars**: Auto-generated, consistent avatars based on user initials - no more broken images!
- **Micro-Animations**: Shimmer effects, pulse glows, and smooth transitions.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Enhanced Profile**: Personal dashboard with wishlist management and editable details.

### 🔍 **Smart Discovery**
- **Real-time Search**: Instant product suggestions with thumbnails and pricing as you type.
- **Category Filters**: Easily browse through Electronics, Fashion, and more.
- **Featured Collections**: Handpicked products with dynamic hover effects.

### 🛒 **Advanced Shopping Flow**
- **Seamless Cart**: Real-time cart updates with tax (GST) and shipping calculations.
- **Order Tracking**: Comprehensive order status updates via Socket.io.
- **Secure Checkout**: Streamlined process for a faster conversion.

### 🛡️ Admin Access
- **Role-based Redirection**: Automatic redirection to the admin dashboard for authorized users upon login.
- **Dynamic Meta Updates**: The browser tab title and favicon change dynamically (Shield icon for Admin, Cart icon for Store) to clearly distinguish between roles.
- **Dashboard Overview**: Real-time stats for revenue, orders, and inventory.
- **Product Management**: Complete CRUD capabilities for your inventory.
- **Bulk Operations**: Select and delete multiple orders at once with ease.

### ✨ **Visual & Security Upgrades**
- **Dynamic UI**: Browser tabs and icons update in real-time based on the route.
- **Elegant Splash Screen**: A premium, "no-wave" entry animation for a sophisticated feel.
- **Enhanced Security**: Robust JWT authentication and role-protected routes.

### ⚙️ **Developer Friendly**
- **Admin Seeding**: Built-in script (`seedAdmin.js`) to quickly set up admin credentials.
- **Clean Codebase**: Modular React components and organized Express backend.
- **Real-time Engine**: Powered by Socket.io for instant updates.

---

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/), [Vite](https://vitejs.dev/), [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Real-time**: [Socket.io](https://socket.io/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mitulaghara/Mitul-s-Market-E-Commerce.git
   cd Mitul-s-Market-E-Commerce
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

1. **Start Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Client**
   ```bash
   cd client
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

---

## 📦 Project Structure

```text
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI elements
│   │   ├── pages/       # Page components (Home, Shop, Cart, etc.)
│   │   └── context/     # State management
├── server/          # Node.js backend API
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express API routes
│   └── index.js     # Entry point
└── README.md        # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by <b>Mitul Aghara</b></p>
