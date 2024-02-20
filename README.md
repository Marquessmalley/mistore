
Copy code
# Ecommerce Website - MERN Stack

## Project Overview

An ecommerce website built with the MERN (MongoDB, Express, React, Node.js) stack. This platform enables users to browse products, add items to their cart, and securely complete transactions. Key features include user authentication, payment integration, and an admin dashboard for managing products and orders.

## Getting Started

## Demo


https://github.com/Marquessmalley/mistore/assets/64483216/d917583a-bdae-4d71-9059-ef097d8e5e3f



## Clone Repo
```
git clone https://github.com/Marquessmalley/mistore.git
```

### Server Setup

1. Run the following command to install server dependencies:
```
$ npm install
$ cd server
$ npm run start:dev
```

2. Create a .env file in the server root directory with the following environment variables:
```
DATABASE = your_db_key,
DOMAIN = your_clien_domain,
NODE_ENVIRONMENT = you_environment,
REFRESH_TOKEN_SECRET = your_refresh_token,
STRIPE_SECRET_KEY = your_stripe_secret_key,
```

### Client Setup

Navigate to the client directory:

1. Run the following command to install client dependencies:
```
cd client
npm install
npm run start
```
 
2. Create a .env file in the client directory with the following environment variables:
```
REACT_APP_BACKEND_DOMAIN = your_backend_domain, 
REACT_APP_FRONTEND_DOMAIN = your_frontend_domain, 
REACT_APP_STRIPE_PUBLISHABLE_KEY = your stripe_publishable_key
```

Contributing
If you'd like to contribute to this project, please follow the contributing guidelines.

License
This project is licensed under the MIT License.


Feel free to further modify the content based on your specific project details and preferences.





