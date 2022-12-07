import express from "express";
import "dotenv/config";
import customerRoutes from './routes/customerRoutes.js'



const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json())

server.use("/customer", customerRoutes)


server.listen(PORT, () => console.log(`Server started on ${PORT}`))