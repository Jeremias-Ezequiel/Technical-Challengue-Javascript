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
3. Init server
    ```bash
    npm start
    ```

---

## Use 

- To create a product, fill the form in the products page.
- To create an order, fill the form in the order page.

---

## Project Structure

/proyecto
│
├── /backend
│   ├── server.js
│   ├── /routes
│   └── /models
│
├── /frontend
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── README.md
└── package.json

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

