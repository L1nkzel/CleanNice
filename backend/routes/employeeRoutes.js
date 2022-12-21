import express from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

const route = express.Router();

route.get("/", async (req, res) => {

    const employees = await prisma.employee.findMany({

      select: { 
        employeeId:true,
        employeeName:true,
        accountNumber:true,
        adress:true,
        email:true,
        phoneNumber:true,
        role:true,
        personalNumber:true,
        password:true,
        bookings: true,
        _count: {
          select: { bookings: true },
       }}
        
        
      
    });
    res.json(employees);
 
});

route.get("/:id/bookings", async (req, res) => {
  
    const employees = await prisma.employee.findUnique({
      where: { employeeId:parseInt(req.params.id) },
      select: { bookings: true },
    });
    res.json(employees);
 

});

route.post("/newEmployee", async (req, res) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        employeeName: req.body.employeeName,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        personalNumber: req.body.personalNumber,
        accountNumber: req.body.accountNumber,
        role: req.body.role,
        password: await bcrypt.hash(req.body.password, 10),
        forceChangePass: "yes",
      },
    });
    res.json(employee);
  } catch (error) {
    res.json(error);
  }
});

route.patch("/:id/editEmployee", async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: {
        employeeId: parseInt(req.params.id),
      },
      data: {
        employeeName: req.body.employeeName || undefined,
        adress: req.body.adress || undefined,
        phoneNumber: req.body.phoneNumber || undefined,
        email: req.body.email || undefined,
        accountNumber: req.body.accountNumber || undefined,
      },
    });
    res.json(employee);
  } catch (err) {
    res.json(err);
  }
});
route.patch("/:id/editEmployeePass", async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: {
        employeeId: parseInt(req.params.id),
      },
      data: {
        password: await bcrypt.hash(req.body.password, 10),
        forceChangePass: "yes",
      },
    });
    res.json(employee);
  } catch (err) {
    res.json(err);
  }
});

route.delete("/:id/deleteEmployee", async (req, res) => {
  try {
    const employee = await prisma.employee.delete({
      where: {
        employeeId: parseInt(req.params.id),
      },
    });
    res.json(employee);
  } catch (err) {
    res.json(err);
  }
});

export default route;
