# Description

Rest API for Kahvikauppa.

#### General information  

`routers` holds the controllers used for routes.    
`services` holds the services used for routes functionality.    
`models` holds the database models.  
`utils.js` holds useful functions for simple validations and such.    
`config.js` inits environment variables.    
`errorDefinitions.js` holds error definitions to handle them explicitly in middleware.    
`middleware.js` holds useful middlewares.    

# Usage

1. `$ npm install` to install the dependencies.
2. `$ npm run dev` to run the API in development mode. 

# API

### GET

`/api/product` returns a list of `products`.  
`/api/product/:id` returns a single `product` by given id.  

`/api/user` returns a list of `users`.  
`/api/user/:id` returns a single `user` by given id.  

`/api/order` returns a list of `orders`.  
`/api/order/:id` returns a single `order` by given id.  
`/api/order/user/:id` returns a list of `user orders` by given user id.  

### POST

##### `/api/auth/login`   
Requires `email` and `password`.    
Returns an `access token` and `user` as an object.

##### `/api/auth/register`
Requires `firstName`, `lastName`, `email`, `address`, `phone` and `password`.   
Returns an `access token` and `user` as an object.

##### `/api/product`
Requires `name`, `description`, `category`, `price`, `quantity`, and `image`.   
Returns `name`, `description`, `category`, `price`, `quantity` and `image` as an object.

##### `/api/order`
Requires an `auth token` and an `array of product ids and amount`, for example: `[ { product: id, amount: number } ]`   
Returns `succesful` and `failed` order lists as an object.

### PUT

##### `/api/product/:id`
Requires `name`, `description`, `category`, `price`, `quantity`, and `image`.   
Returns `name`, `description`, `category`, `price`, `quantity` and `image` as an object.

##### `/api/user/:id`
Requires `firstName`, `lastName`, `email`, `address` and `phone`.    
Returns `firstName`, `lastName`, `email`, `address`, `phone` and `id` as an object. 

### DELETE

`/api/product/:id` deletes and returns a single `product` by given id.   

`/api/user/:id` deletes and returns a single `user` by given id.     

`/api/order/:id` deletes and returns a single `order` by given id.   