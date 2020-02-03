const express = require("express");
const consign = require("consign");

const app = express();

consign()
    .include("src/models/db.js")
    .then("libs/config.js")   
    .then("src/controllers")
    .then("src/routes")
    .then("libs/boot.js")
    .into(app);