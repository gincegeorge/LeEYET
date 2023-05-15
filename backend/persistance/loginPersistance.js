import userModel from "../database/models/userModel.js";

export const loginPersistance = async (email) => {
    const userData = await userModel.findOne({ email })
    return userData
}

export const getUserById = async (id) => {
    try {
        const userData = await userModel.findOne({ _id: id })
        return userData
    } catch (error) {
        return false
    }
}