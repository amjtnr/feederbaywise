import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';
import discomModel from "../models/discomModel.js";
import zoneModel from "../models/distributionZoneModel.js";
import circleModel from "../models/distributionCirclesModel.js";
import divisionModel from "../models/distributionDivisionModel.js";
import substationModel from "../models/distributionSubstationModel.js";

export const exportController = async (req,res,next) => {

    try{


        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const results = [];
        const filePath = path.join(__dirname, '../data/distribution/substation/DistributionSubStation.csv');
        
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data',  async(data) => {
            try {
             
              const discomN =   await  discomModel.findOne({discomName:data['Discom']}); 
              const zoneN =   await  zoneModel.findOne({zoneName:data['Zone']}); 
              const circleN =   await  circleModel.findOne({circleName:data['Circle']}); 
              const divisionN =   await  divisionModel.findOne({divisionName:data['Division']}); 
              if(divisionN !==null && divisionN !=""){
                let payload = {
                   "discom_ID":discomN._id,
                   "zone_ID":zoneN._id,
                   "circle_ID":circleN._id,
                  "division_ID":divisionN._id,
                  "divisionName":data['Division'],
                  "discomName":data['Discom'],
                  "zoneName":data['Zone'],
                  "circleName":data['Circle'],
                  "substationName":data['Substation'],
                  "subStationCode":data['DistributionSubStationCode'],
                  "capacityUnitSubStation":data['CapacityOfUnitSubStation'],
                  "jeeName":data['JuniorEngineerName'],
                  "jeeNumber":data['JuniorEngineerMobileNumber']
                }
                let substation =  await  substationModel.create(payload);   

              }else{
                results.push(data['Circle'])              
              }               
                    

            } catch (error) {
              console.error('Error processing data:', error);
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


export const listDMSubStationController = async(req,res,next)=>{
  try{
    const pageNumber = req.body.page || 1;
    const pageSize = req.body.pageSize || 200;
   
    var searchStr = {}

    await substationModel.paginate(searchStr , { page: pageNumber, limit: pageSize,sort:{_id:-1}  }, (err, result) => {
    if (err) {
        return res.status(404).send({message:"Error occurred while fetching records",status:404,records:[]});
    }
    const { docs, totalDocs, limit, page, totalPages,prevPage,nextPage    } = result;
    return res.status(200).send({ status:200,records: docs, Total:totalDocs, Limit:limit, Page:page, pages:totalPages,prevPage:prevPage, nextPage:nextPage});
    });

}catch(error){
    return res.status(500).send({message:"error occured",status:500,errorMessage:error,records:[]});
}


}


export const createSubstation = async (req, res) => {
  try {
      const { divisionName, substationName, subStationCode, capacityUnitSubStation, jeeName, jeeNumber, startMonth, startYear } = req.body;
      if (!divisionName || !substationName || !subStationCode || !capacityUnitSubStation || !jeeName || !jeeNumber || !startMonth || !startYear ) {
          return res.status(400).send({ result: {}, statusCode: '400', message: '* marked fields are required' });
      }
      const result = await substationModel.create(req.body);
      return res.status(200).send({ result, statusCode: '200', message: 'Created successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in adding zone', error });
  }
};

export const updateSubstation = async (req, res) => {
  try {
    const { id, divisionName, substationName, subStationCode, capacityUnitSubStation, jeeName, jeeNumber, startMonth, startYear } = req.body;
    if (!id || !divisionName || !substationName || !subStationCode || !capacityUnitSubStation || !jeeName || !jeeNumber || !startMonth || !startYear ) {
      return res.status(400).send({ result: {}, statusCode: '400', message: '* marked fields are required' });
    }
      const resultCheck = await substationModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ result: {}, statusCode: 404, message: 'ID not found' });
      }
      const result = await substationModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result, statusCode: '200', message: 'Updated successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in updating substation', error });
  }
};

export const deleteSubstation = async (req, res) => {
  try {
      const { id } = req.body;
      if (!id) {
          return res.status(400).json({ statusCode: 400, message: 'ID required' });
      }
      const resultCheck = await substationModel.findById(id);
      if (!resultCheck) {
          return res.status(404).json({ statusCode: 404, message: 'ID not found' });
      }
      const deletedDiscom = await substationModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({ statusCode: 200, message: 'Deleted successfully' });
  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in deleting substation', error });
  }
};

export const getSubstations = async (req, res) => {
  try {

    const {page, limit,divisionName} = req.body; 
    var query = { isDeleted: 0 };
    if(divisionName){
      query = { isDeleted: 0, divisionName:divisionName}; // Only fetch non-deleted discoms
    }
      const options = {
          page: page,
          limit: limit,
          sort: { substationName: 1 } // Sort by discomName in ascending order
      };
      const result = await substationModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});

  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing zones '+error, error });
  }
}



