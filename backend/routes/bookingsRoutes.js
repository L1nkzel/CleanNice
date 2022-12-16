import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const bookings = await prisma.bookings.findMany({});
    res.json(bookings);
  } catch (error) {
    res.json(error);
  }
});

route.get("/:id/bookings", async (req, res) => {
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        customerId: parseInt(req.params.id),
      },
      select: {
        bookingId: true,
        customerId: true,
        customerName: true,
        companyName: true,
        adress: true,
        phoneNumber: true,
        cleaningService: true,
        date: true,
        time: true,
        cleanerName: true,
        status: true,
      },
    });
    res.json(bookings);
  } catch (error) {
    res.json(error);
  }
});

route.post("/:id/newBooking", async (req, res) => {
  try {
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
        companyName: customer.companyName,
        cleanerName: "Ej tildelad ännu",
        date: req.body.date,
        time: req.body.time,
        cleaningService: req.body.cleaningService,
        adress: customer.adress,
        phoneNumber: customer.phoneNumber,
        status: "Obekräftad",
      },
    });
    res.json(booking);
  } catch (error) {
    res.json(error);
  }
});

route.patch("/:id/editBooking", async (req, res) => {
  const booking = await prisma.bookings.update({
    where: {
      bookingId: parseInt(req.params.id),
    },
    data: {
      status: req.body.status,
    },
  });
  res.json(booking);
});

route.delete("/:id/booking", async (req, res) => {
  try {
    const bookings = await prisma.bookings.delete({
      where: {
        bookingId: parseInt(req.params.id),
      },
    });
    res.json(bookings);
  } catch (error) {
    res.json(error);
  }
});

export default route;
