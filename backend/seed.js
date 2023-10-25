import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedData() {
  try {
    // Insert mock data for customers
    await prisma.customer.createMany({
      data: [
        {
          companyName: 'AB Svenska Företaget',
          orgNr: '556677-8899',
          phoneNumber: '+46 123 456 789',
          email: 'kund1@example.com',
          adress: 'Storgatan 1',
          custName: 'Anna Andersson',
          password: await bcrypt.hash("123", 10),  
          forceChangePass: 'no',
        },
        {
          companyName: 'Firma Sverige AB',
          orgNr: '123456-7890',
          phoneNumber: '+46 987 654 321',
          email: 'kund2@example.com',
          adress: 'Lillgatan 5',
          custName: 'Erik Eriksson',
          password: await bcrypt.hash("123", 10), 
          forceChangePass: 'no',
        },
      ],
    });

    // Insert mock data for employees
    await prisma.employee.createMany({
      data: [
        {
          personalNumber: '198765-4321',
          accountNumber: 'SE123456',
          phoneNumber: '+46 111 222 333',
          email: 'admin@example.com',
          adress: 'Bokvägen 7',
          role: 'Admin',
          employeeName: 'Maria Karlsson',
          password:  await bcrypt.hash("123", 10),  
          forceChangePass: 'no',
        },
        {
          personalNumber: '198754-3210',
          accountNumber: 'SE654321',
          phoneNumber: '+46 444 555 666',
          email: 'employee@example.com',
          adress: 'Ekbacken 3',
          role: 'Employee',
          employeeName: 'Jonas Nilsson',
          password: await bcrypt.hash("123", 10),  
          forceChangePass: 'no',
        },
      ],
    });

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();