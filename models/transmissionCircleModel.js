import  mongoose from "mongoose";

const circleSchema = new mongoose.Schema({  
    zone_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "tm-zones"
    },     
    circleName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('tm-circles', circleSchema);

