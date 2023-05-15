import { getUserInteractor } from "../interactor/getUserInteractor.js";
import { loginInteractor } from "../interactor/loginInteractor.js";
import { singUpInteractor } from "../interactor/singUpInteractor.js";

const signUp = async (req, res) => {
    const { name, email, password } = req.body

    let address = " "
    let profileImg = " "

    const userData = await singUpInteractor(name, email, password, address, profileImg)

    if (userData.status) {
        res.status(201).json({ token: userData?.token, created: true })
    } else {
        res.status(409).json({ created: false, error: userData.error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    const userData = await loginInteractor(email, password)

    console.log(userData);

    if (userData?.created) {
        res.status(201).json(userData)
    } else {
        res.status(409).json(userData)
    }
}

const getUserData = async (req, res) => {
    const cookie = req.body.cookie
    const user = await getUserInteractor(cookie)
    if (user) {
        res.status(201).json({ userFound: true, user })
    } else {
        res.status(409).json({ userFound: false })
    }
}

const updateProfile = async (req, res) => {
    console.log(req.files);
}

export { signUp, login, getUserData, updateProfile }