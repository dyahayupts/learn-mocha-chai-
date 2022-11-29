const chai = require('chai')
const data = require('../../src/json_schema/projects/updateProject.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function (){
	describe('Update A Project', () => {
		it('Success Update A Project', (done) => {
            let api = chai.request("https://api.todoist.com/rest/v1");
			api.post("/projects/"+global.idProject)
	      	.set("Authorization", "Bearer 23d02ef9cdf4ccb9b311e06bdbe92c74125a020d")
	      	.send({
		    	name: "Test Update"
		    })
		    .end(function (err, res) {
		        expect(res.status).to.equals(204);
                expect(res.body.id).to.equals(global.idProject);
		        done();
		    });
		});
	})
}
