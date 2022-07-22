const mochaSuite = require("./mocha_test_suite")
const app = require("../app.js")
const chai = require("chai")
const should = chai.should()
const chaiHttp = require("chai-http")

chai.use(chaiHttp)

mochaSuite("Gets all posts", () => {
    it("returns an array of posts", (done) => {
        chai.request(app)
            .get("/api/v1/topic")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})


