const mochaSuite = require("./mocha_test_suite")
const app = require("../app.js")
const chai = require("chai")
const chaiHttp = require("chai-http")

mochaSuite("Gets all topics", () => {
    it("returns an empty array if there are no topics", (done) => {
        chai.request(app)
            .get("/api/v1/topic")
            .end((err, res) => {
                res.to.deep.equal([])
                done()
            })
    })
})

