const chai = require('chai')
const { ep_createProject } = require('../../src/endpoint/projects/projects.js')
const data = require('../../src/json_schema/projects/createProject.json')
const expect = require('chai').expect
const { faker } = require('@faker-js/faker')
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

let name = faker.name.firstName() 

module.exports = function() {

    describe('Create project',() => {

        it('Success create project', (done) => {
            
            api.post(ep_createProject)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : name + " Project"
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                global.idProject = res.body.id;
                done();
            })
        })

        it('Failed create project with empty name', (done) => {

            api.post(ep_createProject)
            .set("Authorization", "Bearer " + process.env.token)
            .set("Content-type", "application/json")
            .send({
                name : null,
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(400);
                expect(res.body).to.be.jsonSchema(data.emptyName);
                done();
            })
        })

    })

}