const { verifyJWT } = require("../utils/jwt")
const {getJwt,delJwt} =require("../utils/redis.helper")
const userAuthorization =async (req, res, next) => {
   try {
    const {authorization} = req.headers
    console.log(authorization);
    // res.json(authorization)
    // verify token
    const decoded =  await verifyJWT(authorization)
    console.log(decoded,"from decoded auth")
    if(decoded.payload){
        const value = await getJwt(authorization)
        console.log("this is redisdb token", value);
        if (!value) {
           return res.status(403).json({message:"Invalid authorization token"})
           
        }
        req.userid = value;
        return next();
       } 
       delJwt(authorization)
    return res.status(403).json({message:"Invalid authorization token"})
    // checking if JWT is valid and exist in redisdb.
    // if there authorize else not authorize.
   } catch (error) {
    console.log(error);
   }
}


module.exports = {
    userAuthorization
}