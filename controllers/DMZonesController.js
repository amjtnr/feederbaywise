import path from 'path';
import mongoose from "mongoose";
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

export const createZone = async (req, res) => {
  try {
      const { discom_ID, zoneName } = req.body;
      if (!discom_ID || !zoneName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'discom_ID and zoneName are required' });
      }
      const result = await zonesModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding zone', error });
  }
};

export const updateZone = async (req, res) => {
  try {
      const { id, discom_ID, zoneName } = req.body;
      if (!id || !discom_ID || !zoneName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'ID, discom_ID, and zoneName are required' });
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

export const getZones = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.body;
     
      const aggregateQuery = zonesModel.aggregate([
        { $match: { isDeleted: 0 } },
        { $lookup: {
            from: 'discoms',
            localField: 'discom_ID',
            foreignField: '_id',
            as: 'discomDetails'
        }},
        { $unwind: '$discomDetails' },
        { $sort: { zoneName: 1 } }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const result = await zonesModel.aggregatePaginate(aggregateQuery, options);



      return res.status(200).json({ statusCode: 200, result });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones', error });
  }
}

export const getDiscomZones = async (req, res) => {
  try {
      const { page = 1, limit = 10,discom_ID  } = req.body;
     
      const aggregateQuery = zonesModel.aggregate([
        { $match: { isDeleted: 0, discom_ID: new mongoose.Types.ObjectId(discom_ID) } },
        { $lookup: {
            from: 'discoms',
            localField: 'discom_ID',
            foreignField: '_id',
            as: 'discomDetails'
        }},
        { $unwind: '$discomDetails' },
        { $sort: { zoneName: 1 } }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const result = await zonesModel.aggregatePaginate(aggregateQuery, options);



      return res.status(200).json({ statusCode: 200, result });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones', error });
  }
}

