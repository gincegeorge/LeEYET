import { getUserById } from "../persistance/loginPersistance.js";
import { validateToken } from "./helpers/authHelpers.js";

export const getUserInteractor = async (token) => {
    const decoded = await validateToken(token)
    if (decoded) {
        const user = await getUserById(decoded.id)
        return user
    } else {
        return false
    }
} 