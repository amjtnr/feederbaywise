import  mongoose from "mongoose";

const districtSchema = new mongoose.Schema({     
    districtName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

export default mongoose.model('tm-districts', districtSchema);

