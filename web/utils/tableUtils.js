export function showTable(elements, container, headers, type) {
  createHeaders(container, headers);
  // Create data
  switch (type) {
    case "products": {
      createProductsTable(container, elements);
      break;
    }
    case "orders": {
      createOrdersTable(container, elements);
      break;
    }
    default:
      console.log("Error");
  }
}

function createHeaders(container, headers) {
  let row = document.createElement("TR");
  headers.forEach((textHeader) => {
    let header = document.createElement("TH");
    header.textContent = textHeader;
    row.appendChild(header);
  });
  container.appendChild(row);
}

function createProductsTable(container, elements) {
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

function createOrdersTable(container, elements) {
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
    container.appendChild(row);
  });
  let row = document.createElement("TR");
  let data = document.createElement("TD");
  data.textContent += "Total:";
  data.setAttribute("colspan", "2");
  data.classList.add("totalSales");
  row.appendChild(data);

  data = document.createElement("TD");
  data.textContent += `$${salesTotal.toFixed(2)}`;
  row.appendChild(data);
  container.appendChild(row);
}
