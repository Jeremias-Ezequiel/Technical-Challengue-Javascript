import fs from "node:fs/promises";
import path from "node:path";

const orderPath = path.join("data", "orders.json");

export class Order {
  static newId = 1;

  constructor(client, productId, quantity, total) {
    this.id = Order.newId++;
    this.client = client;
    this.productId = productId;
    this.quantity = quantity;
    this.total = total;
  }
}
