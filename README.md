# Myntra Clone (Full Stack)

A full-stack e-commerce-style web application inspired by Myntra, built with React + Redux Toolkit on the frontend and Node.js + Express + MongoDB on the backend.

The project solves the core workflow of a fashion shopping platform: user authentication, product browsing, bag management, and admin-side product inventory operations.

## Features

### Customer Experience

- User signup and login with validation
- Session persistence using JWT in HTTP-only cookies
- Product listing on home page
- Add item to bag and remove item from bag
- Bag page with price breakdown (MRP, discount, convenience fee, final total)

### Admin Experience

- Admin login support
- Add new product with image upload
- Edit existing product details
- Delete product from inventory

### Platform and API Behavior

- Cookie-based auth verification endpoint
- Protected backend routes for bag and admin operations
- CORS configured for frontend origin with credentials enabled
- Cloudinary integration for product image hosting

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Redux Toolkit + React Redux
- Axios
- Bootstrap 5
- React Icons
- Vite

### Backend

- Node.js
- Express 5
- Mongoose + MongoDB
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser
- express-validator
- multer
- cloudinary
- cors
- dotenv

## Architecture Overview

1. Frontend (React) calls backend REST APIs using Axios and sends credentials (`withCredentials: true`) for cookie-based auth.
2. Backend (Express) validates requests, authenticates users from JWT cookie (`uid`), and handles business logic.
3. MongoDB stores users and products.
4. For admin product create/update, images are uploaded through multer and then sent to Cloudinary; Cloudinary URL is stored in MongoDB.
5. Redux stores client-side state for product list, bag item IDs, and admin UI mode.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Myntra-clone
```

### 2. Install frontend dependencies

```bash
cd frontend_myntra
npm install
```

### 3. Install backend dependencies

```bash
cd ../my_backend
npm install
```

### 4. Configure environment variables

Create `my_backend/.env`:

```env
MONGO_STR=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:5173
PORT=3030
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

Create `frontend_myntra/.env`:

```env
VITE_COMMON_URL=http://localhost:3030
```

### 5. Run backend

```bash
cd my_backend
npm start
```

### 6. Run frontend

```bash
cd frontend_myntra
npm run dev
```

Frontend default dev server: `http://localhost:5173`  
Backend default server: `http://localhost:3030`

## Environment Variables

### Backend (`my_backend/.env`)

- `MONGO_STR`: MongoDB connection string
- `JWT_SECRET`: Secret used to sign and verify JWT tokens
- `CLIENT_URL`: Allowed frontend origin for CORS
- `PORT`: Backend port (defaults to `3030` if not set)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Frontend (`frontend_myntra/.env`)

- `VITE_COMMON_URL`: Backend base URL used by Axios calls

## API Endpoints

Base URL: `http://localhost:3030`

### Auth

- `POST /signup` - Register a new customer account
- `POST /login` - Login user/admin and set auth cookie
- `POST /logout` - Clear auth cookie
- `GET /verify` - Verify current authenticated user from cookie

### Products (Home)

- `GET /` - Fetch all products

### Bag (Protected)

- `GET /bag` - Get bag item IDs for logged-in user
- `GET /bag/items` - Get populated bag product objects
- `POST /bag/:productId` - Add product to bag
- `DELETE /bag/:productId` - Remove product from bag

### Admin (Protected)

- `GET /admin/:productId` - Get product details by ID
- `POST /admin/add-product` - Add product (multipart form-data with `photo`)
- `PUT /admin/modify-product/:productId` - Update product (supports optional new `photo`)
- `DELETE /admin/remove-product/:productId` - Delete product by ID

## Folder Structure

```text
Myntra-clone/
|-- frontend_myntra/
|   |-- public/images/               # Static image assets
|   |-- src/
|   |   |-- components/              # Reusable UI (header, footer, bag/product cards)
|   |   |-- routes/                  # Route pages (home, bag, auth, admin screens)
|   |   |-- store/                   # Redux slices and store configuration
|   |   `-- main.jsx                 # App entry and router setup
|   |-- package.json
|   `-- vite.config.js
|
|-- my_backend/
|   |-- controllers/                 # Request handlers (auth, bag, admin, home)
|   |-- middlewares/                 # Multer middleware for uploads
|   |-- models/                      # Mongoose schemas (User, Product)
|   |-- routes/                      # Express route modules
|   |-- utils/                       # Cloudinary helper
|   |-- public/temp/                 # Temporary upload storage for multer
|   |-- app.js                       # Server bootstrap and middleware wiring
|   `-- package.json
|
`-- README.md
```

## Usage

### Customer Flow

1. Open the app and sign up or log in.
2. Browse products on the home page.
3. Add items to bag.
4. Open bag page to review selected products and total payment summary.
5. Remove items from bag when needed.

### Admin Flow

1. Log in with an admin account.
2. Access admin options from the top navigation.
3. Add a new product with image upload.
4. Edit existing products or remove products from inventory.

## Future Improvements

- Add search and filtering functionality to product catalog
- Add order placement and checkout persistence
- Add role-based authorization checks on all admin routes
- Add automated tests (unit/integration)
- Add Docker setup and deployment docs
- Add centralized error handling and API response standardization

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with clear messages.
4. Open a pull request describing the change and testing done.

## License

No project-level `LICENSE` file is currently included in this repository.
