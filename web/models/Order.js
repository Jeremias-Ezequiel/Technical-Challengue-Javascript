export class Order {
  constructor(client = "", productId = "", quantity = "", total = "") {
    this.client = client;
    this.productId = productId;
    this.quantity = quantity;
    this.total = total;
  }

  isValid() {
    return (
      this.client !== "" &&
      this.productId !== "" &&
      this.quantity !== "" &&
      this.total !== ""
    );
  }
}
