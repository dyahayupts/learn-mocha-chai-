const chai = require('chai')
const data = require('../../src/json_schema/projects/listProjects.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);
let endpointProject = "/projects/";

module.exports = function() {

    describe('Get list of projects',() => {

        it('Success Get All Projects', (done) => {
            
            api.get(endpointProject)
            .set("Authorization", "Bearer " + process.env.token)
            .query('page', 1)
            .end(function(err, res){
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data.validData);
                global.idProject = res.body[0].id;
                done();
            })
            
        })

    })
}