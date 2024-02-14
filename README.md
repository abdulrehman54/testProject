# testProject

# Command to Run the project

> npm i
> npm run start

# Command to run the unit test cases

> npm run test

# Project Details

- Created Movie API having three routes

1. Create Movie (post: api/movies)
2. Get a specific movie (get: api/movies/:movieId)
3. Get list of movies (get: api/movies)

Created this api using route->controller->services
Used Express-validator to validate the data.

- Authentication and Authorization
  for achieving this, i have created three middle-wares

1. GenerateToken
   This middleware create a token and set in request header. Instead of creating an route for getting token and then set in requests. I used this middleware which will set token in the request where it will used
2. Authentication
   This middleware check validity of token and set decoded token in request.
3. Auth
   This middleware contain grantAccess function to authorize the route. I am simply checking if there is token in request then allow the request move forward. We can change the logic of authorization according to our project.

- Unit test cases

  I have used Mocha with chai.js to write unit test cases
  In test directory, movies.test.js file contain the test cases for the created API.
