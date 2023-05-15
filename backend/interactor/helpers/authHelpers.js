import Bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRound = process.env.BCRYPT_SALT_ROUND
const secretKey = process.env.JWT_SECRET_KEY

const createToken = (id) => {
    const data = {
        id: id,
        date: new Date()
    }
    return jwt.sign(data, secretKey)
}

const hashPassword = async (text) => {
    try {
        const salt = await Bcrypt.genSalt(parseInt(saltRound));
        const hash = await Bcrypt.hash(text, salt);
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

const comparePassword = async (Enteredpassword, dbPassword) => {
    const validPassword = await Bcrypt.compare(Enteredpassword, dbPassword)
    if (validPassword) {
        return true
    } else {
        throw new Error('Invalid password')
    }
}

const validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        return false
    }
}

export {
    createToken,
    hashPassword,
    comparePassword,
    // verifyJWT,
    validateToken
}