import http from "node:http";
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
            })
            .catch((err) => {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  error: "Interal server error",
                })
              );
              Log(`Error en GET /products: ${err}`);
            });
          break;
        case "/orders":
          loadFile(ordersPath).then((response) => {
            res.end(JSON.stringify(response));
          });
          break;
        default:
          res.statusCode = 404;
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
              await updateFile(newProduct, productsPath);
              res.statusCode = 201;
              res.end(JSON.stringify(newProduct));
              Log(
                `Product created successfully: ${JSON.stringify(newProduct)}`
              );
            } catch (error) {
              res.statusCode = 400;
              Log(error);
            }
          });
        }
      }
  }
});

server.listen(PORT, () => {
  Log(`Server listening on port http://localhost:${PORT}`);
  console.log(`Server listening on port http://localhost:${PORT}`);
});
