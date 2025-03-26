import { Product } from "../models/Product.js";
import { showTable } from "../utils/tableUtils.js";

const pageProducts = document.getElementById("pageProducts");
const productInputs = document.querySelectorAll("#products-form input");
const productsForm = document.getElementById("products-form");

let newProduct = new Product();
const orderHeaders = ["Client", "Quantity", "Total"];
const productHeaders = ["Name", "Price", "Stock"];

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("http://localhost:4000/products");
  const data = await res.json();

  showTable(data, pageProducts, productHeaders, "products");
});

productsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!newProduct.isValid()) {
    alert("There are some input field empty");
  }

  try {
    const [createProduct, productsList] = await Promise.all([
      fetch("http://localhost:4000/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      }).then((res) => res.json()),
      fetch("http://localhost:4000/products").then((res) => res.json()),
    ]);
    showTable(productsList, pageProducts, productHeaders, "products");
  } catch (err) {
    console.error("There is an error");
  }
});

productInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const { id, value } = input;
    newProduct[id] = value;
  });
});
