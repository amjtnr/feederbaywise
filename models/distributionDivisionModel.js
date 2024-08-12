import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const divisionSchema = new mongoose.Schema({
    circle_ID: {
        type: mongoose.ObjectId,
        required: true,
        ref: "dm-circles"
    },
    divisionName: String,
    isDeleted:{
        type: Number,
        default: 0
    }
});
divisionSchema.plugin(mongoosePaginate);
divisionSchema.plugin(aggregatePaginate);

export default mongoose.model('dm-divisions', divisionSchema);


