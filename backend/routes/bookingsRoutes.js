import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const route = express.Router();

route.get("/", async (req, res) => {
  const bookings = await prisma.bookings.findMany({});
  res.json(bookings);
});

route.get("/:id/bookings", async (req, res) => {
  const bookings = await prisma.bookings.findMany({
    where: {
      customerId: parseInt(req.params.id),
    },
    select:{
      bookingId: true,
      customerId: true,
      customerName: true,
      adress: true,
      cleaningService: true,
      date:true,
      time: true,
      cleanerName:true,
      status: true

    }
  });
  res.json(bookings);
});

route.post("/:id/newBooking", async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: {
      customerId: parseInt(req.params.id),
    },
  });
 
  const booking = await prisma.bookings.create({
    data: {
      customer: {
        connect: {
          customerId: parseInt(req.params.id),
        },
      },
      customerName: customer.custName,
      cleanerName:"Ej tildelad ännu",
      date: req.body.date,
      time: req.body.time,
      cleaningService: req.body.cleaningService,
      adress: customer.adress,
      status: "Obekräftad",
    },
  });
  res.json(booking);
});

route.delete("/:id/booking", async (req, res) => {
  const bookings = await prisma.bookings.delete({
    where: {
      bookingId: parseInt(req.params.id),
    },
  });
  res.json(bookings);
});

export default route;
