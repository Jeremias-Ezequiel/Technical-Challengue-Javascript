import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { loadFile, updateFile } from "./utils/manageFile.js";
import { Log } from "./utils/manageLogFile.js";

const PORT = process.env.PORT ?? 4000;

// Path's
const productsPath = path.join("data", "products.json");
const ordersPath = path.join("data", "orders.json");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");

  switch (method) {
    case "GET":
      switch (url) {
        case "/products":
          loadFile(productsPath).then(
            (response) => res.end(JSON.stringify(response)),
            (res.statusCode = 200)
          );
          break;
        case "/orders":
          loadFile(ordersPath).then((response) => {
            res.end(JSON.stringify(response)), (res.statusCode = 200);
          });
          break;
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
              await updateFile(newProduct, productsPath);
              res.statusCode = 201;
              res.end(JSON.stringify(newProduct));
              Log(
                `Product created successfully: ${JSON.stringify(newProduct)}`
              );
            } catch (error) {
              res.statusCode = 400;
              Log(error);
              console.log("Error creating the product: ", error);
            }
          });
        }
      }
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
