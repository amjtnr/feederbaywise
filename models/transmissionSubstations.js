import  mongoose from "mongoose";

const circleSchema = new mongoose.Schema({  
    zone_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "tm-zones"
    },     
    circle_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "tm-circles"
    },     
    division_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "tm-divisions"
    },     
    divisionName: String,
    substationName: String,
    districtName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('tm-substations', circleSchema);

