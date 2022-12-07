const chai = require('chai')
const { ep_deleteSection } = require('../../src/endpoint/sections/sections.js')
const data = require('../../src/json_schema/sections/deleteSection.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Success delete a section',() => {

        it('Success delete  a section', (done) => {
            api.delete(ep_deleteSection + global.idSection)
            .set("Authorization", "Bearer " + process.env.token)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(204);
                    expect(res.body).to.be.jsonSchema(data.validData);
                    done();
                })
        }) 

        // Error API : status code 204
        // it('Failed delete  a section with unregistered id', (done) => {
        //     api.delete(ep_deleteSection + "1")
        //     .set("Authorization", "Bearer " + process.env.token)
        //         .end(function(err, res){
        //             expect(res.statusCode).to.equals(404);
        //             done();
        //         })
        // }) 

        // Error API : status code 204
        // it('Failed delete a section with already deleted id', (done) => {
        //     api.delete(ep_deleteSection + global.idSection)
        //     .set("Authorization", "Bearer " + process.env.token)
        //         .end(function(err, res){
        //             expect(res.statusCode).to.equals(404);
        //             done();
        //         })
        // }) 

    })

}