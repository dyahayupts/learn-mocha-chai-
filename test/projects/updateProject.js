const chai = require('chai')
const { ep_updateProject } = require('../../src/endpoint/projects/projects.js');
const data = require('../../src/json_schema/projects/updateProject.json')
const expect = require('chai').expect
const { faker } = require('@faker-js/faker')
chai.use(require('chai-http'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

let name = faker.name.firstName()

module.exports = function (){

	describe('Update A Project', () => {

		it('Success Update A Project', (done) => {
            api.post(ep_updateProject + global.idProject)
	      	.set("Authorization", "Bearer " + process.env.token)
	      	.send({
		    	name : name + " Project"
		    })
		    .end(function (err, res) {
		        expect(res.statusCode).to.equals(204);
				expect(res.body).to.be.jsonSchema(data.validData);
		        done(); 
		    });
		});

		it('Failed Update A Project with null Name', (done) => {
            api.post(ep_updateProject + global.idProject)
	      	.set("Authorization", "Bearer " + process.env.token)
	      	.send({
		    	name : null
		    })
		    .end(function (err, res) {
		        expect(res.statusCode).to.equals(400);
				expect(res.body).to.be.jsonSchema(data.emptyName);
		        done(); 
		    });
		});

	})
}
