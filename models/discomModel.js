import  mongoose from "mongoose";

const discomSchema = new mongoose.Schema({
    discomName: String,
    discomCode: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('discoms', discomSchema);

