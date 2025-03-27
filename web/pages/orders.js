import { Order } from "../models/Order.js";
import { showSelect } from "../utils/selectUtils.js";
import { showTable } from "../utils/tableUtils.js";

const orderForm = document.getElementById("orderForm");
const containerOrder = document.getElementById("pageOrders");
const totalPrice = document.getElementById("totalPrice");
const orderSelect = document.getElementById("orderSelect");
const quantityProduct = document.getElementById("quantity");

const newOrder = new Order();
let orders = [];
let products = [];
const orderHeaders = ["Client", "Quantity", "Total"];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [productData, orderData] = await Promise.all([
      fetch("http://localhost:4000/products").then((res) => res.json()),
      fetch("http://localhost:4000/orders").then((res) => res.json()),
    ]);
    orders = orderData;
    products = productData;
    showTable(orderData, containerOrder, orderHeaders, "orders");
    showSelect(productData, orderSelect);
  } catch (err) {
    console.log(err);
  }
});

let optionInfo = {
  price: 0,
  quantity: 1,
};

orderSelect.addEventListener("change", (event) => {
  const { value: position } = event.target;
  const { price } = products[position];
  optionInfo.price = price;
  showPrice(optionInfo.price, optionInfo.quantity);
});

quantityProduct.addEventListener("input", (event) => {
  const quantity = event.target.value;
  optionInfo.quantity = quantity;
  showPrice(optionInfo.price, optionInfo.quantity);
});

function showPrice(price, quantity) {
  let total = price * quantity;
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newOrder.isValid()) {
    alert("There are some input fields empty");
  }

  console.log(orderSelect.price);
});
