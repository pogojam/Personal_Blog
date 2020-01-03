"use strict"
const express = require("express")
const serverless = require("serverless-http")
const app = express()
const bodyParser = require("body-parser")
const mailer = require("express-mailer")
const twilio = require("twilio")

const twilloID = ACad678d8906a6419e29511e79cede8445
const twilloKey = env.process.Twillo_KEY
// const twilioClient = twilio(twilloID, twilloKey)

// mailer.extend(app, {
//   from: "no-reply@example.com",
//   host: "smtp.gmail.com", // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: "gmail.user@gmail.com",
//     pass: "userpass",
//   },
// })

// function updateDatabase(data) {
//   return newValue
// }

// app.use(bodyParser)
// app.post("/Lead", (res, req) => {
//   const newValue = updateDatabase(res.body)

//   twilioClient.messages
//     .create({
//       body: "This is the ship that made the Kessel Run in fourteen parsecs?",
//       from: "+15017122661",
//       to: "+9286004952",
//     })
//     .then(message => console.log(message.sid))

//   req.json(newValue)
// })

const handleMessage = (event, context, callback) => {
  console.log(event.body, twilloKey)
  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  })
}

module.exports.handler = handleMessage
