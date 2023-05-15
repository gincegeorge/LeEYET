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

/**
 * @param {string} jwtToken
 * @returns {boolean} 
 */
const verifyJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        try {
            const userData = await user.findOne({ _id: decoded.id })
            if (userData) {
                return true
            } else {
                throw new Error(`Could not find user`)
            }
        } catch (error) {
            log(error)
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}


export {
    createToken,
    hashPassword,
    comparePassword,
    verifyJWT
}