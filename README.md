# Coders Profile Hub

A modern, full-stack dashboard to track and compare coding stats from GitHub, LeetCode, Codeforces, and CodeChef. Built with React (Vite, TailwindCSS) and Node.js/Express/MongoDB.

![Demo](![image](https://github.com/user-attachments/assets/ef6df49f-19aa-4e08-b1a6-d26617d11bde)
)

---

## 🚀 Features
- **User Registration:** Simple login with name and email (no OAuth required)
- **Profile Dashboard:** View and compare stats from multiple coding platforms
- **Leaderboard:** See top users and compare with friends
- **Charts & Visuals:** Language usage pie chart, problem count, rating graph, streaks
- **Responsive UI:** Beautiful, mobile-friendly design with TailwindCSS
- **Easy Deployment:** Ready for Vercel and MongoDB Atlas

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Recharts
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **APIs:** GitHub, LeetCode, Codeforces, CodeChef (public/unofficial)

---

## 📁 Folder Structure
```
CODERS-PROFILES/
  backend/           # Node.js/Express backend
    index.js         # Main server entry
    routes/          # API route handlers
    models/          # Mongoose models
    package.json     # Backend dependencies/scripts
  src/               # React frontend source
    App.jsx, ...     # Main pages/components
    main.jsx         # Entry point
    Login.jsx        # Email/Name login page
    ...
  package.json       # Frontend dependencies/scripts
  tailwind.config.js # TailwindCSS config
  README.md          # This file
```

---

## ⚡ Quick Start

### 1. **Clone the repo**
```bash
git clone <https://github.com/ankesh15/CODERS-PROFILES>
cd CODERS-PROFILES
```

### 2. **Install dependencies**
- **Frontend:**
  ```bash
  npm install
  ```
- **Backend:**
  ```bash
  cd backend
  npm install
  ```

### 3. **Set up environment variables**
- In `CODERS-PROFILES/`, create a file named `.env` (not a folder!) with:
  ```
  VITE_API_BASE_URL=http://localhost:5000/api
  ```
- In `CODERS-PROFILES/backend/`, create a `.env` file for MongoDB URI if needed:
  ```
  MONGODB_URI=mongodb://localhost:27017/coders-profile-hub
  ```

### 4. **Run the backend**
```bash
cd backend
npm start
```

### 5. **Run the frontend**
```bash
cd ..
npm run dev
```
- Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---

## 📝 Usage
1. **Register/Login:** Enter your name and email on the login page.
2. **Dashboard:** Add your coding platform usernames to view stats.
3. **Leaderboard:** See how you rank among other users.
4. **Profile:** View and share your coding achievements.

---

## 🔌 API Overview
- **POST `/api/add-user`** — Register/login with name & email
- **GET `/api/users`** — List all users (leaderboard)
- **POST `/api/leetcode`** — Fetch LeetCode stats
- **POST `/api/codeforces`** — Fetch Codeforces stats
- **POST `/api/github`** — Fetch GitHub stats
- **POST `/api/codechef`** — Fetch CodeChef stats

---

## 🧑‍💻 Contributing
- Open issues or pull requests for improvements and features
- All feedback and suggestions welcome!

---

## 📄 License
MIT

---

## 🙏 Acknowledgements
- LeetCode, Codeforces, GitHub, CodeChef for their APIs
- React, TailwindCSS, Express, MongoDB communities

