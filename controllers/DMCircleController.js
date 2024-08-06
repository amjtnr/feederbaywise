import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import circlesModel from "../models/distributionCirclesModel.js";
import substationModel from "../models/distributionSubstationModel.js";
import zonesModel from "../models/distributionZoneModel.js";

export const exportCircleController = async (req,res,next) => {

    try{

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const results = [];
        const filePath = path.join(__dirname, '../data/distribution/circle/circles.csv');
        
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
             
              const result1 =   await  zonesModel.findOne({zoneName:data['Zone']}); 
              if(result1 !==null && result1 !=""){
                let payload = {
                  "zone_Id":result1._id,
                  "circleName":data['Circle']                  
                }
                let substation =  await  circlesModel.create(payload);   

              }else{
                //results.push(data['Circle'])
                console.log(data['Circle'])
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
