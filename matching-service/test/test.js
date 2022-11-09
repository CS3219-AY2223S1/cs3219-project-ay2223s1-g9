import chai, { assert } from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'

chai.use(chaiHttp)
chai.should()

describe("Health Check", () => {
    it("Service should be able to run", (done) => {
        chai.request(app)
            .get('')
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                res.text.should.eql('Hello World from matching-service')
                done()
            })
    })
})