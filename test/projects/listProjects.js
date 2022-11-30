const chai = require('chai')
const { ep_listProjects } = require('../../src/endpoint/projects/projects.js')
const data = require('../../src/json_schema/projects/listProjects.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Get list of projects',() => {

        it('Success Get All Projects', (done) => {  
            api.get(ep_listProjects)
            .set("Authorization", "Bearer " + process.env.token)
            .end(function(err, res){
                //console.log(res.body);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            })
            
        })

        it('Failed Get Projects with No Token', (done) => {  
            api.get(ep_listProjects + global.idProject)
            .set("Authorization", "Bearer " + null)
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.jsonSchema(data.invalidData);
                done();
            }) 
        })

        it('Failed Get Projects Invalid Token', (done) => {  
            api.get(ep_listProjects + global.idProject)
            .set("Authorization", "Bearer " + process.env.token + "1b")
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.jsonSchema(data.invalidData);
                done();
            })
        })

    })
}