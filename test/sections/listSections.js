const chai = require('chai')
const { ep_listSections } = require('../../src/endpoint/sections/sections.js')
const data = require('../../src/json_schema/sections/listSections.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);


module.exports = function() {

    describe('Get list of Sections',() => {

        it('Success Get All Sections with valid ID Project', (done) => {
            
            api.get(ep_listSections + global.validIdProject)
            .set("Authorization", "Bearer " + process.env.token)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            })
            
        })

        it('Failed Get All Sections with invalid ID Project', (done) => {
            
            api.get(ep_listSections + global.validIdProject + "1b")
            .set("Authorization", "Bearer " + process.env.token)
            .end(function(err, res){
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.jsonSchema(data.invalidData);
                done();
            })
            
        })

    })
}