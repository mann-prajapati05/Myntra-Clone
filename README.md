# 🛍️ Myntra Clone – Full Stack (React + Redux + Express.js +Node.js)

A full-stack **Myntra Clone** application built with **React, Redux, and Bootstrap** on the frontend and **Node.js + Express** on the backend.  
The backend serves product data via REST APIs, while the frontend consumes APIs and manages cart state using Redux.
live : https://myntra-clone-sable-two.vercel.app/
---

## 🚀 Features

### Frontend

- 🛒 Add to Bag & Remove from Bag using Redux
- 👕 Product listing fetched from backend API
- 📦 Bag summary with price calculation
- 📱 Fully responsive UI using Bootstrap
- ⚡ Fast UI with Vite + React

### Backend

- 📡 REST API serving product data
- 📂 JSON-based data source (`items.json`)
- 🌐 Backend runs on **port 8080**

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- Redux / Redux Toolkit
- JavaScript (ES6+)
- Bootstrap
- React Router

### Backend

- Node.js
- Express.js
- JSON data source

---

## 📂 Project Structure

Myntra-clone/
├── backend/
│ ├── data/
│ │ └── items.js
│ ├── items.json
│ ├── app.js
│ └── package.json
│
├── frontend_myntra/
│ ├── public/
│ │ └── images/
│ ├── src/
│ │ ├── components/
│ │ ├── routes/
│ │ ├── store/
│ │ └── main.jsx
│ └── package.json
│
└── README.md

---

## 🌐 API Endpoint

GET http://localhost:8080/items

Returns all product items from `items.json`.

---

## ⚙️ How to Run Locally

### Backend

```bash
cd backend
npm install
npm start

Frontend
cd frontend_myntra
npm install
npm run dev


📜 Disclaimer

This project is built for educational purposes only.
All product images and brand names belong to Myntra.

👨‍💻 Author

Mann
B.Tech Engineering Student
Full-Stack Developer (React + Node.js)

⭐ If you like this project, please star the repository!
```
