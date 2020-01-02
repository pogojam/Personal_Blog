"use strict"
const express = require("express")
const serverless = require("serverless-http")
const app = express()
const bodyParser = require("body-parser")
const mailer = require("express-mailer")
const twilio = require("twilio")

module.exports.handler = serverless(app)
