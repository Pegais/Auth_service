This is Auth_Service Backened API.
<!-- 

   Make sure to install nodemon as a dev-dependencies.
   git clone 
   and npm start

 -->

Routers Used----LoginRouter  and tokenRouter
<!-- LoginRouter Api ('/auth/user)
          |Routers               |reuqet-type   |isPrivate  |description
    1.     | /auth/register      | Post      | NO   | register new user 
    2.     | '/auth/login'  |    POST       |     NO   |       verify user authentication and return JWT
    3.     | '/auth/profile  | GET  | YES  |  get user info from Jwt passing as a middleware called userAuthorization.
    4.     | /token/fresh-access-jwt  | GET | NO | get refresh token from mongodb and create new acesstoken and give to the client against the expired access token.






 -->


