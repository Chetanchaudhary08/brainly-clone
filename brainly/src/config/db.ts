import mongoose from "mongoose"

const dbConnect = () => {
    mongoose.connect("mongodb+srv://chetan01:gd0YIxXXu8aHXJ5p@chetan01.9ncgjlm.mongodb.net/brainlyDB").then(() => {
        console.log("Connected Successfully")
    }).catch((err) => {
        console.log("Something Wrong", err)
    })
}

export default dbConnect