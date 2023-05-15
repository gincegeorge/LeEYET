import { singUpInteractor } from "../interactor/singUpInteractor.js";

const signUp = async (req, res) => {
    const { name, email, password } = req.body

    const userData = await singUpInteractor(name, email, password)

    console.log(userData);

    if (userData.status) {
        res.cookie('jwt-user', userData?.token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(201).json({ created: true })
    } else {
        console.log(userData);
        res.status(409).json({ created: false, error: userData.error })
    }
}
export { signUp }