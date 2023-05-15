import { generateError } from "../middlewares/generateError.js";
import { signupPersistance } from "../persistance/signupPersistance.js";
import { createToken, hashPassword } from "./helpers/authHelpers.js";

export const singUpInteractor = async (name, email, password, address, profileImg) => {
    const hashedPass = await hashPassword(password)

    const data = await signupPersistance(name, email, hashedPass, address, profileImg)

    if (data.status) {
        const token = await createToken(data?.userId)
        return { status: true, token }
    } else {
        const error = await generateError(data)
        return { status: false, error }
    }

}

