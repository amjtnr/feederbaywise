import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import districtsModel from "../models/transmissionDistrict.js";

export const exportDistrictController = async (req,res,next) => {

  try{
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/transmission/district.csv');
    
    fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
              let payload = {
                  "districtName":data['District']
                }
              const queryRespose=await districtsModel.create(payload);   

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
