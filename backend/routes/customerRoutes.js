import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import * as bcrypt from 'bcrypt'

const route = express.Router();


route.get('/', async (req,res)=>{
  const customers = await prisma.customer.findMany({})
  res.json(customers)
})

route.post("/register", async (req, res) => {



  const customer = await prisma.customer.create({
    data: {
      custName: req.body.custName,
      companyName: req.body.companyName,
      orgNr: req.body.orgNr,
      phoneNumber: req.body.phoneNumber,
      adress: req.body.adress,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password,10),
      
   
  }});
  res.json(customer);
});






export default route