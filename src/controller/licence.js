import mongoose from 'mongoose';
import { Router } from 'express';
import Licence from '../model/licence';
import bodyParser from 'body-parser';
import passport from 'passport';

const randomize = require('randomatic');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xxxxx@gmail.com',
    pass: 'xxxxx'
  }
});

export default({ config, db }) => {
  let api = Router();

  // '/v1/user' - GET all users
  api.get('/', (req, res) => {
    Licence.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // '/v1/licence/:serial' - GET a specific user 
  api.get('/:serial', (req, res) => {
    Licence.find( {serial: req.params.serial} , (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  // '/v1/licence' - POST - update a user  
  api.put('/licence', (req, res) => {
    Licence.find({serial: req.body.serial }, (err, user) => {
      if (err) {
        console.log(err);
      }
      console.log(user, 'first user')

      if(user[0].username === req.body.username){
          if( user[0].imei=== req.body.imei || user[0].phoneSerial ===req.body.phoneSerial  ){
           res.json({ message: 'This serial number is for a single device'})
          }

          else{
            //generate reference number
           let ref = randomize('a', 20);

            let update = {
              "count" : 1,
              "phoneSerial" : req.body.phoneSerial,
              "licenceKey" : ref,
              "imei" : req.body.imei,
            }

            let id = user[0]._id
            Licence.findByIdAndUpdate( id, update,  (err, user) => {
              if (err){
                res.send( err )
              }
              console.log(user, " second user")
               // send notification email to buyer
                let email = user.email
                var mailOptions = {
                  from: 'noreplySale@jyqwinslimited.com',
                  to: email,
                  subject: 'Confirmation of Device Activation',
                  html: '<h1>Hello </h1><p>This is to confirm the payment for your device activation. Thank you.</p><p>Contact us on +234 816 787 6460 for any enquiry.</p>'
                }
                transporter.sendMail(mailOptions)
               return res.json({ licenceKey:`${user.licenceKey}` } );
            });
          }
      }
       else{res.json({message: 'User does not exist'})}
    });
  });


// '/v1/licence/add' - POST - add a serial 
  api.post('/add', (req, res) => {
        
        // create user profile
        let newLicence = new Licence();
        newLicence.username = req.body.username;
        newLicence.serial = req.body.serial;
        newLicence.email = req.body.email;


        newLicence.save(function(err, user) {
          if (err) {
            res.send(err);
          }
             // send notification email to buyer
                let email = req.body.email;
                console.log(email)
                var mailOptions = {
                  from: 'noreplySale@jyqwinslimited.com',
                  to: email,
                  subject: 'Here is your Licence Serial Number!',
                  html: '<h3>Dear Valued Customer </h3><p>Thank you for getting in touch with us. We have received your request for a licence. One of our team will get in touch with you soon.</p><p>You can also Contact us on +234 816 787 6460 for any enquiry.</p><p> Many Thanks</p>'
                }

            // send mail with defined transport object
            transporter.sendMail(mailOptions)
            res.json({ serial: `${user.serial}`});
        });

    });
  return api;
}
