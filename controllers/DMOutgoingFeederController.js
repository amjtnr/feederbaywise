import outgoingModel from "../models/distributionOutgoingModel.js";



export const getOutgoingFeeders = async (req, res) => {
  try {

    const {page, limit} = req.body;
      const query = { isDeleted: 0 }; // Only fetch non-deleted discoms
      const options = {
          page: page,
          limit: limit,
          sort: { substationName: 1 } // Sort by discomName in ascending order
      };
      const result = await outgoingModel.paginate(query, options);
      return res.status(200).json({status:200,result:result});



  } catch (error) {
      return res.status(500).send({ result: {}, statusCode: '500', message: 'Error occurred in listing ', error });
  }
}




export const createOutgoingFeeder = async (req,res) => {
  try {
      const {divisionName,substationName,feederName} = req.body;
      if (!divisionName || !substationName ||!feederName ) {
        return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
      }
      const result = await outgoingModel.create(req.body)
      return res.status(200).send({ result:result,statusCode:"200", message: 'Created sucessfully' });
  } catch (error) {
      return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in adding Outgoing Feeder',error });
  }
}

export const updateOutgoingFeeder = async (req,res) => {
  try {
    const {divisionName,substationName,feederName,id} = req.body;
    if (!id, !divisionName || !substationName ||!feederName ) {
      return res.status(400).send({ result:{},statusCode:"400", message: '* marked fields are required' });
    }
      var resultCheck = await outgoingModel.findById(id);
      if(!resultCheck){
          return res.status(404).json({result:{},status:404,message: "ID not found"});
      }
      const result = await outgoingModel.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).send({ result:result,statusCode:"200", message: 'updated sucessfully' });
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in updating',error });
  }
}


export const deleteOutgoingFeeder = async (req,res) => {
  try {

    const {id} = req.body;
    if (!id ){
        return res.status(400).json({status:400,message: "ID required"})
    }
    var resultCheck = await outgoingModel.findById(id);
    if(!resultCheck){
        return res.status(404).json({status:404,message: "ID not found"});
    }

      const deletedDiscom = await outgoingModel.findByIdAndUpdate(id, { isDeleted: 1 }, { new: true });
      return res.status(200).json({status:200,message:"deleted successfully"});
  } catch (error) {
    return res.status(500).send({ result:{},statusCode:"500", message: 'error occured in deleting ',error });
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