import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';

const districtSchema = new mongoose.Schema({     
    districtName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});
districtSchema.plugin(mongoosePaginate);

export default mongoose.model('tm-districts', districtSchema);

