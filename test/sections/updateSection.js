const chai = require('chai')
const { en_IND } = require('faker/lib/locales.js')
const { ep_updateSection } = require('../../src/endpoint/sections/sections.js')
const data = require('../../src/json_schema/sections/detailSection.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Update a Section',() => {

        it('Success update section with valid data', (done) =>{

            api.post(ep_updateSection + global.idSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : "Update Section Test",
                project_id : global.validIdProject
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(204);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            })
        })

        it('Failed update section with unregistered id section', (done) =>{

            api.post(ep_updateSection + "1")
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : "Update section",
                project_id : global.validIdProject
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(404);
                done();
            })
        })

        it('Failed update section with empty name', (done) =>{

            api.post(ep_updateSection + global.idSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : "",
                project_id : global.validIdProject
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(400);
                done();
            })
        })

        // Error API : 500
        // it('Failed update section with invalid name', (done) =>{

        //     api.post(ep_updateSection + global.idSection)
        //     .set("Authorization", "Bearer " + process.env.token)
        //     .set("Content-type", "application/json")
        //     .send({
        //         project_id : global.validIdProject,
        //         name : 123
        //     })
        //     .end(function(err, res){
        //         expect(res.statusCode).to.equals(400);
        //         done();
        //     })
        // })

    })

}