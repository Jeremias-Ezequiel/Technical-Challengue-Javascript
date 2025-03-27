import http from "node:http";
import path from "node:path";
import { loadFile, addNewItemFile, updateFile } from "./utils/manageFile.js";
import { Log } from "./utils/manageLogFile.js";
import { Order } from "./models/Order.js";
import { Product } from "./models/Product.js";

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
              const { name, price, stock } = JSON.parse(body);
              //Create the product
              const newProduct = new Product(name, price, stock);

              // Add the product to json file
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
              Log(`ERROR POST /products - ${error}`);
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

              if (products[indexProduct].stock <= 0) {
                res.statusCode = 400;
                Log("ERROR POST /orders - There isn't stock available");
                return res.end(
                  JSON.stringify({ error: "There isn't stock available" })
                );
              }
              const newOrder = new Order(client, productId, quantity, total);
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
    case "PUT": {
      // GET index at the URL
      const index = parseInt(url.split("/")[2]);
      const newUrl = url.slice(0, url.length - 1);

      if (newUrl === "/products/") {
        let body = "";
        // Read the data
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          const productsArr = await loadFile(productsPath);
          const { name, price, stock } = JSON.parse(body);

          //Search the product
          const indexProduct = productsArr.findIndex(
            (product) => product.id === index
          );

          if (indexProduct === -1) {
            Log("ERROR PUT /products/:index - Index not found");
            res.statusCode = 400;
            return res.end(
              JSON.stringify({ error: "Index not found", code: 400 })
            );
          }

          productsArr[indexProduct].name = name;
          productsArr[indexProduct].price = price;
          productsArr[indexProduct].stock = stock;

          await updateFile(productsPath, productsArr);
          res.statusCode = 200;
          Log(
            `/PUT /products/:i - Update Successfully ${JSON.stringify(
              productsArr[indexProduct]
            )}`
          );
          return res.end(JSON.stringify(productsArr[indexProduct]));
        });
      } else {
        res.statusCode = 404;
        Log("ERROR PUT - Route not found");
        return res.end(JSON.stringify({ error: "Route not found", code: 404 }));
      }
      break;
    }
    case "DELETE": {
      const index = parseInt(url.split("/")[2]);
      const newUrl = url.slice(0, url.length - 1);

      if (newUrl === "/products/") {
        req.on("end", async () => {
          // GET products
          const products = await loadFile(productsPath);

          // Search index
          const productIndex = products.findIndex(
            (product) => product.id === index
          );

          if (productIndex !== -1) {
            const productsUpd = products.filter(
              (product) => product.id !== index
            );
            await updateFile(productsPath, productsUpd);
            Log(
              `DELETE /products - Delete product successfully : ${JSON.stringify(
                products[index]
              )}`
            );
            res.statusCode = 200;
            return res.end(
              JSON.stringify({
                message: "Delete successfully",
                data: products[index],
              })
            );
          } else {
            res.statusCode = 400;
            Log("ERROR DELETE /products:index - Index not found");
            return res.end(
              JSON.stringify({ error: "Index not found", code: 400 })
            );
          }
        });
        req.on("data", () => {});
      }
      break;
    }
    default: {
      res.statusCode = 405;
      Log("ERROR - Method not allowed");
      return res.end(
        JSON.stringify({
          error: "Method not allowed",
        })
      );
    }
  }
});

server.listen(PORT, () => {
  Log(`Server listening on port http://localhost:${PORT}`);
  console.log(`Server listening on port http://localhost:${PORT}`);
});
