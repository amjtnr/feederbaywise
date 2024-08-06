//import subdivisionModel from "../models/subdivisionModel.js";


export const listDMSubdivisionController = async(req,res,next)=>{
//   try{
//     const pageNumber = req.body.page || 1;
//     const pageSize = req.body.pageSize || 200;
   
//     var searchStr = {}

//     await subdivisionModel.paginate(searchStr , { page: pageNumber, limit: pageSize,sort:{_id:-1}  }, (err, result) => {
//     if (err) {
//         return res.status(404).send({message:"Error occurred while fetching records",status:404,records:[]});
//     }
//     const { docs, totalDocs, limit, page, totalPages,prevPage,nextPage    } = result;
//     return res.status(200).send({ status:200,records: docs, Total:totalDocs, Limit:limit, Page:page, pages:totalPages,prevPage:prevPage, nextPage:nextPage});
//     });

// }catch(error){
//     return res.status(500).send({message:"error occured"+error,status:500,errorMessage:error,records:[]});
// }


}