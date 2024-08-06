import  mongoose from "mongoose";

const circleSchema = new mongoose.Schema({
    zone_Id: {
        type: mongoose.ObjectId,
        required: true,
        ref: "dm-zones"
    },
    circleName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});


export default mongoose.model('dm-circles', circleSchema);
