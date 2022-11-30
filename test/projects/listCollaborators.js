const chai = require('chai')
const { ep_listCollaborators } = require('../../src/endpoint/projects/projects.js')
const data = require('../../src/json_schema/projects/listCollaborators.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request (process.env.APP_DEV)

module.exports = function (){

    describe('Get list of collaborators',() => {

        it('Success Get All Collaborators', (done) => {  
            api.get(ep_listCollaborators + global.idProject + "/collaborators")
            .set("Authorization", "Bearer " + process.env.token)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            })   
        })

        it('Failed Get Collaborators with No Token', (done) => {  
            api.get(ep_listCollaborators + global.idProject + "/collaborators")
            .set("Authorization", "Bearer " + null)
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            }) 
        })

        it('Failed Get Collaborators with Invalid Token', (done) => {  
            api.get(ep_listCollaborators + global.idProject + "/collaborators")
            .set("Authorization", "Bearer " + process.env.token + "1b")
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.jsonSchema(data.validData);
                done();
            })
        })

    })

}

