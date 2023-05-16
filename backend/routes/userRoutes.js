import express from "express";
import { getUserData, login, signUp, updateProfileImg, updateProfile } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)

router.post('/user-data', getUserData)

router.post('/api/images', upload.any('Image'), updateProfileImg)
router.post('/api/update-profile', updateProfile)


export { router } 