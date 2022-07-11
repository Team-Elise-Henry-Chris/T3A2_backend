// environment variable setup
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const apiRoutesV1 = require("./routes")


app.use("/api/v1/", apiRoutesV1)

// export app to index.js to run
module.exports = app;
