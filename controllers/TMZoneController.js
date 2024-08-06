import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import zonesModel from "../models/transmissionZones.js";

export const exportZoneController = async (req,res,next) => {

  try{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/transmission/transmissionZones.csv');
    
    fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
              let payload = {
                  "zoneName":data['Zone']
                }
              const queryRespose=await zonesModel.create(payload);   

            } catch (error) {
              console.error('Error processing data:', error);
            }
          })
          .on('end', () => {            
           res.status(200).json({ message: "Successfully processed data", results });
          });

}catch(error){
    return res.status(500).send({message:"Export issue "+error,status:false,statusCode:500,user:[],errorMessage:error});
}
}
