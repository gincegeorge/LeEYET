import userModel from "../database/models/userModel.js"

export const signupPersistance = async (name, email, password, address, profileImg) => {
    console.log(name, email, password, address, profileImg);
    try {
        const user = await userModel.create({ name, email, password, address, profileImg })
        console.log(user);

        return { userId: user.id, status: true }
    } catch (error) {
        error.status = false
        console.log(error)
        return error
    }

}