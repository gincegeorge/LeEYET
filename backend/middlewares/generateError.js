export const generateError = (err) => {
    let error = { email: "", phone: "", password: "" }

    console.log(err.message)

    if (err.code === 11000) {

        const keys = Object.keys(err.keyValue)

        console.log(keys);

        if (keys.includes('email')) {
            error.email = "This email is already registered."
        } else if (keys.includes('phone')) {
            error.phone = 'This phone number is already registered.'
        }
    }

    if (err.message.includes("Invalid password")) {
        error.password = "Invalid password"
    }

    return error
}