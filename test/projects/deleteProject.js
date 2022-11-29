const chai = require('chai')
const data = require('../../src/json_schema/projects/deleteProject.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function (){
	describe('Delete A Project',() => {
		it('Success Delete A Project', (done) => {
            let api = chai.request('https://api.todoist.com/rest/v1');
            api.delete("/projects/2303206119")
	      	.set("Authorization", "Bearer ea19ce9f20f84bcf0fe813977ff903b58b8bf73c")
		    .end(function (err, res) {
		        expect(res.status).to.equals(204);
		        done();
		    });
		});
	})
}
