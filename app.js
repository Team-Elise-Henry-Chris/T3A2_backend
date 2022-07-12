// environment variable setup
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors")
const apiRoutesV1 = require("./routes")

// allow cross-origin resource sharing
app.use(cors())
// interpret request body as json
app.use(express.json())
app.use("/api/v1/", apiRoutesV1)


// export app to index.js to run
module.exports = app;
