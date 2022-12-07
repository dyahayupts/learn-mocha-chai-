const chai = require('chai')
const { ep_detailSection } = require('../../src/endpoint/sections/sections.js')
const data = require('../../src/json_schema/sections/detailSection.json')
const expect = require('chai').expect
chai.use(require('chai-http'))
chai.use(require('chai-json-schema'))
require('dotenv').config()

const api = chai.request(process.env.APP_DEV);

module.exports = function() {

    describe('Detail Section',() => {

        it('Success get detail of section', (done) => {
    
            api.get(ep_detailSection + global.idSection)
            .set("Authorization", "Bearer " + process.env.token)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(200);
                    expect(res.body.id).to.equals(global.idSection);
                    expect(res.body).to.be.jsonSchema(data.validData);
                    done();
                })
        })

        it('Get detail section with unregistered id section', (done) => {

            api.get(ep_detailSection + "1a")
            .set("Authorization", "Bearer " + process.env.token)
                .end(function(err, res){
                    expect(res.statusCode).to.equals(404);
                    done();
                })
        })
    })
}