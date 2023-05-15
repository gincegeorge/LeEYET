import express from "express";
import { getUserData, login, signUp, updateProfile } from "../controllers/userController.js";

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/user-data', getUserData)
router.post('/update', updateProfile)

export { router } 