import express from "express";
import "dotenv/config";
import passport from "passport";
import { strategy } from "./passport/strategies.js";
import session from "express-session";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectRedis from "connect-redis"; 
import { createClient } from 'redis';

const server = express();

const PORT = process.env.PORT || 5000;


const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
  
})

client.connect().catch(console.error);
client.on('connect', () => {
  console.log('Connected to Redis server');
 
});
client.on("error", (err) => {
  console.error("Redis Error: " + err);
});

const redisStore = new connectRedis({client: client});



server.use(express.json());
const corsConfig = {
  origin: "https://clean-nice-nll1.vercel.app",
  credentials: true,
  allowedHeaders: 'Authorization, Content-Type',
};
server.set('trust proxy', 1)
server.use(cors(corsConfig));

server.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      maxAge: 30 * 60 * 1000,
      secure: true, 
      sameSite: 'none', 
    },
  })
);
strategy(passport);

server.use(passport.initialize());
server.use(passport.session());

const isAuthenticated = (req, res, next) => {
  console.log(req.user)
  console.log(req.isAuthenticated())
  req.isAuthenticated() ? next() : res.sendStatus(403);
};

server.use("/auth", authRoutes);
server.use("/api/customer", isAuthenticated, customerRoutes);
server.use("/api/employee", isAuthenticated, employeeRoutes);
server.use("/api/bookings", isAuthenticated, bookingsRoutes);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));