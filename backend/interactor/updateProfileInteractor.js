import { updateProfilePersistance } from "../persistance/updateProfilePersistance.js";
import { getUserInteractor } from "./getUserInteractor.js";

export const updateProfileInteractor = async (cookie, data) => {
    const user = await getUserInteractor(cookie)
    const userId = user.id
    delete data.cookie;
    return await updateProfilePersistance(userId, data)
}