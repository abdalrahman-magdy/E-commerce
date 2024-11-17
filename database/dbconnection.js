import mongoose from "mongoose"

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {

        console.log("connected to db");

    }).catch((error) => {
        console.error(error);
    })
}
export { connectDB }