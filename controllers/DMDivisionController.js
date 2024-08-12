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



export const createDivision = async (req, res) => {
  try {
      const { circle_ID, divisionName } = req.body;
      if (!circle_ID || !divisionName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'circle_ID and divisionName are required' });
      }
      const result = await divisionModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding division', error });
  }
};

export const updateDivision = async (req, res) => {
  try {
      const { id, circle_ID, divisionName } = req.body;
      if (!id || !circle_ID || !divisionName) {
          return res.status(400).send({ result: {}, statusCode: '400', message: 'ID, circle_ID, and divisionName are required' });
      }
      const resultCheck = await divisionModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ result: {}, statusCode: 404, message: 'ID not found' });
      }
      const result = await divisionModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result, statusCode: '200', message: 'Updated successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in updating division', error });
  }
};

export const deleteDivision = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
          return res.status(400).json({ statusCode: 400, message: 'ID required' });
      }
      const resultCheck = await divisionModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ statusCode: 404, message: 'ID not found' });
      }
      const deletedDiscom = await divisionModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({ statusCode: 200, message: 'Deleted successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in deleting zone', error });
  }
};

export const getDivisions = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.body;
     
      const aggregateQuery = divisionModel.aggregate([
        { $match: { isDeleted: 0 } },
        { $lookup: {
            from: 'dm-circles',
            localField: 'circle_ID',
            foreignField: '_id',
            as: 'circleDetails'
        }},      
        { $unwind: { path: '$circleDetails', preserveNullAndEmptyArrays: true } },
        { $sort: { divisionName: 1 } }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const result = await divisionModel.aggregatePaginate(aggregateQuery, options);



      return res.status(200).json({ statusCode: 200, result });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones '+error, error });
  }
}


export const getCircleDivisions = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.body;
      const aggregateQuery = divisionModel.aggregate([
        { $match: { isDeleted: 0, circle_ID: new mongoose.Types.ObjectId(circle_ID) } },
        { $lookup: {
          from: 'dm-circles',
          localField: 'circle_ID',
          foreignField: '_id',
          as: 'circleDetails'
      }},
      { $unwind: '$circleDetails' },
      { $sort: { divisionName: 1 } }
  ]);

  const options = {
      page: Number(page),
      limit: Number(limit)
  };

  const result = await divisionModel.aggregatePaginate(aggregateQuery, options);

    return res.status(200).json({ statusCode: 200, result });

  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones', error });
  }
}


