import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';

const discomSchema = new mongoose.Schema({
    discomName: String,
    discomCode: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});
discomSchema.plugin(mongoosePaginate);

export default mongoose.model('discoms', discomSchema);

