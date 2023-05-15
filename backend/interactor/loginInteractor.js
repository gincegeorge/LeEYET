import { generateError } from "../middlewares/generateError.js";
import { loginPersistance } from "../persistance/loginPersistance.js";
import { comparePassword, createToken } from "./helpers/authHelpers.js";

export const loginInteractor = async (email, password) => {
    const userData = await loginPersistance(email, password)

    if (userData) {
        try {
            const isValid = await comparePassword(password, userData.password)

            if (isValid) {
                const token = await createToken(userData.id)
                return { created: true, token }
            }

        } catch (err) {
            const error = generateError(err)
            return { created: false, error }
        }
    } else {
        const error = {
            email: "Invalid email"
        }
        return { created: false, error }
    }
}