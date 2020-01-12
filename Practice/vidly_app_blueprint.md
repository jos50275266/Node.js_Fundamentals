models:
- customer: name, phone, isGold
- genre: name
- movie: title, genre, numberInStock, dailyRentalRate
- rental: customer, movie, dateOut, dateReturned, rentalFee
- user: name, email, password, isAdmin

middleware:
- admin: user model's isAdmin property
- auth: valid jsonwebtoken
- error: try...catch
- validateObjectId: req.params.id type check

helper:
- logger: winston

routes:
- genres
    - GET /api/genres
    - POST /api/genres - middleware: auth
    - PUT /api/genres/:id - middleware: auth, validateObjectId
    - DELETE /api/genres/:id - middleware: auth, admin, validateObjectId

- movies
    - GET /api/movies
    - POST /api/movies
    - PUT /api/movies/:id
    - DELETE /api/movies/:id

- users
    - GET /api/users/me - middleware: auth, admin
    - POST /api/users 

- customers
    - GET /api/customers
    - POST /api/customers
    - PUT /api/customers/:id 
    - DELETE /api/customers/:id

- rentals
    - GET /api/rentals
    - POST /api/rentals
    - PUT /api/rentals/:id

- auth
    - POST /api/auth