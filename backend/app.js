import express from "express";
import "dotenv/config";
import passport from "passport";
import { strategy } from "./passport/strategies.js";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { PrismaClient } from "@prisma/client";
import cookieSession from 'cookie-session';

const prisma = new PrismaClient();
const server = express();

const PORT = process.env.PORT || 5000;

server.use(express.json());
const corsConfig = {
  origin: "https://clean-nice-nll1.vercel.app",
  credentials: true,
  allowedHeaders: 'Authorization, Content-Type',
};

server.set("trust proxy", 1);
server.use(cors(corsConfig));


server.use(
  cookieSession({
    name: 'session', 
    keys: [process.env.SESSION_SECRET], 
    maxAge: 24 * 60 * 60 * 1000, 
    secure: true, 
    httpOnly: true, 
    sameSite: 'strict', 
  })
);

strategy(passport);

server.use(passport.initialize());

const isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated())
  req.isAuthenticated() ? next() : res.sendStatus(403);
};

server.use("/auth", authRoutes);
server.use("/api/customer", isAuthenticated, customerRoutes);
server.use("/api/employee", isAuthenticated, employeeRoutes);
server.use("/api/bookings", isAuthenticated, bookingsRoutes);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
async function main() {
  await prisma.$connect();
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });