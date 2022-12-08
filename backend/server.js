import express from "express";
import "dotenv/config";
import passport from "passport";
import {Strategy} from 'passport-local'
import session from "express-session";
import * as bcrypt from 'bcrypt'
import customerRoutes from './routes/customerRoutes.js'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = express();

const PORT = process.env.PORT || 5000;


server.use(express.json())
//Configure express-session
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


//Configure passport
passport.use('customer',new Strategy((
{usernameField: 'email'}, async (email, password, done)=>{
  //Callback for getting user from database (or other source)
  const user = await prisma.customer.findUnique({
    where: {
      email: email,
    },
  })

  //check if user exist
  if(!user){
     done(null, false)
  }
  //Check if password matches
  if( password === user.password){
     done(null, user)

  }else{
     done(null, false)
  }

})))



server.use(passport.initialize())
server.use(passport.session())
//Serialize
passport.serializeUser((user, done)=> done(null, user.email))

//Deserialize
passport.deserializeUser( async(user, done) => 
    done(null, await prisma.customer.findUnique(user)))

    passport.deserializeUser( async(user, done) => 
    done(null, await prisma.employee.findUnique(user)))

server.post("/login", passport.authenticate('customer', {}), (req, res)=>{
  res.sendStatus(200)
})


//middleware for authentication
const isCustomerAuthenticated = (req,res, next)=>{
  req.isAuthenticated() ?next : res.sendStatus(200)
  
}

server.use("/customer", customerRoutes,isCustomerAuthenticated)


server.listen(PORT, () => console.log(`Server started on ${PORT}`))