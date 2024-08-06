import  mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({  
    discom_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "discoms"
    },     
    zoneName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('dm-zones', zoneSchema);

