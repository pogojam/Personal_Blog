"use strict"
const twilio = require("twilio")

const twilloID = "ACad678d8906a6419e29511e79cede8445"
const twilloKey = "ACad678d8906a6419e29511e79cede8445"
const twilioClient = twilio(twilloID, twilloKey)

exports.handler = function(event, context, callback) {
  const data = event.body
  console.log("function fired", data)

  twilioClient.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+16788661268",
      to: "+19286004952",
    })
    .then(message => {
      callback(null, {
        statusCode: 200,
        body: "Hello, World",
      })
    })
    .catch(err => {
      console.log(err)
    })
}
