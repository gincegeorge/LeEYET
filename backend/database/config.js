import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { MONGO_URI } = process.env

const connectDb = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Successfully connected to database')
        })
        .catch((err) => {
            console.log('database connection failed. exiting now...', err)
            process.exit(1);
        })
}

export default connectDb;
 
 
