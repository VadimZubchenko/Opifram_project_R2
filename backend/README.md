# Description
Rest API for Kahvikauppa.

#### General information  
`./routers` holds the controllers used for routes.    
`./services` holds the services used for routes functionality.    
`./models` holds the database models.  
`./utils.js` holds useful functions for simple validations and such.    
`./config.js` inits environment variables.    
`./errorDefinitions.js` holds error definitions to handle them explicitly in middleware.    
`./middleware.js` holds useful middlewares.    

# Usage

1. `$ npm install` to install the dependencies.
2. `$ npm run dev` to run the API in development mode. 

# API

#### GET
`/api/product` returns a list of `products`.  
`/api/product/:id` returns a single `product` by given `id`.  
`/api/user` returns a list of `users`.  
`/api/user/:id` returns a single `user` by given `id`.  

#### POST
`/api/auth/login` returns an `access token` and `user object`.  
`/api/product` creates and returns a single `product`.   
`/api/user` creates and returns a single `user`.   

#### PUT
`/api/product/:id` updates and returns a single `product` by given `id`.   
`/api/user/:id` updates and returns a single `user` by given `id`.   

#### DELETE
`/api/product/:id` deletes and returns a single `product` by given `id`.   
`/api/user/:id` deletes and returns a single `user` by given `id`.     