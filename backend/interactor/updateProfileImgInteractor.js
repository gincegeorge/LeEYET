import userModel from "../database/models/userModel.js"
export const updateProfileImgInteractor = async (userId, filename) => {
    try {
        const isUpdated = await userModel.updateOne({ _id: userId }, { profileImg: filename })
        if (isUpdated.modifiedCount) {
            return { updated: true, filename }
        } else {
            return { updated: false }
        }
    } catch (error) {
        console.log(error);
        return { updated: false }
    }
}