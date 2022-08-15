import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamps: String,
    recieved: Boolean
});

export default mongoose.model("messagecontents",messageSchema)