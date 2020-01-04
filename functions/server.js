"use strict"
// const mailer = require("express-mailer")
// const twilio = require("twilio")

// const twilloID = "ACad678d8906a6419e29511e79cede8445"
// const twilloKey = process.env.Twillo_KEY
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

// app.use(bodyParser)
app.get("/", (req, res) => {
  console.log("hello world")

  res.send("hii")
})

app.post("/Lead", (res, req) => {
  console.log("hello world")

  // twilioClient.messages
  //   .create({
  //     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
  //     from: "+15017122661",
  //     to: "+9286004952",
  //   })
  //   .then(message => console.log(message.sid))

  // req.json(newValue)
})

exports.handler = function(event, context, callback) {}

app.listen(port, () => {
  console.log("App is listining on port " + port)
})
