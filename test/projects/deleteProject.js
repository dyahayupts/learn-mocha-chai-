const chai = require('chai')
const { ep_deleteProject } = require('../../src/endpoint/projects/projects.js')
const data = require('../../src/json_schema/projects/deleteProject.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function (){
	describe('Delete A Project',() => {
		it('Success Delete A Project', (done) => {
            api.delete(ep_deleteProject + global.idProject)
	      	.set("Authorization", "Bearer " + process.env.token)
		    .end(function (err, res) {
		        expect(res.statusCode).to.equals(204);
                expect(res.body).to.be.jsonSchema(data.validData);
		        done();
		    });
		});
	})
}
