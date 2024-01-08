# QuikKart E-Commerce Application

## Introduction

The E-Commerce Application is a web-based platform designed for online shopping. It provides users with the ability to browse products, add them to a shopping cart, and complete the purchase securely. The application is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

-**User Authentication**

-`User Registration (POST /api/users)`: Allows users to register a new account with the system. -`User Login (POST /api/users/login)`: Enables users to log in securely.

-**Product Management**

-`Create Product (POST /api/products)`: Allows authorized users to add new products to the platform. -`Get All Products (GET /api/products)`: Retrieves a list of all available products.

-**Shopping Cart**

-`Add to Cart (POST /api/cart/add-to-cart)`: Allows users to add products to their shopping cart. 
-`Get User's Cart (GET /api/cart/get-cart)`: Retrieves the contents of the user's shopping cart. 
-`Remove from Cart (POST /api/cart/remove-from-cart)`: Enables users to remove items from their cart.

-**Order Management**

-`Place Order (POST /api/orders/place-order)`: Allows users to place an order for items in their cart. 
-`Get User's Orders (GET /api/orders/user-orders)`: Retrieves a list of orders placed by the current user. 
-`Get Order Details (GET /api/orders/:orderId)`: Retrieves details of a specific order.

**Navigation**

-`Navbar (/components/Navbar.js)`: Provides navigation links for users, including Home and Cart. 
-`React Router (/App.js)`: Manages client-side routing for a seamless user experience.

## Technologies Used

### Backend

-`Node.js`: Server-side runtime environment. 
-`Express.js`: Web application framework simplifying routing and middleware. 
-`MongoDB`: NoSQL database for storing product, cart, order, and user data. 
-`Mongoose`: ODM library for MongoDB, providing a structured interface for database interactions. 
-`JSON Web Tokens (JWT)`: Used for user authentication and authorization.

### Frontend

-`React`: JavaScript library for building user interfaces. 
-`React Router`: Used for client-side routing. 
-`React Bootstrap`: Library for responsive and visually appealing UI components.

## Security

User data and passwords are securely stored in the MongoDB database.
**JSON Web Tokens (JWT)** are used for user authentication and authorization.

## Conclusion

The E-Commerce Application aims to provide users with a secure and user-friendly platform for online shopping, leveraging the MERN stack for efficient development and modern technologies for enhanced functionality.


## Screenshot

**Home**
![image](https://github.com/abhinabadutta2019/mern-ecommerce-react-frontend-assign/assets/118996650/adca1038-cc99-4c44-ae25-6c1dc05eac57)

**Cart**
![image](https://github.com/abhinabadutta2019/mern-ecommerce-react-frontend-assign/assets/118996650/eabbd2bc-a72d-47ff-b444-f426b47c287f)


**Login**
![image](https://github.com/abhinabadutta2019/mern-ecommerce-react-frontend-assign/assets/118996650/df1ebcba-78fd-4a22-946e-0a3af8a3cb8b)

**Register**

![image](https://github.com/abhinabadutta2019/mern-ecommerce-react-frontend-assign/assets/118996650/601fb07e-d4e2-40ed-817a-a5d36615837e)



