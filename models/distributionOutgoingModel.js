import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const outgoingFeederSchema = new mongoose.Schema({   
    divisionName: String,
    substationName: String,
    feederName: String,
    isDeleted:{
        type: Number,
        default: 0
    },
    feederDetails: [{
        feederVoltage:String,
        outgoingFeederName:String,
        feederCategory:String,
        projectArea:String,
        supplyArea:String,
        feederCode:String,
        meterMake:String,
        meterSLNo:String,
        noOfConsumers:String,
        overallMF:String
    }]
});

outgoingFeederSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-outgoing-feeders', outgoingFeederSchema);
