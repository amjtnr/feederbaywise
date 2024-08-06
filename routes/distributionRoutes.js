import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {exportController,listDMSubStationController} from "../controllers/DMSubstationController.js";
import {listDMSubdivisionController} from "../controllers/DMSubdivisionController.js";
//import {exportDistrictController} from "../controllers/DMDistrictsController.js";
import {exportZonesController} from "../controllers/DMZonesController.js";
import {exportCircleController} from "../controllers/DMCircleController.js";
import {exportDiscomController} from "../controllers/DiscomController.js";
import {exportDivisionController} from "../controllers/DMDivisionController.js";
 

const router = express.Router();

router.post("/export-substation",  exportController);
router.get("/dm-substation/list",  listDMSubStationController);
router.get("/dm-subdivision/list",  listDMSubdivisionController);
//router.post("/export-district",  exportDistrictController);
router.post("/export-zones",  exportZonesController);
router.post("/export-circle",  exportCircleController);
router.post("/export-circle",  exportCircleController);
router.post("/export-discom",  exportDiscomController);
router.post("/export-division",  exportDivisionController);


export default router;