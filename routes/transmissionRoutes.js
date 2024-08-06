import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {exportDistrictController} from "../controllers/TMDistrictController.js";
import {exportZoneController} from "../controllers/TMZoneController.js";
import {exportCircleController} from "../controllers/TMCircleController.js";
import {exportDivisionController} from "../controllers/TMDivisionController.js";
import {exportSubstationsController} from "../controllers/TMSubstationController.js";
 

const router = express.Router();

router.post("/export-district",  exportDistrictController);
router.post("/export-zone",  exportZoneController);
router.post("/export-circle",  exportCircleController);
router.post("/export-division",  exportDivisionController);
router.post("/export-substations",  exportSubstationsController);


export default router;