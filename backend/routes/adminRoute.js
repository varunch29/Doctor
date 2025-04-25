import express from 'express'
import { addDoctor,allDoctors,loginAdmin,appointmentsAdmin,AppointmentCancel,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import { changeAvailablity } from '../controllers/doctorController.js'


const adminRouter = express.Router()

adminRouter.post('/add-doctor' ,upload.single('image'),addDoctor)
adminRouter.post('/login' ,loginAdmin)
adminRouter.post('/all-doctors' ,allDoctors)
adminRouter.post('/change-availability' ,changeAvailablity)
adminRouter.get('/appointments',appointmentsAdmin)
adminRouter.post('/cancel-appointment',AppointmentCancel)
adminRouter.get('/dashboard',adminDashboard)


export default adminRouter

