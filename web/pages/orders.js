import { Order } from "../models/Order.js";
import { showSelect } from "../utils/selectUtils.js";
import { showTable } from "../utils/tableUtils.js";

const orderForm = document.getElementById("orderForm");
const containerOrder = document.getElementById("pageOrders");
const orderInputs = document.querySelectorAll("#orderForm input");
const totalPrice = document.getElementById("totalPrice");
const orderSelectContainer = document.getElementById("orderSelect");

const newOrder = new Order();
let orders = [];
const orderHeaders = ["Client", "Quantity", "Total"];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [productData, orderData] = await Promise.all([
      fetch("http://localhost:4000/products").then((res) => res.json()),
      fetch("http://localhost:4000/orders").then((res) => res.json()),
    ]);
    orders = orderData;
    showTable(orderData, containerOrder, orderHeaders, "orders");
    console.log(productData);
    showSelect(productData, orderSelectContainer);
  } catch (err) {
    console.log(err);
  }
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newOrder.isValid()) {
    alert("There are some input fields empty");
  }
});
