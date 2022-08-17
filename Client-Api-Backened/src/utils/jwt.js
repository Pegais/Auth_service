var jwt = require('jsonwebtoken');
const { setJwt, getJwt } = require("./redis.helper")

const {storeRefreshJWT} =require("../user/model/user.model")
const createAccessJwt = async (payload, id) => {
    console.log(payload,id,"from createAccessJwt.js");
    try {
        var accessToken =  jwt.sign({ payload }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5m' });
         setJwt(accessToken,`${id}`)
        return Promise.resolve(accessToken)
    } catch (error) {
        return Promise.reject(error)
    }
}

const createRefreshJwt = async(payload,_id) => {
    
   try {
    var refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
    await  storeRefreshJWT(_id,refreshToken)
     return Promise.resolve(refreshToken)
   } catch (error) {
    return Promise.reject(error)
   }
}

const verifyJWT = givenToken => {
    try {
        return Promise.resolve(jwt.verify(givenToken,process.env.JWT_ACCESS_TOKEN))
    } catch (error) {
        return Promise.resolve(error)
    }
}
const refreshJWT = givenToken => {
    try {
        return Promise.resolve(jwt.verify(givenToken,process.env.JWT_REFRESH_TOKEN))
    } catch (error) {
        return Promise.resolve(error)
    }
}

module.exports = {
    createAccessJwt,
    createRefreshJwt,
    verifyJWT,
    refreshJWT
}

