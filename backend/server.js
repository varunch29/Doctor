// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import userRouter from './routes/userRoute.js'

// const app = express()
// const port = process.env.PORT || 4000 
// connectDB()
// connectCloudinary()

// app.use(express.json())
// app.use(cors())

// app.use('/api/admin' , adminRouter)
// app.use('/api/doctor' , doctorRouter)
// app.use('/api/user' , userRouter)


// app.get('/',(req,res)=>{
//     res.send('API WORKING PERFECTLY')
// })


// app.listen(port, ()=> console.log("Server Started",port))



import express from 'express'
import cors from 'cors'
import { createServer } from 'http'           // <-- new
import { Server } from 'socket.io'             // <-- new
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API WORKING PERFECTLY')
})

// 🔥 Socket.IO setup
const server = createServer(app)   // use this instead of app.listen
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('joinRoom', ({ appointmentId }) => {
        socket.join(appointmentId);
        console.log(`Socket ${socket.id} joined room ${appointmentId}`);
    });

    socket.on('sendMessage', (message) => {
        const { appointmentId } = message;
        io.to(appointmentId).emit('receiveMessage', message);
        console.log(`Message sent to room ${appointmentId}:`, message);
    });

    socket.on('leaveRoom', ({ appointmentId }) => {
        socket.leave(appointmentId);
        console.log(`Socket ${socket.id} left room ${appointmentId}`);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Socket disconnected:', socket.id);
    });
});


// ✅ Start server with both Express & Socket.IO
server.listen(port, () => console.log(`Server started on port ${port}`))
