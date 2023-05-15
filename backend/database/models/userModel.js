import { Schema, model } from 'mongoose'
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']

    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    address: {
        type: String,
    },
    profileImg: {
        type: String
    }
})


const userModel = model('User', userSchema, 'user')

export default userModel