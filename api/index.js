import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = process.env.PORT ?? 4000;

// Data
const productsPath = path.join("data", "products.json");

const productsJSON = await loadProducts();

const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");

  switch (method) {
    case "GET":
      switch (url) {
        case "/products":
          res.statusCode = 200;
          res.end(JSON.stringify(productsJSON));
          break;
      }
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

async function loadProducts() {
  try {
    const data = await fs.readFile(productsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error loading JSON: ", err);
    return [];
  }
}
