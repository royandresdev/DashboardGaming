import {Router} from "express";
import dashboardControllers from "./dashboard.controllers";



const router = Router();


router.get("/steam", dashboardControllers.dashboard)


export default router