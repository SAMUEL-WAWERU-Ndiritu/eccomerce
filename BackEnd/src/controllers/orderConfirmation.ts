import * as mssql from 'mssql';
import * as nodemailer from 'nodemailer';

export async function getOrders(req: any, res: any) {
try {
await mssql.connect("../config/database.ts");
const request = new mssql.Request();
const result = await request.execute('getOrders');
res.status(200).send(result.recordset);
} catch (err) {
throw err;
}
}

export async function updateOrderStatus(req: any, res: any) {
const orderID = req.params.id;
const status = req.body.status;
try {
  await mssql.connect("../config/database.ts");
const request = new mssql.Request();
await request
.input('status', mssql.VarChar(20), status)
.input('orderID', mssql.Int, orderID)
.execute('updateOrderStatus');
res.status(200).send(`Order status updated to ${status}`);// Send a confirmation message to the user
if (status === 'delivered') {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "samuelnderitu@gmail.com",
      pass: "sdfg34"
    }
  });

  const mailOptions = {
    from: 'your.email@gmail.com',
    to: 'recipient.email@gmail.com',
    subject: 'Order Confirmation',
    text: 'Your order has been successfully delivered.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}} catch (err) {
  throw err;
  }
  }
  
  
  
  
  
