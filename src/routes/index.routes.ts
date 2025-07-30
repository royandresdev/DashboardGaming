import { Router } from 'express'; 
import dashboardRoute from '../modules/dashboard/dashboard.routes';

const router = Router(); 


router.use('/dashboard', dashboardRoute)



export default router;
