import express from "express";
import "dotenv/config";
import LocalStrategy from "passport-local";
import passport from "passport";
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
};

server.use(cors(corsConfig));

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  "customer",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await prisma.customer.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        done(null, false);
      }

      if (await bcrypt.compare(password, user.password)) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);
passport.use(
  "employee",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await prisma.employee.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        done(null, false);
      }

      if (await bcrypt.compare(password, user.password)) {
        done(null, user);
      } else {
        done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser(async (user, done) =>
  done(null, await loadUserBy(user))
);

server.use(passport.initialize());
server.use(passport.session());

server.post("/login", passport.authenticate("customer", {}), (req, res) => {
  console.log("user logged in", req.user);
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

server.post(
  "/employee/login",
  passport.authenticate("employee", {}),
  (req, res) => {
    console.log("user logged in", req.user);
    res.json({ isEmployeeAuthenticated: req.isAuthenticated(), user: req.user });
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
const isAuthenticated = (req, res, next) => {
  console.log(req.user);
  req.isAuthenticated() ? next() : res.sendStatus(403);
};

server.get("/", async (req, res) => {
  const customers = await prisma.customer.findMany({});
  res.json(customers);
});

server.post("/register", async (req, res) => {
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
});

server.use("/api/customer", isAuthenticated, customerRoutes);

server.use("/api/employee", employeeRoutes);
server.use("/api/bookings", bookingsRoutes);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
