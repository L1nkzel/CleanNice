import Sib from 'sib-api-v3-sdk'
import "dotenv/config";
import express from "express";

const route = express.Router();
Sib.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY;

route.post("/", async (req, res) => {

  const htmlContent =  `<html><body>Hej ${req.body.custName}, <br/>{{params.bodyMessage}}</body></html>`
  const message = `
  Vi har mottagit din bokning på en ${req.body.cleaningService} den ${req.body.date} kl ${req.body.time}
  mvh <br/>
  Städa Fint AB
  ` 
  
 const email = new Sib.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Tack för din bokning!',
      'sender' : {'email':'no-reply@stadafint.se', 'name':'Städa Fint AB'},
      'replyTo' : {'email':'no-reply@stadafint.se', 'name':'Städa Fint AB'},
      'to' : [{'name': req.body.custName, 'email':'semkopecar385@hotmail.com'}],
      'htmlContent' : htmlContent,
      'params' : {'bodyMessage':message
    }}
    ).then(function(data) {                              
      console.log(data);
    }, function(error) {
      console.error(error);
});
res.json(email)
    })

    export default route