import userModel from "../database/models/userModel.js";

export const updateProfilePersistance = async (id, data) => {
    console.log(id, data);
    try {
        const isUpdated = await userModel.updateOne({ _id: id }, { ...data })
        if (isUpdated.modifiedCount) {
            return { updated: true }
        } else {
            return { updated: false }
        }
    } catch (error) {
        console.log(error);
        return { updated: false }
    }
}