const chai = require('chai')
const data = require('../../src/json_schema/projects/detailProject.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Detail project',() => {

        it('Success get detail of project', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v1');
            api.get("/projects/"+global.idProject)
            .set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
                .end(function(err, res){
                    expect(res.statusCode).to.equals(200);
                    expect(res.body.id).to.equals(global.idProject);
                    //expect(res.body).to.be.jsonSchema(data.positive);
                    done();
                })
        })

        it('Get detail project with id not found', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v1');
            api.get("/projects/0")
            .set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
                .end(function(err, res){
                    expect(res.statusCode).to.equals(404);
                    //expect(res.body).to.be.jsonSchema(data.negative);
                    done();
                })
        })
    })
}