import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import discomModel from "../models/discomModel.js";
import zonesModel from "../models/distributionZoneModel.js";
//import substationModel from "../models/substationModel.js";

export const exportZonesController = async (req,res,next) => {

  try{


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/distribution/zones/zones.csv');
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data',  async(data) => {
        try {
         
          const result1 =   await  discomModel.findOne({discomName:data['Discom']}); 
          if(result1 !==null && result1 !=""){
            let payload = {
              "discom_ID":result1._id,
              "zoneName":data['Zone']
            }
            let substation =  await  zonesModel.create(payload);   

          }else{
            //results.push(data['Division'])
            console.log(data['Zone'])
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

// export const listDMSubStationController = async(req,res,next)=>{
//   try{
//     const pageNumber = req.body.page || 1;
//     const pageSize = req.body.pageSize || 200;
   
//     var searchStr = {}

//     await substationModel.paginate(searchStr , { page: pageNumber, limit: pageSize,sort:{_id:-1}  }, (err, result) => {
//     if (err) {
//         return res.status(404).send({message:"Error occurred while fetching records",status:404,records:[]});
//     }
//     const { docs, totalDocs, limit, page, totalPages,prevPage,nextPage    } = result;
//     return res.status(200).send({ status:200,records: docs, Total:totalDocs, Limit:limit, Page:page, pages:totalPages,prevPage:prevPage, nextPage:nextPage});
//     });

// }catch(error){
//     return res.status(500).send({message:"error occured",status:500,errorMessage:error,records:[]});
// }


// }