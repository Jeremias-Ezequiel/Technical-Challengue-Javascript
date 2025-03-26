const infoProducts = document.getElementById("info-products");
const pageProducts = document.getElementById("pageProducts");
const infoOrders = document.getElementById("info-orders");
const productsForm = document.getElementById("products-form");
const productsInput = document.querySelectorAll("#products-form input");
const BASE_URL = "http://localhost:4000";

// INDEX.JS
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [products, orders] = await Promise.all([
      fetch(`${BASE_URL}/products`).then((res) => res.json()),
      fetch(`${BASE_URL}/orders`).then((res) => res.json()),
    ]);

    showProducts(products, infoProducts);
    showOrders(orders);
  } catch (err) {
    console.log("Error");
  }
});

function showProducts(elements, container) {
  let row = document.createElement("TR");
  let header = document.createElement("TH");
  header.textContent = "Name";
  row.appendChild(header);
  header = document.createElement("TH");
  header.textContent = "Price";
  row.appendChild(header);
  header = document.createElement("TH");
  header.textContent = "Stock";
  row.appendChild(header);
  container.appendChild(row);
  // Create data
  elements.forEach((element) => {
    const { name, price, stock } = element;
    if (stock < 1) {
      return;
    }
    let row = document.createElement("TR");
    let data = document.createElement("TD");
    data.textContent = name;
    row.appendChild(data);

    data = document.createElement("TD");
    data.textContent = price;
    row.appendChild(data);

    data = document.createElement("TD");
    data.textContent = stock;
    if (stock < 10) {
      data.classList.add("littleStock");
    }
    row.appendChild(data);
    container.appendChild(row);
  });
}

function showOrders(elements) {
  let row = document.createElement("TR");
  let header = document.createElement("TH");
  header.textContent = "Client";
  row.appendChild(header);
  header = document.createElement("TH");
  header.textContent = "Quantity";
  row.appendChild(header);
  header = document.createElement("TH");
  header.textContent = "Total";
  row.appendChild(header);
  infoOrders.appendChild(row);

  let salesTotal = 0;
  elements.forEach((element) => {
    const { client, quantity, total } = element;
    let row = document.createElement("TR");
    let data = document.createElement("TD");
    data.textContent = client;
    row.appendChild(data);

    data = document.createElement("TD");
    data.textContent = quantity;
    row.appendChild(data);

    data = document.createElement("TD");
    data.textContent = `$${total}`;
    salesTotal += total;
    row.appendChild(data);
    infoOrders.appendChild(row);
  });

  let totalTD = document.createElement("TD");
  totalTD.setAttribute("colspan", "2");
  totalTD.textContent = "Total";
  totalTD.classList.add("totalSales");
  infoOrders.appendChild(totalTD);
  totalTD = document.createElement("TD");
  totalTD.textContent = `$${salesTotal.toFixed(2)}`;
  infoOrders.appendChild(totalTD);
}
