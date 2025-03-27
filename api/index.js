import http from "node:http";
import path from "node:path";
import { loadFile, addNewItemFile, updateFile } from "./utils/manageFile.js";
import { Log } from "./utils/manageLogFile.js";
import { Order } from "./models/Order.js";

const PORT = process.env.PORT ?? 4000;

// Path's
const productsPath = path.join("data", "products.json");
const ordersPath = path.join("data", "orders.json");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (method) {
    case "GET":
      switch (url) {
        case "/products":
          loadFile(productsPath)
            .then((response) => {
              res.statusCode = 200;
              res.end(JSON.stringify(response));
              Log(`GET /products: ${JSON.stringify(response)}`);
            })
            .catch((err) => {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  error: "Interal server error",
                })
              );
              Log(`Error in GET /products: ${err}`);
            });
          break;
        case "/orders":
          loadFile(ordersPath)
            .then((response) => {
              res.statusCode = 200;
              res.end(JSON.stringify(response));
              Log(`GET /orders: ${JSON.stringify(response)}`);
            })
            .catch((err) => {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  error: "Internal server error",
                })
              );
              Log(`Error in GET /orders: ${err}`);
            });
          break;
        default:
          res.statusCode = 404;
          Log("Error : Rounte not found");
          res.end(JSON.stringify({ error: "Route not found" }));
      }
      break;
    case "POST":
      switch (url) {
        case "/products": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const newProduct = JSON.parse(body);
              await addNewItemFile(newProduct, productsPath);
              res.statusCode = 201;
              res.end(JSON.stringify(newProduct));
              Log(
                `POST /products - Product created successfully: ${JSON.stringify(
                  newProduct
                )}`
              );
            } catch (error) {
              res.statusCode = 400;
              Log(error);
            }
          });
          break;
        }
        case "/orders": {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              // Create a new Order
              const { client, productId, quantity, total } = JSON.parse(body);
              const newOrder = new Order(client, productId, quantity, total);

              // Get a list of products
              const products = await loadFile(productsPath);

              // Search the product in JSON
              const indexProduct = products.findIndex(
                (product) => product.id === productId
              );

              if (indexProduct === -1) {
                res.statusCode = 401;
                Log("ERROR POST /orders - Incorrect product ID");
                return res.end(
                  JSON.stringify({ error: "not enough stock available" })
                );
              }

              // update the stock
              products[indexProduct].stock -= quantity;
              await updateFile(productsPath, products);

              await addNewItemFile(newOrder, ordersPath);
              res.statusCode = 201;
              res.end(JSON.stringify(newOrder));
              Log(
                `POST /orders - Order create successfully ${JSON.stringify(
                  newOrder
                )}`
              );
            } catch (err) {
              res.statusCode = 404;
              Log(
                "ERROR - POST /orders - There is an error in the creation of an order"
              );
            }
          });
          break;
        }
      }
  }
});

server.listen(PORT, () => {
  Log(`Server listening on port http://localhost:${PORT}`);
  console.log(`Server listening on port http://localhost:${PORT}`);
});
