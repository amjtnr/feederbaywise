import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import zoneModel from "../models/transmissionZones.js";
import circleModel from "../models/transmissionCircleModel.js";
import divisionModel from "../models/transmissioDivision.js";

export const exportDivisionController = async (req,res,next) => {

  try{


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/transmission/transmissionDivision.csv');
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data',  async(data) => {
        try {
         
          const result1 =   await  zoneModel.findOne({zoneName:data['Zone']}); 
          const result2 =   await  circleModel.findOne({circleName:data['Circle']}); 
          if(result1 !==null && result1 !=""){
            let payload = {
              "zone_ID":result1._id,
              "circle_ID":result2._id,
              "divisionName":data['Division']
            }
            let divisionns =  await  divisionModel.create(payload);   

          }else{
            //results.push(data['Division'])
            console.log(data['Circle'])
          }               
                

        } catch (error) {
          //console.error('Error processing data:', error);
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
