import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import discomModel from "../models/discomModel.js";

export const exportDiscomController = async (req,res,next) => {

    try{

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const results = [];
        const filePath = path.join(__dirname, '../data/distribution/discom/discom.csv');
        
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
              let payload = {
                  "discomName":data['Discom'],
                  "discomCode":data['Discom_code']
                }
              const queryRespose=await discomModel.create(payload);   

            } catch (error) {
              console.error('Error processing data:', error);
            }
          })
          .on('end', () => {            
           res.status(200).json({ message: "Successfully processed discom data", results });
          });

    
    }catch(error){
        return res.status(500).send({message:"Export issue "+error,status:false,statusCode:500,user:[],errorMessage:error});
    }
}

