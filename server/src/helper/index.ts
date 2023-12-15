import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, salt) => {
            if(error) reject(error)
            bcrypt.hash(password, salt, (error, hash) => {
                if(error) return reject(error)
                resolve(hash)
            })
        })
    }) 
}