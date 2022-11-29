//const { faker } = require('@faker-js/faker');
const chai = require('chai')
const data = require('../../src/json_schema/sections/createSection.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Create Section',() => {

        it('Success create a section', (done) => {

            let api = chai.request('https://api.todoist.com/rest/v1');
            api.post(`/sections`)
            .set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
            .set("Content-type", "application/json")
            .send({
                project_id : "2295879405",
                name : "Boulevard Event",
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(200);
                expect(res.body).to.be.jsonSchema(data);
                //expect(res.body.name).to.equals(name);
                done();
            })
        })

        it('Failed create section with empty name', (done) => {

            let api = chai.request('https://api.todoist.com/rest/v1');
            api.post(`/sections`)
            .set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
            .set("Content-type", "application/json")
            .send({
                project_id : "2295879405",
                name : ""
            })
            .end(function(err, res){
                expect(res.statusCode).to.equals(400);
                //expect(res.body).to.be.jsonSchema(data);
                //expect(res.body.name).to.equals(name);
                done();
            })
        })

    })

}