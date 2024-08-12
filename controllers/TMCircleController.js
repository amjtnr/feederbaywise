import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import zonesModel from "../models/transmissionZones.js";
import circlesModel from "../models/transmissionCircleModel.js";

export const exportCircleController = async (req,res,next) => {

  try{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const results = [];
    const filePath = path.join(__dirname, '../data/transmission/transmissionCircle.csv');
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data',  async(data) => {
        try {
         
          const result1 =   await  zonesModel.findOne({zoneName:data['Zone']}); 
          if(result1 !==null && result1 !=""){
            let payload = {
              "zone_ID":result1._id,
              "circleName":data['Circle']
            }
            let substation =  await  circlesModel.create(payload);   

          }else{
            //results.push(data['Division'])
            console.log(data['Circle'])
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


export const createCircle = async (req, res) => {
  try {
      const { zone_ID, circleName } = req.body;
      
      if (!zone_ID || !circleName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'zone_Id and circleName are required' });
      }
      const result = await circlesModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding zone', error });
  }
};

export const updateCircle = async (req, res) => {
  try {
      const { id, zone_ID, circleName } = req.body;
     
      if (!id || !zone_ID || !circleName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'ID, zone_ID, and circleName are required' });
      }
      const resultCheck = await circlesModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ result: {}, statusCode: 404, message: 'ID not found' });
      }
      const result = await circlesModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result, statusCode: '200', message: 'Updated successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in updating zone', error });
  }
};

export const deleteCircle = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
          return res.status(400).json({ statusCode: 400, message: 'ID required' });
      }
      const resultCheck = await circlesModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ statusCode: 404, message: 'ID not found' });
      }
      const deletedDiscom = await circlesModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({ statusCode: 200, message: 'Deleted successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in deleting zone', error });
  }
};

export const getZoneCircles = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.body;
     
      const aggregateQuery = circlesModel.aggregate([
        { $match: { isDeleted: 0 } },
        { $lookup: {
            from: 'tm-zones',
            localField: 'zone_ID',
            foreignField: '_id',
            as: 'zoneDetails'
        }},
        { $unwind: { path: '$zoneDetails', preserveNullAndEmptyArrays: true } },
        { $sort: { circleName: 1 } }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const result = await circlesModel.aggregatePaginate(aggregateQuery, options);

      return res.status(200).json({ statusCode: 200, result });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in circle listing '+error, error });
  }
}

export const  getCircles = async (req, res) => {
  try {
    const {page, limit} = req.body;
    const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
    const options = {
        page: page,
        limit: limit,
        sort: { discomName: 1 } // Sort by discomName in ascending order
    };
    const result = await circlesModel.paginate(query, options);
    return res.status(200).json({status:200,result:result});
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones '+ error, error });
  }
}
