import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import circleModel from "../models/distributionCirclesModel.js";
import divisionModel from "../models/distributionDivisionModel.js";

export const exportDivisionController = async (req,res,next) => {

  try{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/distribution/division/division.csv');
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data',  async(data) => {
        try {
         
          const result1 =   await  circleModel.findOne({circleName:data['Circle']}); 
          if(result1 !==null && result1 !=""){
            let payload = {
              "circle_ID":result1._id,
              "divisionName":data['Division']
            }
            let substation =  await  divisionModel.create(payload);   

          }else{
            //results.push(data['Division'])
            //console.log(data['Circle'])
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
