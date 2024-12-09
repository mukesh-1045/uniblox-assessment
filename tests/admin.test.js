const request = require("supertest");
const app = require("../server");
const store = require("../data/store");

describe("Admin APIs", () => {
  let server;
  beforeAll(() => {
    server = app.listen(5000);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    store.orders = [];
    store.coupons = {};
    store.nthOrderThreshold = 5;
  });

  test("should generate a coupon after nth order", async () => {

    for (let i = 1; i <= 5; i++) {
      store.orders.push({ orderId: `ORD-${i}`, total: 100, discount: 0 });
    }

    const response = await request(server).post("/v1/admin/generate-coupon");
    expect(response.statusCode).toBe(201);
    expect(response.body.coupon).toHaveProperty("couponCode", "COUPON-5");
    expect(store.coupons["COUPON-5"]).toBeDefined();
  });

  test("should return error when nth order condition is not met", async () => {

    for (let i = 1; i <= 4; i++) {
      store.orders.push({ orderId: `ORD-${i}`, total: 100, discount: 0 });
    }

    const response = await request(server).post("/v1/admin/generate-coupon");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Coupon generation condition not met");
  });

  test("should return store statistics", async () => {

    store.orders.push(
      {
        orderId: "ORD-1",
        total: 100,
        discount: 10,
        couponCode: "COUPON-1",
        items: [{ itemId: "item1", quantity: 2, price: 50 }],
      },
      {
        orderId: "ORD-2",
        total: 200,
        discount: 0,
        couponCode: null,
        items: [{ itemId: "item2", quantity: 4, price: 50 }],
      }
    );

    const response = await request(server).get("/v1/admin/stats");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      totalItemsPurchased: 6,
      totalPurchaseAmount: 300,
      couponCodesUsed: ["COUPON-1"],
      totalDiscountAmount: 10,
    });
  });
});
