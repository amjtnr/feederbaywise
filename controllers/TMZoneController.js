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


export const createZone = async (req, res) => {
  try {
      const { zoneName } = req.body;
      if ( !zoneName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'Zone Name are required' });
      }
      const result = await zonesModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Zone created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding zone', error });
  }
};

export const getZones = async (req, res) => {
  try {
    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { discomName: 1 } // Sort by discomName in ascending order
      };
      const result = await zonesModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in listing zones',error });
  }
     
}


export const updateZone = async (req, res) => {
  try {
      const { id, zoneName } = req.body;
      if (!id || !zoneName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'ID and zoneName are required' });
      }
      const resultCheck = await zonesModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ result: {}, statusCode: 404, message: 'ID not found' });
      }
      const result = await zonesModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result, statusCode: '200', message: 'Updated successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in updating zone', error });
  }
};

export const deleteZone = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
          return res.status(400).json({ statusCode: 400, message: 'ID required' });
      }
      const resultCheck = await zonesModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ statusCode: 404, message: 'ID not found' });
      }
      const deletedDiscom = await zonesModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({ statusCode: 200, message: 'Deleted successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in deleting zone', error });
  }
};

