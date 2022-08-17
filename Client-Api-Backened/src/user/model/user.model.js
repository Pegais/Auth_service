// here in user.model ,we will write queries to the database;
const { UserSchema } = require('./use.schema')

// insert query
const insert = (userObj) => {
    return new Promise((resolve, reject) => {

        UserSchema(userObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

// getting userEmail from Database;

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            if (!email) {
                return false;
            }
            UserSchema.findOne({ email }, (error, data) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            })

        } catch (error) {
            console.log(error)

        }


    })
}
const getUserByID = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            if (!_id) {
                return false;
            }
            UserSchema.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(data)
                }
            })

        } catch (error) {
            console.log(error)

        }


    })
}

const storeRefreshJWT = (_id, token) => {
    console.log(_id,typeof id);
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findByIdAndUpdate(
                { _id },
                {
                    $set: {
                        "refreshJWT.token": token,
                        "refreshJWT.addedAt": Date.now()
                    }
                },
                {new:true}
            ).then((data) => resolve(data))
                .catch((error) => {
                    reject(error)
                    console.log(error);
                })
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    insert,
    getUserByEmail,
    storeRefreshJWT,
    getUserByID
    

};
