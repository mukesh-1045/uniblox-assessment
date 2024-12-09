## **Features**

### **User Features**

- Add items to your cart and checkout seamlessly.
- Automatically receive a discount coupon for every nth order.
- Apply valid discount codes during checkout to save money.

### **Admin Features**

- Generate discount codes automatically after every nth order.
- View store statistics, including:
  - Total items purchased.
  - Total purchase amount.
  - List of discount codes issued.
  - Total discounts given.

---

## **Tech Stack**

- **Backend Framework**: Node.js (Express.js)
- **Database**: In-memory store (e.g., JavaScript objects) for simplicity.
- **Security**:
  - **CORS**: Handles cross-origin resource sharing.
  - **Rate Limiting**: Prevents abuse by limiting API requests.
- **Validation**: Comprehensive input validation using `Joi`.

---

## **Setup Instructions**

### **Prerequisites**

Ensure the following tools are installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/uniblox-assessment.git
   cd uniblox-assessment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

4. Run tests:
   ```bash
   npm test
   ```

---

## **API Documentation**

### **User APIs**

#### **1. Add Item to Cart**

**Endpoint**: `POST /v1/cart/add`  
**Request Body**:

```json
{
	"itemId": "item1",
	"quantity": 2
}
```

**Response**:

```json
{
	"message": "Item added to cart successfully."
}
```

#### **2. Checkout**

**Endpoint**: `POST /v1/cart/checkout`  
**Request Body**:

```json
{
	"discountCode": "DISCOUNT10" // Optional
}
```

**Response**:

```json
{
	"message": "Order placed successfully.",
	"orderDetails": {
		"orderId": "12345",
		"totalAmount": 90,
		"discountApplied": 10
	}
}
```

---

### **Admin APIs**

#### **1. Generate Discount Code**

**Endpoint**: `POST /v1/admin/generate`  
**Response**:

```json
{
	"message": "Discount code generated successfully.",
	"discountCode": "DISCOUNT123"
}
```

#### **2. View Store Statistics**

**Endpoint**: `GET /v1/admin/stats`  
**Response**:

```json
{
	"totalItemsPurchased": 50,
	"totalPurchaseAmount": 5000,
	"discountCodes": ["DISCOUNT123", "DISCOUNT456"],
	"totalDiscountGiven": 500
}
```

---

## **Testing**

This project includes tests for all major features. To run the tests, use:

```bash
npm test
```

The tests cover:

- Adding items to the cart.
- Checkout process, including discount validation.
- Admin APIs for generating discount codes and fetching statistics.

---

## **Project Structure**

```
uniblox-assessment/
├── routes/          # API routes
│   ├── cart.js
│   ├── admin.js
├── services/        # Business logic
│   ├── cartService.js
│   ├── adminService.js
├── tests/           # Unit and integration tests
│   ├── cart.test.js
│   ├── admin.test.js
├── server.js        # Entry point of the application
├── README.md        # Documentation
├── package.json     # Dependencies and scripts
```

Happy coding! 🚀
