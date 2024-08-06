import  mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({     
    zoneName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('tm-zones', zoneSchema);

