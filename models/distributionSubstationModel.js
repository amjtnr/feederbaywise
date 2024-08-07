import  mongoose from "mongoose";
import mongoosePaginate  from 'mongoose-paginate-v2';
const subStationSchema = new mongoose.Schema({   
    discom_ID: {
        type: mongoose.ObjectId,
        ref: "discoms"
    },
    zone_ID: {
        type: mongoose.ObjectId,
        ref: "dm-zones"
    },
    circle_ID: {
        type: mongoose.ObjectId,
        ref: "dm-circles"
    },
    division_ID: {
        type: mongoose.ObjectId,
        ref: "divisions"
    },
    discomName: String,
    zoneName: String,
    circleName: String,
    divisionName: String,
    substationName: String,
    subStationCode: String,
    capacityUnitSubStation: String,
    jeeName: String,
    jeeNumber: String,
    startMonth:String,
    startYear:String,
    transmissionDetail:[{
        district:String,
        subStationName:String,
        zone:String,
        circle:String,
        division:String
    }]

});

subStationSchema.plugin(mongoosePaginate);

export default mongoose.model('dm-substations', subStationSchema);
