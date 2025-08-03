# 🎵 Ad-Free Music Player Web App

A full-stack music player application that rewards users with ad-free playback time based on their previous listening sessions. Built with the MERN stack and integrated with the Spotify API for track data.

---

## 🚀 Features

- ⏱️ Session-based ad-free experience
- 🔒 Secure JWT-based authentication
- 🎧 Integration with Spotify API for dynamic track info
- 🗂️ Modular project structure (frontend + backend)
- 🧠 Session tracking and reward logic
- ⚛️ State management using Redux
- ⚙️ Environment-specific configuration

---

## 🛠 Tech Stack

### Frontend
- React.js (v19)
- Vite
- Tailwind CSS
- Material UI
- Redux Toolkit + Redux Persist
- React Router
- Styled Components
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Google OAuth
- JWT Auth
- CORS, Axios, Cookie Parser

---

## 📁 Folder Structure
project-root/
├── ListenMusicBackend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── public/
│ ├── routes/
│ ├── services/
│ ├── .env
│ ├── index.js
│ └── package.json
│
├── ListenMusicFrontend/
│ ├── public/
│ ├── src/
│ ├── .env
│ ├── vite.config.js
│ ├── package.json
│ └── index.html
│
├── README.md
└── .gitignore

---


## 🔐 Environment Variables

Both the frontend and backend require a `.env` file to store sensitive configuration values such as:

- Spotify API credentials  
- Google OAuth Client ID  
- JWT secret  
- MongoDB connection URI  

> ⚠️ These files are **not included** in version control (`.gitignore`) and must be created manually before running the app.  
> You can optionally create a `.env.example` file to document required keys.

---

## ⚙️ Setup Instructions

### 📦 Backend Setup

```bash
cd ListenMusicBackend
npm install
npm start 
```

### 💻 Frontend Setup
```bash
cd ListenMusicFrontend
npm install
npm run dev
```