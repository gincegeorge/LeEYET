import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: "",
        email: "",
        profileImg: "",
    },
    reducers: {
        checkCookie: (state, action) => {
            state.isLoggedIn = action.payload
        },
        addUserInfo: (state, action) => {
            state.name = action.payload.name,
                state.email = action.payload.email,
                state.profileImg = action.payload.profileImg,
                state.address = action.payload.address
        }
    }
})

export const { checkCookie, addUserInfo } = userSlice.actions

export default userSlice.reducer