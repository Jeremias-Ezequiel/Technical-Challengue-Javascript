import { showTable } from "./utils/tableUtils.js";

const infoProducts = document.getElementById("info-products");
const infoOrders = document.getElementById("info-orders");
const BASE_URL = "http://localhost:4000";

const orderHeaders = ["Client", "Quantity", "Total"];
const productHeaders = ["Name", "Price", "Stock"];

// INDEX.JS
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [products, orders] = await Promise.all([
      fetch(`${BASE_URL}/products`).then((res) => res.json()),
      fetch(`${BASE_URL}/orders`).then((res) => res.json()),
    ]);
    showTable(products, infoProducts, productHeaders, "products");
    showTable(orders, infoOrders, orderHeaders, "orders");
  } catch (err) {
    console.log("Error");
  }
});
