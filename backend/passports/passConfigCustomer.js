import { Strategy } from "passport-local"
import * as bcrypt from 'bcrypt'

const passConfigCustomer = (passport, loadUserBy) => {
  const verify = async (email, password, done)=>{
 
    const user = await loadUserBy(email)

    if(!user){
       done(null, false)
    }
    
    if(await bcrypt.compare(password,user.password)){
       done(null, user)

    }else{
       done(null, false)
    }

  }

  passport.use(new Strategy({usernameField: 'email'}, verify))


 
  passport.serializeUser((user, done)=> done(null, user.email))


  passport.deserializeUser( async(user, done) => 
      done(null, await loadUserBy(user)))
}

export default passConfigCustomer;