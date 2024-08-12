import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {exportController,createSubstation,updateSubstation,getSubstations,deleteSubstation} from "../controllers/DMSubstationController.js";
import {listDMSubdivisionController} from "../controllers/DMSubdivisionController.js";
import {exportDistrictController,createDistrict,updateDistrict,getDistricts,deleteDistricts} from "../controllers/DMDistrictsController.js";
import {exportZonesController,createZone,updateZone,deleteZone,getZones,getDiscomZones} from "../controllers/DMZonesController.js";
import {exportCircleController,createCircle,updateCircle,getCircles,getZoneCircles,deleteCircle} from "../controllers/DMCircleController.js";
import {exportDiscomController,addDiscom,editDiscom,listDiscoms,softDeleteDiscom} from "../controllers/DiscomController.js";
import {exportDivisionController,createDivision,updateDivision,getDivisions,getCircleDivisions,deleteDivision} from "../controllers/DMDivisionController.js";
import { createIncommingFeeder, deleteIncommingFeeder, getIncommingFeeders, updateIncommingFeeder } from "../controllers/DMIncommingFeederController.js";
import { createOutgoingFeeder, deleteOutgoingFeeder, getOutgoingFeeders, updateOutgoingFeeder } from "../controllers/DMOutgoingFeederController.js";
import { createIndependentFeeder, deleteIndependentFeeder, getIndependentFeeders, updateIndependentFeeder } from "../controllers/DMIndependentFeederController.js";
 



const router = express.Router();

// router.get("/dm-substation/list",  listDMSubStationController);
router.get("/dm-subdivision/list",  listDMSubdivisionController);

//router.post("/export-discom",  exportDiscomController);
router.post("/add-discom",  addDiscom);
router.put("/edit-discom",  editDiscom);
router.post("/list-discom",  listDiscoms);
router.delete("/delete-discom",  softDeleteDiscom);

//router.post("/export-zones",  exportZonesController);
router.post("/add-zone",  createZone);
router.put("/edit-zone",  updateZone);
router.post("/list-zone",  getZones);
router.post("/list-discom-zone",  getDiscomZones);
router.delete("/delete-zone",  deleteZone);

//router.post("/export-circle",  exportCircleController);
router.post("/add-circle",  createCircle);
router.put("/edit-circle",  updateCircle);
router.post("/list-circle",  getCircles);
router.post("/list-zone-circle",  getZoneCircles);
router.delete("/delete-circle",  deleteCircle);


//router.post("/export-division",  exportDivisionController);
router.post("/add-division",  createDivision);
router.put("/edit-division",  updateDivision);
router.post("/list-division",  getDivisions);
router.post("/list-circle-division",  getCircleDivisions);
router.delete("/delete-division",  deleteDivision);


//router.post("/export-district",  exportDistrictController);
router.post("/add-district",  createDistrict);
router.put("/edit-district",  updateDistrict);
router.post("/list-districts",  getDistricts);
router.delete("/delete-district",  deleteDistricts);

//router.post("/export-substation",  exportController);
router.post("/add-substation",  createSubstation);
router.put("/edit-substation",  updateSubstation);
router.post("/list-substation",  getSubstations);
router.delete("/delete-substation",  deleteSubstation);


router.post("/add-incomming-feeder",  createIncommingFeeder);
router.put("/edit-incomming-feeder",  updateIncommingFeeder);
router.delete("/delete-incomming-feeder",  deleteIncommingFeeder);
router.post("/list-incomming-feeder",  getIncommingFeeders);

router.post("/add-outgoing-feeder",  createOutgoingFeeder);
router.put("/edit-outgoing-feeder",  updateOutgoingFeeder);
router.delete("/delete-outgoing-feeder",  deleteOutgoingFeeder);
router.post("/list-outgoing-feeder",  getOutgoingFeeders);

router.post("/add-independent-feeder",  createIndependentFeeder);
router.put("/edit-independent-feeder",  updateIndependentFeeder);
router.delete("/delete-independent-feeder",  deleteIndependentFeeder);
router.post("/list-independent-feeder",  getIndependentFeeders);


export default router;