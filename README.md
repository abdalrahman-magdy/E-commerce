# E-commerce API  

**Description:**  
This is a RESTful API for managing an e-commerce application. It includes features such as user authentication, product management, category and brand handling, shopping cart operations, order processing, and review functionality.  

---

## Features  

- **User Authentication**:  
  Secure login and signup with token-based authentication using **JWT**.  

- **Product Management**:  
  Create, update, retrieve, and delete products with associated categories, subcategories, and brands.  

- **Category and Subcategory Management**:  
  Manage product categories and subcategories for better organization.  

- **Cart and Wishlist**:  
  Add and remove items from a shopping cart or wishlist.  

- **Order Processing**:  
  Create and manage orders with optional coupon discounts.  

- **Review System**:  
  Users can leave, update, or delete reviews for purchased products.  

---

## API Endpoints  

### **Authentication**  

- **Sign Up**:  
  `POST /auth/signup`  
  Register a new user.  

- **Login**:  
  `POST /auth/login`  
  Authenticate a user and return a JWT.  

---

### **Category Management**  

- **Add Category**:  
  `POST /categories`  
  Add a new category with an image.  

- **Get All Categories**:  
  `GET /categories`  
  Retrieve all categories.  

- **Get Category**:  
  `GET /categories/:slug`  
  Retrieve a single category by slug.  

- **Update Category**:  
  `PATCH /categories/:name`  
  Update an existing category.  

- **Delete Category**:  
  `DELETE /categories/:id`  
  Delete a category by its ID.  

---

### **Product Management**  

- **Add Product**:  
  `POST /products`  
  Add a new product with details, images, and associated categories.  

- **Get All Products**:  
  `GET /products`  
  Retrieve a list of all products.  

- **Get Product**:  
  `GET /products/:id`  
  Retrieve a product by its ID.  

- **Update Product**:  
  `PATCH /products/:id`  
  Update product details.  

- **Delete Product**:  
  `DELETE /products/:id`  
  Delete a product by its ID.  

---

### **Cart Management**  

- **Add to Cart**:  
  `POST /cart`  
  Add a product to the cart with specified quantity.  

- **View Cart**:  
  `GET /cart`  
  Retrieve all items in the cart.  

- **Remove from Cart**:  
  `DELETE /cart/:productId`  
  Remove a product from the cart by its ID.  

---

### **Order Management**  

- **Create Order**:  
  `POST /order`  
  Place a new order with optional coupon codes.  

- **View Orders**:  
  `GET /order`  
  Retrieve all orders placed by the user.  

---

### **Review Management**  

- **Add Review**:  
  `POST /review/:productId`  
  Add a review for a product.  

- **Update Review**:  
  `PATCH /review/:reviewId`  
  Update an existing review.  

- **Delete Review**:  
  `DELETE /review/:reviewId`  
  Remove a review by its ID.  

---

## Technologies Used  

- **Node.js**  
- **Express**  
- **JWT**  
- **MongoDB**  

---
