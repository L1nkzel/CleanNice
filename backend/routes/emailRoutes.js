import Sib from "sib-api-v3-sdk";
import "dotenv/config";
import express from "express";
import easyinvoice from "easyinvoice";



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
route.post("/invoice", async (req, res) => {

  let price;
  const date = new Date();
  const dueDate = new Date(new Date().setDate(date.getDate() + 30));
 
  if(req.body.cleaningService === "Brons Städning") {
   price = 2000;
  } else if(req.body.cleaningService === "Silver Städning") {
   price = 2800;
  } else {
   price = 4000;

  } 

  const data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },

    // Your own data
    sender: {
      company: "Städa Fint AB",
      address: "Nydalavägen 5a",
      zip: "12321",
      city: "Malmö",
      country: "Sweden",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      company: "Mottagare",
      address: req.body.custName,
      zip: req.body.companyName,
      city: req.body.orgNr,
      country: req.body.adress,
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: req.body.bookingId,
      // Invoice data
      date: date.toLocaleDateString("sv-SE"),
      // Invoice due date
      "due-date": dueDate.toLocaleDateString("sv-SE")
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products: [
      {
        quantity: 1,
        description: req.body.cleaningService,
        "tax-rate": 25,
        price: price, 
      }
    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Vänligen betala fakturan inom 30 dagar.",
    // Settings to customize your invoice
    settings: {
      currency: "SEK", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "tax-notation": "gst", // Defaults to 'vat'
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
      invoice: "FAKTURA", // Default to 'INVOICE'
      number: "OCR-nr", // Defaults to 'Number'
      date: "Datum", // Default to 'Date'
      "due-date": "Utgångsdatum", // Defaults to 'Due Date'
      "subtotal": "Exl moms", // Defaults to 'Subtotal'
      "products": "Tjänster", // Defaults to 'Products'
      "quantity": "Antal", // Default to 'Quantity'
      price: "Pris", // Defaults to 'Price'
      "product-total": "Totalt", // Defaults to 'Total'
      total: "Summa", // Defaults to 'Total'
    },
  };

  const invoice = await easyinvoice.createInvoice(data);
  const htmlContent = `<html><body>Hej ${req.body.custName}, <br/>
  Här kommer en faktura på din städning med boknings id ${req.body.bookingId}.<br/>
  Var god se bifogad fil.
  <br/> mvh <br/>
  Städa Fint AB
  </body></html>`;

  const email = new Sib.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Faktura Städa Fint",
      sender: { email: "no-reply@stadafint.se", name: "Städa Fint AB" },
      to: [{ name: req.body.custName, email: req.body.email }],
      htmlContent: htmlContent ,
      attachment: [{"name": "faktura.pdf", "content": invoice.pdf}]
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
