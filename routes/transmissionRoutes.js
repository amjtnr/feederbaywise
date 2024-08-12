import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {createZone,updateZone,deleteZone,getZones,exportZoneController} from "../controllers/TMZoneController.js";
import {createCircle,updateCircle,getCircles,getZoneCircles,deleteCircle,exportCircleController} from "../controllers/TMCircleController.js";
import {createDivision,updateDivision,getDivisions,deleteDivision,exportDivisionController} from "../controllers/TMDivisionController.js";
import {createDistrict,updateDistrict,getDistricts,deleteDistricts,exportDistrictController} from "../controllers/TMDistrictController.js";
import {createSubstation,updateSubstation,getSubstations,deleteSubstation,exportSubstationsController} from "../controllers/TMSubstationController.js";
 

const router = express.Router();

// Zones route
//router.post("/export-zone",  exportZoneController);
router.post("/add-zone",  createZone);
router.put("/edit-zone",  updateZone);
router.post("/list-zone",  getZones);
router.delete("/delete-zone",  deleteZone);

// Circle route
//router.post("/export-circle",  exportCircleController);
router.post("/add-circle",  createCircle);
router.put("/edit-circle",  updateCircle);
router.post("/list-circle",  getCircles);
router.post("/list-zone-circle",  getZoneCircles);
router.delete("/delete-circle",  deleteCircle);

//Division route
//router.post("/export-division",  exportDivisionController);
router.post("/add-division",  createDivision);
router.put("/edit-division",  updateDivision);
router.post("/list-division",  getDivisions);
router.delete("/delete-division",  deleteDivision);

//District route
//router.post("/export-district",  exportDistrictController);
router.post("/add-district",  createDistrict);
router.put("/edit-district",  updateDistrict);
router.post("/list-districts",  getDistricts);
router.delete("/delete-district",  deleteDistricts);

//Substation route
//router.post("/export-substations",  exportSubstationsController);
router.post("/add-substation",  createSubstation);
router.put("/edit-substation",  updateSubstation);
router.post("/list-substation",  getSubstations);
router.delete("/delete-substation",  deleteSubstation);


export default router;