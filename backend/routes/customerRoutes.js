import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcrypt";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({});
    res.json(customers);
  } catch (error) {
    res.json(error);
  }
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
        forceChangePass:'no'
      },
    });
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
});

route.patch("/:id/editCustomer", async (req, res) => {
  try {
    const customer = await prisma.customer.update({
      where: {
        customerId: parseInt(req.params.id),
      },
      data: {
        custName: req.body.custName || undefined,
        companyName: req.body.companyName || undefined,
        orgNr: req.body.orgNr || undefined,
        phoneNumber: req.body.phoneNumber || undefined,
        adress: req.body.adress || undefined,
        email: req.body.email || undefined,
        
        
      },
    });
    res.json(customer);
  } catch (err) {
    res.json(err);
  }
});
route.patch("/:id/editCustomerPass", async (req, res) => {
  try {
    const customer = await prisma.customer.update({
      where: {
        customerId: parseInt(req.params.id),
      },
      data: {
        password: await bcrypt.hash(req.body.password, 10),
        forceChangePass:'yes'
    
      },
    });
    res.json(customer);
  } catch (err) {
    res.json(err);
  }
});

route.delete("/:id/deleteCustomer", async (req, res) => {
  try {
    const customer = await prisma.customer.delete({
      where: {
        customerId: parseInt(req.params.id),
      },
    });
    res.json(customer);
  } catch (err) {
    res.json(err);
  }
});

export default route;
