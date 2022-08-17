const express = require("express");
const LoginRouter = express.Router();
const { createAccessJwt, createRefreshJwt } = require('../utils/jwt')
const { userAuthorization } = require("../middleware/authorization.middleware")
// requiring the insert query from user/modal/user.modal
const { insert, getUserByEmail, getUserByID , storeUpdatedPassword} = require('../user/model/user.model')

LoginRouter.all("/", (req, res, next) => {
    res.json({
        message: "return user router"
    })
    next();
})

// import hassedpasswordfunc
const { hassedPassFunc } = require('../utils/BrcyptingPassword')

// create new user coming to webPage;
LoginRouter.post('/register', async (req, res) => {
    const { username,fullname,email, password } = req.body;
    let hasedPassword = await hassedPassFunc(password)
    console.log(hasedPassword)
    try {

        const result = await insert({ username,fullname,email, password: hasedPassword })
        console.log(result);
        return res.json({
            message: 'user inserted', result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'error in inserting data',
            message:error.message

        })

    }
})


// create  userLogin Route
// check if user is there in DB through email and bcrypt compare and create jwt tokens
const { ComparePassword } = require('../utils/BrcyptingPassword')
LoginRouter.post('/login', async (req, res) => {
    console.log(ComparePassword, "this is comparePassword function");
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ status: "failed", message: "login unsuccessful" })
        }
        const user = await getUserByEmail(email);
        console.log("user from database is:", user);
        const passwordFromDatabase = user && user._id ? user.password : null;
        console.log(passwordFromDatabase, email);

        // if user and user's passsword exists than comparePassword using bcrypt
        if (user && user.password) {
            const result = await ComparePassword(password, passwordFromDatabase)
            if (result) {

                // making two tokens with jwt 
                const accessToken = await createAccessJwt(user.email, `${user._id}`);

                const refreshToken = await createRefreshJwt(user.email, `${user._id}`);
                return res.json({ status: 'success', message: 'login succesfully', accessToken, refreshToken })
            }

            // console.log(result);
        } else {
            console.log("User not Found or User password invalid");
           return res.json({ status: 'error', message: 'User not Found or User password invalid' })
        }

    } catch (error) {
        console.log(error)
    }
    // res.json({status:"success",message:"login successully"})

})

// Get user profile router with authorization access token and also delete the expired accesstoken from redisdb
LoginRouter.get("/user", userAuthorization, async (req, res) => {
    // suppose this data coming from client form
    try {
        const id = req.userid;
        const getUser = await getUserByID(id)
        console.log(getUser);
        res.json({ user:{fullname:getUser.fullname, email:getUser.email,username:getUser.username},message:"user is authorized"})
    } catch (error) {
        console.log(error);
    }
})









module.exports = LoginRouter