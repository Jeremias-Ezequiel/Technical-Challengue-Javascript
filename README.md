# Technical Challengue Javascript | Adistec

This is a simple application that allows you to manage your company's inventory

## Table of Contents
1. [Installation](#installation)
2. [Use](#use)
3. [Project Structure](#project-structure)
4. [Technologies](#technologies)
5. [Endpoints](#endpoints)

---

## Installation

Step by step intructions to configure the local project.

1. Clone the repostory:
   ```bash
   git clone https://github.com/Jeremias-Ezequiel/Technical-Challengue-Javascript.git
   ```
2. Install dependencies
    ```bash
    npm install
    ```

## To use API 

1. Enter the folder
    ```bash 
    cd api
    ```

2. Execute the script
    ```bash
    npm run dev
    ```

## To use web

1. Enter the folder 
    ```bash
    cd web
    ```

2. Open the `index.html` file with live server or open with the browser

---

## Use 

**To create a product**:
1. Open 'products.html' file in the browser
2. fill the form in the products page.

**To create an order**:
1. Open 'orders.html' file in the browser 
2. fill the form in the order page.

---

## Project Structure
```
/proyecto
│
├── /api
│   ├── indexjs
│   ├── /models
│   ├── /log
│   ├── /utils
│   └── /data
│
├── /web
│   ├── index.html
│   ├── /models
│   ├── /pages
│   ├── /utils
│   ├── app.css
│   └── index.js
│
└── README.md
```

---

## Technologies

- Backend: Node.js
- Frontend: HTML, CSS, Javascript
- Other tools: Git, npm

---

## Endpoints

- `GET /products`: Get product list.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update a product.
- `DELETE /products/:id`: Delete a product.
- `GET /orders`: Get order list.
- `POST /orders`: Create a new order. 

