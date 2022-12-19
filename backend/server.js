import express from "express";
import "dotenv/config";
import passport from "passport";
import { strategy } from "./passport/strategies.js";
import session from "express-session";
import cors from "cors";
import customerRoutes from "./routes/customerRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const server = express();

const PORT = process.env.PORT || 5000;

server.use(express.json());
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true
};

server.use(cors(corsConfig));

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    
  })
  );
 strategy(passport)



  server.use(passport.session());
  server.use(passport.initialize());
  
  





server.post("/login", passport.authenticate("customer", {}), (req, res) => {
  console.log("user logged in", req.user);
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

server.post(
  "/employee/login",
  passport.authenticate("employee", {}),
  (req, res) => {
   
    console.log("user logged in", req.user);

    res.json({
      isEmployeeAuthenticated: req.isAuthenticated(),
      user: req.user,
    });
  }
);

server.post("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    console.log("user  logged out:", req.user);
  });
});

//middleware for authentication
const isCustomerAuthenticated = (req, res, next) => {
  console.log(req.user);
  req.isAuthenticated() && !isNaN(req.user.customerId) ? next() : res.sendStatus(403);
};
const isEmployeeAuthenticated = (req, res, next) => {
  console.log('is logged in?',req.user);
  req.isAuthenticated() && !isNaN(req.user.employeeId) ? next() : res.sendStatus(403);
};


server.get("/", async (req, res) => {
  const customers = await prisma.customer.findMany({});
  res.json(customers);
});

server.post("/register", async (req, res) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        custName: req.body.custName,
        companyName: req.body.companyName,
        orgNr: req.body.orgNr,
        phoneNumber: req.body.phoneNumber,
        adress: req.body.adress,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      },
    });
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
});

server.use("/api/customer", isCustomerAuthenticated, customerRoutes);

server.use("/api/employee", isEmployeeAuthenticated, employeeRoutes);
server.use("/api/bookings", bookingsRoutes);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
