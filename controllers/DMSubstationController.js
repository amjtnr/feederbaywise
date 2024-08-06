import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import discomModel from "../models/discomModel.js";
import zoneModel from "../models/distributionZoneModel.js";
import circleModel from "../models/distributionCirclesModel.js";
import divisionModel from "../models/distributionDivisionModel.js";
import substationModel from "../models/distributionSubstationModel.js";

export const exportController = async (req,res,next) => {

    try{


        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const results = [];
        const filePath = path.join(__dirname, '../data/distribution/substation/DistributionSubStation.csv');
        
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
             
              const discomN =   await  discomModel.findOne({discomName:data['Discom']}); 
              const zoneN =   await  zoneModel.findOne({zoneName:data['Zone']}); 
              const circleN =   await  circleModel.findOne({circleName:data['Circle']}); 
              const divisionN =   await  divisionModel.findOne({divisionName:data['Division']}); 
              if(divisionN !==null && divisionN !=""){
                let payload = {
                   "discom_ID":discomN._id,
                   "zone_ID":zoneN._id,
                   "circle_ID":circleN._id,
                  "division_ID":divisionN._id,
                  "divisionName":data['Division'],
                  "discomName":data['Discom'],
                  "zoneName":data['Zone'],
                  "circleName":data['Circle'],
                  "substationName":data['Substation'],
                  "subStationCode":data['DistributionSubStationCode'],
                  "capacityUnitSubStation":data['CapacityOfUnitSubStation'],
                  "jeeName":data['JuniorEngineerName'],
                  "jeeNumber":data['JuniorEngineerMobileNumber']
                }
                let substation =  await  substationModel.create(payload);   

              }else{
                results.push(data['Circle'])              
              }               
                    

            } catch (error) {
              console.error('Error processing data:', error);
              // Optionally, you can add error handling logic here.
            }
          })
          .on('end', () => {
            //console.log(results)
           res.status(200).json({ message: "Successfully processed", results });
          });

    
    }catch(error){
        return res.status(500).send({message:"Export issue "+error,status:false,statusCode:500,user:[],errorMessage:error});
    }
}

export const listDMSubStationController = async(req,res,next)=>{
  try{
    const pageNumber = req.body.page || 1;
    const pageSize = req.body.pageSize || 200;
   
    var searchStr = {}

    await substationModel.paginate(searchStr , { page: pageNumber, limit: pageSize,sort:{_id:-1}  }, (err, result) => {
    if (err) {
        return res.status(404).send({message:"Error occurred while fetching records",status:404,records:[]});
    }
    const { docs, totalDocs, limit, page, totalPages,prevPage,nextPage    } = result;
    return res.status(200).send({ status:200,records: docs, Total:totalDocs, Limit:limit, Page:page, pages:totalPages,prevPage:prevPage, nextPage:nextPage});
    });

}catch(error){
    return res.status(500).send({message:"error occured",status:500,errorMessage:error,records:[]});
}


}