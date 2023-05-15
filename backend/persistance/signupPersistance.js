import userModel from "../database/models/userModel.js"

export const signupPersistance = async (name, email, password,) => {
    console.log(name, email, password);
    try {
        const user = await userModel.create({ name, email, password })
        console.log(user);

        return { userId: user.id, status: true }
    } catch (error) {
        error.status = false
        console.log(error)
        return error
    }

}