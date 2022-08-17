const express = require("express");
const tokenRouter = express.Router();
const { refreshJWT, createAccessJwt} = require("../utils/jwt")
const { getUserByEmail } =require("../user/model/user.model")

//    this is for refresh token
tokenRouter.get("/fresh-access-jwt", async(req, res, next) => {
    try {
        const { authorization } = req.headers
        // now check if token is valid.
        const result = await refreshJWT(authorization)
        console.log(result);
    // check if it exists in thedatabase.
        const user = await getUserByEmail(result.payload)
        if (user._id) {
            //     message:tokenCreated
            let tokenExp = user.refreshJWT.addedAt;
            let dbrefreshtoken = user.refreshJWT.token;

           
            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_TOKEN_EXP_DAY)
            const today = new Date();
            // console.log(today);
            if (dbrefreshtoken!==authorization && tokenExp < today) {
                return res.status(401).json({ message: "Forbidden" })
            } 
            const accessToken = await createAccessJwt(result.payload, user._id)
            res.json({ status: "success", message: accessToken })
            
            
        }
    //   return  res.status(403).send({message:"Forbidden"})
    } catch (error) {
     console.log(error);   
    }
})




module.exports=tokenRouter