import Sib from 'sib-api-v3-sdk'
import "dotenv/config";

export const sendEmail = (API_KEY)=>{

  Sib.ApiClient.instance.authentications['api-key'].apiKey = API_KEY;
  
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    {
      'subject':'Hello from the Node SDK!',
      'sender' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
      'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
      'to' : [{'name': 'John Doe', 'email':'semkopecar385@hotmail.com'}],
      'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
      'params' : {'bodyMessage':'Made just for you!'}
    }
    ).then(function(data) {
      console.log(data);
    }, function(error) {
      console.error(error);
});
    }