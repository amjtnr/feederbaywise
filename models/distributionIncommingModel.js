import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const incommingFeederSchema = new mongoose.Schema({   
    divisionName: String,
    substationName: String,
    feederName: String,
    feederVoltage: String,
    meterMake: String,
    meterSLNo: String,
    overAllMF:String,
    isDeleted:{
        type: Number,
        default: 0
    }
});

incommingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-incomming-feeders', incommingFeederSchema);
