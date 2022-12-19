import LocalStrategy from "passport-local";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import e from "express";

const prisma = new PrismaClient();



export const strategy =(passport) => {
  passport.serializeUser((user, done) => {
    console.log('serialize',user)
    done(null, user.email)});
  
  passport.deserializeUser(async (email, done) =>{
    console.log(email)
  const customer = await prisma.customer.findUnique({
    where:{
      email: email
    }
  })
  const employee = await prisma.employee.findUnique({
    where:{
     email: email
    }
  })
  if(customer !== null){
  console.log( 'deserialize customer',customer)
  done(null, customer)
  }else{

    console.log( 'deserialize employeee',employee)
    done(null, employee)
  }
  
});

  passport.use(
    "customer",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
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
        } catch (err) {
          console.log(err);
        }
      }
      )
      );
    

  
      
      


      passport.use(
        "employee",
        new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
)
)}