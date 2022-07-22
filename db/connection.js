const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

if (process.env.NODE_ENV === "test") {
    startTestServer()
} else {
    mongoose
        .connect(process.env.ATLAS_DB_URL)
        .then(() =>
            console.log(
                mongoose.connection.readyState == 1
                    ? "Mongoose connected"
                    : "Mongoose failed"
            )
        )
        .catch((err) => console.log(err))
}

async function startTestServer() {
    const mongoServer = await MongoMemoryServer.create()
    console.log(MongoMemoryServer)
    console.log(mongoServer.getUri())
    await mongoose.connect(mongoServer.getUri(), {
        dbName: "testdb",
    })
}

module.exports = mongoose
