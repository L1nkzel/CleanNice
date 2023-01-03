import express from "express";
import passport from "passport";
import { strategy } from "../passport/strategies.js";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const route = express.Router();

strategy(passport);

route.post("/login", passport.authenticate("customer", {}), (req, res) => {
  console.log("user logged in", req.user);
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

route.post(
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

route.post("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    console.log("user  logged out:", req.user);
  });
});

route.post("/register", async (req, res) => {
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
        forceChangePass: req.body.forceChangePass,
      },
    });
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
});

route.patch("/:id/changePass", async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: {
        employeeId: parseInt(req.params.id),
      },
      data: {
        password: await bcrypt.hash(req.body.password, 10),
        forceChangePass: "no",
      },
    });
    res.json(employee);
  } catch (err) {
    res.json(err);
  }
});

export default route;
