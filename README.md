# 🛍️ Myntra Clone – Full Stack (React + Redux + Node.js + Express.js)

A full-stack **Myntra Clone** application built with **React, Redux, Bootstrap** on the frontend and **Node.js + Express** on the backend.  
The backend serves product data via REST APIs, while the frontend consumes APIs and manages cart state using Redux.

---

## 🚀 Features

### Frontend
- 🛒 Add to Bag & Remove from Bag (Redux Store)
- 👕 Product listing fetched from backend API
- 📦 Bag summary with total price calculation
- ⚡ State management using Redux
- 📱 Responsive UI using Bootstrap
- 🔁 Component-based React architecture

### Backend
- 📡 REST API to serve product data
- 📂 JSON-based data source (`items.json`)
- 🌐 Runs on **port 8080**
- 🔄 Clean separation of frontend & backend

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **Redux / Redux Toolkit**
- **JavaScript (ES6+)**
- **Bootstrap**
- **React Router**

### Backend
- **Node.js**
- **Express.js**
- **JSON Data Source**

---

## 📂 Project Structure

Myntra-clone/
│
├── backend/
│ ├── data/
│ │ └── items.js
│ │
│ ├── items.json
│ ├── app.js
│ ├── package.json
│ └── package-lock.json
│
├── frontend_myntra/
│ ├── public/
│ │ └── images/
│ │
│ ├── src/
│ │ ├── components/
│ │ │ ├── BagItem.jsx
│ │ │ ├── BagSummary.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ └── HomeItem.jsx
│ │ │
│ │ ├── routes/
│ │ │ ├── App.jsx
│ │ │ ├── Bag.jsx
│ │ │ └── Home.jsx
│ │ │
│ │ ├── store/
│ │ │ ├── bagItems.js
│ │ │ ├── itemList.js
│ │ │ └── index.js
│ │ │
│ │ ├── App.css
│ │ └── main.jsx
│ │
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
└── README.md


---

## 🌐 API Endpoints
### Get All Items
GET http://localhost:8080/items

**Response:**  
Returns all product items from `items.json`

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/myntra-clone.git
cd myntra-clone

2️⃣ Backend Setup
cd backend
npm install
node start

📍 Backend runs on:
http://localhost:8080


3️⃣ Frontend Setup
cd frontend_myntra
npm install
npm run dev

📍 Frontend runs on:
http://localhost:5173


📜 Disclaimer

This project is created only for educational purposes.
All product names, images, and brand references belong to Myntra.


👨‍💻 Author

Mann
B.Tech Engineering Student
💡 Interested in Full-Stack Development & Problem Solving
⭐ If you like this project, don’t forget to star the repository!


