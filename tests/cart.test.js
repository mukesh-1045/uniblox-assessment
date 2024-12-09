const request = require("supertest");
const app = require("../server");
const store = require("../data/store");

describe("Cart and Checkout APIs", () => {
  let server;
  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });
  beforeEach(() => {
    store.carts = {};
    store.orders = [];
    store.coupons = {};
  });

  test("should add items to the cart", async () => {
    const response = await request(server)
      .post("/v1/cart")
      .send({ userId: "user1", itemId: "item1", quantity: 2, price: 50 });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("cart");
    expect(response.body.cart).toHaveLength(1);
  });

  test("should checkout successfully", async () => {
    store.carts["user1"] = [{ itemId: "item1", quantity: 2, price: 50 }];

    const response = await request(server).post("/v1/cart/checkout").send({ userId: "user1" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("orderId");
    expect(store.orders).toHaveLength(1);
  });

  test("should apply a valid coupon during checkout", async () => {
    store.carts["user1"] = [{ itemId: "item1", quantity: 2, price: 50 }];
    store.coupons["COUPON-5"] = { isValid: true, discountPercent: 10 };

    const response = await request(server)
      .post("/v1/cart/checkout")
      .send({ userId: "user1", couponCode: "COUPON-5" });
    expect(response.statusCode).toBe(200);
    expect(response.body.discount).toBe(10);
  });

  test("should return an error for an invalid coupon during checkout", async () => {
    store.carts["user1"] = [{ itemId: "item1", quantity: 2, price: 50 }];

    const response = await request(server)
      .post("/v1/cart/checkout")
      .send({ userId: "user1", couponCode: "INVALID-COUPON" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid coupon code");
  });
});
