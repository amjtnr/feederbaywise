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

export const getDistricts = async (req, res) => {
  try {

    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { districtName: 1 } // Sort by discomName in ascending order
      };
      const result = await districtsModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});



  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing districts', error });
  }
}

export const createDistrict = async (req,res) => {
  try {
 
      const {districtName} = req.body;
      if (!districtName) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'districtName is required' });
      }
      const result = await districtsModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding district',error });
  }
}

export const updateDistrict = async (req,res) => {
  try {
      const {id,districtName} = req.body;
      if (!districtName || !id) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'districtName and ID required' });
      }
      var resultCheck = await districtsModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await districtsModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating district',error });
  }
}

export const deleteDistricts = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await districtsModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await districtsModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting discom',error });
  }
}