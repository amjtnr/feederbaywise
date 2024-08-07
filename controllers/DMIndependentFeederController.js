import independentModel from "../models/distribution33KVIndependentModel.js";

export const getIndependentFeeders = async (req, res) => {
  try {

    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { substationName: 1 } // Sort by discomName in ascending order
      };
      const result = await independentModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});

  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing ', error });
  }
}




export const createIndependentFeeder = async (req,res) => {
  try {
      const {divisionName,consumerName,feederVoltage,feederCategory,projectArea,supplyArea,feederCode,meterMake,meterSLNo,overallMF,consumerID} = req.body;
      if (!divisionName || !consumerName ||!feederVoltage ||!feederCategory ||!projectArea ||!supplyArea || !feederCode  || !meterMake  || !meterSLNo || !overallMF  || !consumerID  ) {
        return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
      }
      const result = await independentModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding incomming Feeder',error });
  }
}

export const updateIndependentFeeder = async (req,res) => {
  try {
    const {divisionName,consumerName,feederVoltage,feederCategory,projectArea,supplyArea,feederCode,meterMake,meterSLNo,overallMF,consumerID} = req.body;
    if (!id || !divisionName || !consumerName ||!feederVoltage ||!feederCategory ||!projectArea ||!supplyArea || !feederCode  || !meterMake  || !meterSLNo || !overallMF  || !consumerID  ) {
      return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
    }
      var resultCheck = await independentModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await independentModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating',error });
  }
}


export const deleteIndependentFeeder = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await independentModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await independentModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting ',error });
  }
}

