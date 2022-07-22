const mongoose = require("../db/connection")

module.exports = (testDescription, testsCallBack) => {
    describe(testDescription, () => {
        beforeEach(async () => {
            for (var i in mongoose.connection.collections) {
                await mongoose.connection.collections[i].deleteMany(() => {})
            }
        })

        testsCallBack()
    })
}
