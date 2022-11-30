const chai = require('chai')
const { ep_detailProject } = require('../../src/endpoint/projects/projects.js');
const data = require('../../src/json_schema/projects/detailProject.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Detail project',() => {

        it('Success get detail of project', (done) => {
            api.get(ep_detailProject + global.idProject)
            .set("Authorization", "Bearer " + process.env.token)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(200);
                    //console.log(res.body);
                    expect(res.body.id).to.equals(global.idProject);
                    expect(res.body).to.be.jsonSchema(data.validData);
                    done();
                })
        }) 

        it('Get detail project with id not found', (done) => {
            api.get(ep_detailProject + '1')
            .set("Authorization", "Bearer " + process.env.token)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(404);
                    expect(res.body).to.be.jsonSchema(data.invalidData);
                    done();
                })
        })

        it('Get detail project with no token', (done) => {
            api.get(ep_detailProject + global.idProject)
            .set("Authorization", "Bearer " + null)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(401);
                    expect(res.body).to.be.jsonSchema(data.invalidData); 
                    done();
                })
        })

    })
}