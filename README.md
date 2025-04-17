# 💬 MessageSync

**MessageSync** is a full-stack real-time messaging platform that facilitates instant communication, file sharing, and group collaboration — all within a seamless, mobile-responsive interface. Designed for scalability and speed, it ensures sub-100ms message delivery using WebSockets, robust authentication via JWT, and efficient media management with Cloudinary.

<br/>

## 🚀 Live Demo

Frontend: [http://messagesync.netlify.app](http://messagesync.netlify.app) 

---

## 🌟 Features

### ⚡ Real-Time Communication
- **Instant Messaging** with WebSocket-based communication (Socket.IO)
- Sub-100ms latency for smooth, uninterrupted conversations
- **Typing indicators**, message receipts, and live updates

### 👥 User & Group Management
- Create **1-to-1 chats**, **group chats**, and manage chat members
- Connect with other users and manage your network

### 🔒 Authentication & Security
- Secure **JWT-based login system**
- **Password encryption** with `bcrypt`
- **Cookie-based session handling** for authenticated APIs

### 📁 File & Media Sharing
- Upload and share images/files in chats
- Images efficiently handled using **Cloudinary**

### 📱 Responsive UI
- Clean, mobile-first interface built with **Tailwind CSS**
- Seamlessly adapts to mobile, tablet, and desktop

### 🛠️ Deployment & Architecture
- **Frontend** hosted on **Netlify**
- **Backend** deployed via **Render**
- RESTful API design with Express.js and MongoDB

---

## 🧰 Tech Stack

| Layer      | Tech Used                                             |
|------------|-------------------------------------------------------|
| Frontend   | React.js, Tailwind CSS, Axios, Socket.IO-client       |
| Backend    | Node.js, Express.js, MongoDB, Socket.IO, bcrypt, JWT |
| Storage    | Cloudinary (media storage)                            |
| Auth       | JWT, bcrypt, Cookies                                  |
| Hosting    | Netlify (frontend), Render (backend)                  |

---

## 🗂️ Folder Structure

```
MessageSync/
├── client/          # React Frontend
└── server/          # Node.js Backend
```

### client/
```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── ...
```

### server/
```
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── index.js
```

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prince-vishwakarma-cs/MessageSync.git
cd MessageSync
```

### 2️⃣ Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in both the `client` and `server` directories.

### server/.env
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

---

## ▶️ Run Locally

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd ../client
npm run dev
```

App runs locally on `http://localhost:3000`

---

## 🧩 Future Enhancements

- Message reactions & emojis
- Voice and video calling integration
- Real-time unread message badges
- Message deletion & edit history
- Push notifications

---

## 👨‍💻 Author

**Prince Vishwakarma**  
[GitHub](https://github.com/prince-vishwakarma-cs) • [LinkedIn](https://linkedin.com/in/prince-vishwakarma-cs)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
