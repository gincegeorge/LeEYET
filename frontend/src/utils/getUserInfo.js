import axios from "axios";

export const getUserInfo = async (cookie) => {
    try {
        const { data } = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "user-data",
            { cookie: cookie }
        );
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}