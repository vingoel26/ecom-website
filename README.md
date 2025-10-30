# Ecom Website: Full Stack Shopping Cart Demo

## Overview
A full-stack shopping cart demo built for Vibe Commerce screening.
- **Frontend**: React + Vite + Tailwind CSS (including dark mode, filters, product detail, cart, and checkout)
- **Backend**: Node.js + Express + MongoDB (Mongoose), REST APIs, Fake Store integration

Features:
- Product browsing with grid, search, filtering
- Product detail page (image, desc, category, rating)
- Add/remove/update items in cart
- Cart view (totals, update, remove)
- Checkout form with receipt
- User avatar (mock user)
- DB persistence per demo user
- Robust validation & error handling

---

## Quick Start

```bash
# 1. Clone & install
 git clone <repo-url>
 cd ecom-website

# 2. MongoDB: start local or use Atlas (default: mongodb://127.0.0.1:27017/ecom_website)

# 3. Start backend
 cd backend
 npm install
 npm run dev

# 4. In a new terminal: Start frontend
 cd ../frontend
 npm install
 npm run dev

# 5. Go to http://localhost:5173
```

---

## Tech Stack
- Frontend: React 19, Vite, TailwindCSS v4, dark/light mode
- Backend: Node.js 22+, Express 5+, Mongoose 8
- Database: MongoDB (local or Atlas)
- External: [Fake Store API](https://fakestoreapi.com/)

---

## Backend Endpoints
- `GET   /api/products`          — List products (from DB, seeded from Fake Store API)
- `GET   /api/products/:id`      — Product detail (all fields)
- `POST  /api/cart`              — Add item (body: {productId, qty})
- `DELETE /api/cart`             — Remove or decrement (body: {productId [, qty]})
- `GET   /api/cart`              — Get current cart (items + total)
- `POST  /api/checkout`          — Checkout (returns mock receipt)

### Product Schema
- `id`: ObjectId
- `name`: string
- `price`: number
- `imageUrl`: string
- `description`: string
- `category`: string
- `rating`: { rate: number, count: number }

---

## Features
- Responsive product grid with search/filter/sort
- Product detail page
- Add to cart from grid or detail
- Quantity editing, line item removal, single-user (demo)
- Checkout form (name, email); clears cart and shows modal receipt
- Modern UI

---

## Environment Setup

1. **Backend .env file:**
   - In the `/backend` directory, create a file named `.env`.
   - The only required variable is the MongoDB URI:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecom_website
```

- For MongoDB Atlas, replace with your connection string (and ensure your IP is whitelisted on Atlas/project network).
- You can also set a custom PORT (defaults to 3000 if unset):

```env
PORT=3000
```

2. **Frontend environment:**
   - No custom .env needed by default. If you want to change the backend API URL, edit `frontend/src/api/client.js` (`API_BASE_URL`).
   - If you want to use a .env file: create `.env` in `/frontend` and add (Vite prefix!):

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Troubleshooting
- MongoDB must be running. If you see connection refused, check your database.
- To reseed: delete all products from the DB and restart backend.
- CORS: Vite dev server proxies work, but if you see CORS errors make sure backend is on port 3000, frontend on 5173 (default).

---
## Screenshot
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/5c7856bc-feea-4c09-b639-4b78d6aec8ba" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/f3bcda93-bb9e-4b9f-b7f4-f731c81bce5a" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/6c7dbcce-4db5-49ad-a43a-000b8bf87070" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/a8c10ced-dbef-48f3-bb1f-ca2783e2b90b" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/8a29eee4-c07a-466e-b7bf-c72f653236be" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/21bd7c9f-a7c6-470f-ba3f-8fda815ea9e1" />
<img width="1896" height="932" alt="image" src="https://github.com/user-attachments/assets/8dd2ee18-4ed9-4c3e-90c5-56f2f7f09a60" />



