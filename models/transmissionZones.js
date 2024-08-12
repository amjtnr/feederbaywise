import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const zoneSchema = new mongoose.Schema({     
    zoneName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});
zoneSchema.plugin(mongoosePaginate);
zoneSchema.plugin(aggregatePaginate);

export default mongoose.model('tm-zones', zoneSchema);

