import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const subdivisionSchema = new mongoose.Schema({    
    districtName: String,   
    isDeleted:{
        type: Number,
        default: 0 
    }
});

subdivisionSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-districts', subdivisionSchema);
