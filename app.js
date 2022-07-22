// environment variable setup
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const cors = require("cors")
const errorHandler = require("./middleware/error_handler.js")
const apiRoutesV1 = require("./routes")
const cookieParser = require("cookie-parser")

// allow cross-origin resource sharing
app.use(cors({ origin: "*", credentials: true }))

// interpret body json
app.use(express.json())

// interpret cookies
app.use(cookieParser())

// routes
app.use("/api/v1/", apiRoutesV1)

// error handler middleware
app.use(errorHandler)

// export app to index.js to run
module.exports = app
