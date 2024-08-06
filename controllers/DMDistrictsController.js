import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import districtsModel from "../models/distributionDistrictsModel.js";
//import substationModel from "../models/substationModel.js";

export const exportDistrictController = async (req,res,next) => {

    try{

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const results = [];
        const filePath = path.join(__dirname, '../data/distribution/district/district.csv');
        
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
              let payload = {
                  "districtName":data['District'],
                }
              const queryRespose=await districtsModel.create(payload);   

            } catch (error) {
              console.error('Error processing data:', error);
            }
          })
          .on('end', () => {
            //console.log(results)
           res.status(200).json({ message: "Successfully processed district data", results });
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