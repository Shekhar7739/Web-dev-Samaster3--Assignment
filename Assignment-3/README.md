# Assignment 3: Inventory and Data Management System

A beginner-friendly RESTful backend API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for managing warehouse/store inventory, tracking stock levels, handling safe restocking/sales, filtering/sorting products, and generating business analytics reports using MongoDB Aggregation.

---

## 📁 Project Architecture & Folder Structure

```
Assignment-3/
├── config/
│   └── db.js                 # MongoDB connection logic using Mongoose
├── controllers/
│   └── productController.js  # Business logic for all 8 inventory endpoints
├── middleware/
│   └── errorHandler.js       # Centralized 404 & Mongoose error handling
├── models/
│   └── Product.js            # Mongoose Schema, field validations & virtuals
├── routes/
│   └── productRoutes.js      # Express Router with conflict-free route ordering
├── .env                      # Environment configuration (PORT, MONGO_URI)
├── package.json              # Dependencies and run scripts
├── seed.js                   # Pre-populates 12 realistic sample products
├── server.js                 # Express application entry point
└── README.md                 # Complete documentation & Postman guide
```

---

## 🛠️ Technology Stack & Dependencies

- **Node.js** (Runtime environment)
- **Express.js** (Web server framework & routing)
- **MongoDB** (NoSQL Document database)
- **Mongoose** (Object Data Modeling / ODM library)
- **dotenv** (Environment variable loader)

_(Strictly compliant: No external CMS, UI boilerplates, or unapproved libraries used.)_

---

## ⚙️ Installation & Setup Instructions

### 1. Prerequisites

Ensure you have installed:

- **Node.js** (v18+)
- **MongoDB Community Server** (running locally on port 27017)

To verify MongoDB service is active on Windows:

```powershell
Get-Service *mongo*
```

### 2. Install Project Dependencies

Open your terminal in `Assignment-3`:

```bash
npm install
```

### 3. Configure Environment Variables

Verify or edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
```

### 4. Seed the Database

Populate 12 sample items matching the assignment PDF screenshots:

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
```

Console Output:

```
Server running in development mode on port 5000
MongoDB Connected: 127.0.0.1
```

---

## 📮 API Endpoints & Postman Testing Guide

Base URL: `http://localhost:5000/api/products`

### 1. Get All Products (Pagination, Filtering, Sorting)

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/products`
- **Optional Query Parameters:**
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `category`: Filter by category (e.g., `Furniture`)
  - `minPrice` & `maxPrice`: Filter by price range (e.g., `minPrice=500&maxPrice=5000`)
  - `search`: Search term in name or SKU (e.g., `Table` or `FURN`)
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `order`: `asc` or `desc` (default: `desc`)
- **Example Response:**

```json
{
  "total": 12,
  "page": 1,
  "totalPages": 2,
  "count": 10,
  "products": [
    {
      "_id": "6a54767af6123427d6e61d76",
      "name": "Study Table",
      "sku": "FURN-TB-012",
      "category": "Furniture",
      "price": 3999,
      "quantity": 2,
      "reorderLevel": 4,
      "supplier": "IKEA India",
      "createdAt": "2026-07-13T05:24:10.351Z",
      "updatedAt": "2026-07-13T05:24:10.351Z",
      "__v": 0,
      "stockValue": 7998,
      "id": "6a54767af6123427d6e61d76"
    }
  ]
}
```

---

### 2. Create New Product

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/products`
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

- **Response (201 Created):**

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens",
  "_id": "6a547727f6123427d6e61d7c",
  "createdAt": "2026-07-13T05:27:03.054Z",
  "updatedAt": "2026-07-13T05:27:03.054Z",
  "__v": 0,
  "stockValue": 4800,
  "id": "6a547727f6123427d6e61d7c"
}
```

---

### 3. Get Low-Stock Alert Report

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/products/low-stock`
- **Description:** Returns products where `quantity <= reorderLevel`.
- **Response (200 OK):**

```json
{
  "count": 4,
  "lowStockItems": [
    {
      "_id": "6a54767af6123427d6e61d76",
      "name": "Study Table",
      "sku": "FURN-TB-012",
      "category": "Furniture",
      "price": 3999,
      "quantity": 2,
      "reorderLevel": 4,
      "supplier": "IKEA India",
      "stockValue": 7998,
      "id": "6a54767af6123427d6e61d76"
    }
  ]
}
```

---

### 4. Category-Wise Summary (MongoDB Aggregation)

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/products/summary`
- **Description:** Uses `$group` pipeline to compute `totalItems`, `totalQuantity`, `totalStockValue`, and `avgPrice` per category.
- **Response (200 OK):**

```json
{
  "categories": 4,
  "summary": [
    {
      "_id": "Electronics",
      "totalItems": 4,
      "totalQuantity": 96,
      "totalStockValue": 629404,
      "avgPrice": 9749
    },
    {
      "_id": "Apparel",
      "totalItems": 2,
      "totalQuantity": 78,
      "totalStockValue": 91522,
      "avgPrice": 1399
    }
  ]
}
```

---

### 5. Get Single Product by ID

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/products/:id`
- **Response (200 OK):** Single product JSON document.
- **Error Responses:**
  - 400 Bad Request if ID format is not a valid 24-character hex string.
  - 404 Not Found if product ID does not exist.

---

### 6. Update Product Details

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/products/:id`
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 140,
  "quantity": 60
}
```

- **Response (200 OK):** Updated product object with newly calculated `stockValue`.

---

### 7. Adjust Stock Level (Increment / Decrement)

- **Method:** `PATCH`
- **URL:** `http://localhost:5000/api/products/:id/stock`
- **Headers:** `Content-Type: application/json`
- **Restock Example Body (+10):**

```json
{
  "change": 10
}
```

- **Sale / Decrement Example Body (-5):**

```json
{
  "change": -5
}
```

- **Response (200 OK):**

```json
{
  "message": "Stock updated",
  "product": {
    "_id": "6a54767af6123427d6e61d76",
    "name": "Study Table",
    "quantity": 12,
    "stockValue": 47988
  }
}
```

- **Safe Guard:** If `quantity + change < 0`, returns **400 Bad Request** preventing negative inventory.

---

### 8. Delete Product

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/products/:id`
- **Response (200 OK):**

```json
{
  "message": "Product deleted",
  "id": "6a547727f6123427d6e61d7c"
}
```
