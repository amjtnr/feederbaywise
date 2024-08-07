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


export const addDiscom = async (req,res) => {
  try {
      const {discomName, discomCode} = req.body;
      if (!discomName) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'discomName is required' });
      }
      const result = await discomModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding discom',error });
  }
}

export const editDiscom = async (req,res) => {
  try {
      const {id,discomName, discomCode} = req.body;
      if (!discomName || !id) {
        return res.status(400).send({ result:{},statusCode:"400", message: 'discomName and ID required' });
      }
      var resultCheck = await discomModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await discomModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating discom',error });
  }
}


export const softDeleteDiscom = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await discomModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await discomModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting discom',error });
  }
}


export const listDiscoms = async (req,res) => {
  try {
    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { discomName: 1 } // Sort by discomName in ascending order
      };
      const result = await discomModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in listing discom',error });
  }
};



