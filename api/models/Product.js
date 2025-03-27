export class Product {
  static lastId = 0;

  constructor(name, price, stock) {
    this.id = ++Product.lastId;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
