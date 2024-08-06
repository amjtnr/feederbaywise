import  mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
    circle_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "dm-circles"
    },
    divisionName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('dm-divisions', divisionSchema);


