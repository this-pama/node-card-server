import mongoose from 'mongoose';
import { Router } from 'express';
import Request from '../model/request';
import bodyParser from 'body-parser';
import passport from 'passport';

const randomize = require('randomatic');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxxxxxxxxxx@gmail.com',
    pass: 'xxxxxxxxx'
  }
});

export default({ config, db }) => {
  let api = Router();

  // '/v1/request' - GET all request
  api.get('/', (req, res) => {
    Request.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // '/v1/request/:name' - GET a specific user request
  api.get('/:name', (req, res) => {
    Request.find({name: req.params.name}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  // '/v1/request' - POST - update a user  
  api.post('/request', (req, res) => {
        
        // create user profile
        let newRequest = new Request();
        newRequest.name = req.body.name;
        newRequest.username = req.body.username;
        newRequest.device = req.body.device;
        newRequest.phone = req.body.phone;
        newRequest.email = req.body.email;
        newRequest.address = req.body.address;

        newRequest.save(function(err, user) {
          if (err) {
            res.send(err);
          }
             // send notification email to buyer
                let email = req.body.email;
                console.log(email)
                var mailOptions = {
                  from: 'noreplySale@jyqwinslimited.com',
                  to: email,
                  subject: 'You are Welcome!',
                  html: '<h3>Dear Valued Customer </h3><p>Thank you for getting in touch with us. We have received your request for a licence. One of our team will get in touch with you soon.</p><p>You can also Contact us on +234 816 787 6460 for any enquiry.</p><p> Many Thanks</p>'
                }

            // send mail with defined transport object
            transporter.sendMail(mailOptions)
            res.json({ message: 'Request has been sent'});
        });

    });


  return api;
}
