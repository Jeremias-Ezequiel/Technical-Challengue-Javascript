export class Product {
  constructor(name = "", price = "", stock = "") {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  isValid() {
    return this.name !== "" && this.price !== "" && this.stock !== "";
  }
}
