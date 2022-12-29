import Sib from "sib-api-v3-sdk";
import "dotenv/config";
import express from "express";

const route = express.Router();
Sib.ApiClient.instance.authentications["api-key"].apiKey = process.env.API_KEY;

route.post("/newBooking", async (req, res) => {
  const htmlContent = `<html><body>Hej ${req.body.custName}, <br/>
  Vi har mottagit din bokning med boknings nummer ${req.body.bookingId} på en ${req.body.cleaningService} den ${req.body.date} kl ${req.body.time}. <br/>
  Vill du avboka din bokning så måste detta göras 24h innan bokningen infaller.
  <br/> mvh <br/>
  Städa Fint AB
  </body></html>`;

  const email = new Sib.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Tack för din bokning!",
      sender: { email: "no-reply@stadafint.se", name: "Städa Fint AB" },
      to: [{ name: req.body.custName, email: req.body.email }],
      htmlContent: htmlContent,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
  res.json(email);
});
route.post("/cancelBooking", async (req, res) => {
  const htmlContent = `<html><body>Hej ${req.body.custName}, <br/>
  Din bokning med id ${req.body.bookingId} har nu blivit avbokad. <br/>
  Vill du göra en ny bokning gör du detta via mina sidor.
  <br/> mvh <br/>
  Städa Fint AB
  </body></html>`;

  const email = new Sib.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Avbokning av städtjänst",
      sender: { email: "no-reply@stadafint.se", name: "Städa Fint AB" },
      to: [{ name: req.body.custName, email: req.body.email }],
      htmlContent: htmlContent,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
  res.json(email);
});
route.post("/newEmployee", async (req, res) => {
  const htmlContent = `<html><body>Hej ${req.body.employeeName}, <br/>
  Ditt konto i bokningsportalen har blivit skapat. 
  <br/> Du loggar in med följande uppgifter:<br/>
  Användarnamn: ${req.body.email}<br/>
  Lösenord: 123 <br/>
  Vid första inloggningen så kommer du behöva byta lösenord till något eget.
  Har du några frågor om ditt konto så hör du av dig till administratören.
  <br/> mvh <br/>
  Städa Fint AB
  </body></html>`;

  const email = new Sib.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Ditt konto har blivit skapat!",
      sender: { email: "no-reply@stadafint.se", name: "Städa Fint AB" },
      to: [{ name: req.body.employeeName, email: req.body.email }],
      htmlContent: htmlContent,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
  res.json(email);
});

route.post("/assignCleaner", async (req, res) => {
  const htmlContent = `<html><body>Hej ${req.body.employeeName}, <br/>
  Du har blivit tilldelad en städning den ${req.body.date} kl ${req.body.time}. <br/>
  Logga in på mina sidor för mer information om städningen.
  <br/> mvh <br/>
  Städa Fint AB
  </body></html>`;

  const email = new Sib.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Städning tilldelad!",
      sender: { email: "no-reply@stadafint.se", name: "Städa Fint AB" },
      to: [{ name: req.body.employeeName, email: req.body.email }],
      htmlContent: htmlContent,
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
  res.json(email);
});



export default route;
