export class Order {
  static lastId = 0;
  constructor(client, productId, quantity, total) {
    this.id = ++Order.lastId;
    this.client = client;
    this.productId = productId;
    this.quantity = quantity;
    this.total = total;
  }
}
