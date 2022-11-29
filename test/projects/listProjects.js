const chai = require('chai')
const data = require('../../src/json_schema/projects/listProjects.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Get list of projects',() => {

        it('Success Get All Projects', (done) => {
            
            let api = chai.request('https://api.todoist.com/rest/v1');
            api.get('/projects')
            .set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
            .query('page', 1)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.jsonSchema(data);
                global.idProject = res.body[0].id;
                done();
            })
            
        })

    })
}