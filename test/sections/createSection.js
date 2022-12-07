const chai = require('chai')
const { ep_createProject } = require('../../src/endpoint/projects/projects.js')
const { ep_createSection } = require('../../src/endpoint/sections/sections.js')
const dataProject = require('../../src/json_schema/projects/createProject.json')
const data = require('../../src/json_schema/sections/createSection.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Create Section',() => {

        it('Success create project', (done) => {
            
            api.post(ep_createProject)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : "Test Create Project"
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(200);
                expect(res.body).to.be.jsonSchema(dataProject.validData);
                global.validIdProject = res.body.id;
                done();
            })
        })

        it('Success create section valid data', (done) => {

            api.post(ep_createSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                project_id : global.validIdProject,
                order : 3,
                name : "Section Test 1"
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                global.idSection = res.body.id;
                done();
            })
        })

        it('Failed create section with invalid Id Project', (done) => {

            api.post(ep_createSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                project_id : "123445",
                name : "Section Test 2"
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(404);
                done();
            })
        })

        it('Failed create section with unregistered Id Project', (done) => {

            api.post(ep_createSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                project_id : 1,
                name : "Test Section"
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(404);
                done();
            })
        })

        it('Failed create section with empty name', (done) => {

            api.post(ep_createSection)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                project_id : global.validIdProject,
                name : ""
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(400);
                done();
            })
        })

        // Error API : 500
        // it('Failed create section with invalid name', (done) => {

        //     api.post(ep_createSection)
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