var chai = require('chai');
var chaiHttp = require('chai-http');
var business = require('./../server/server')
var host = "http://" + process.env.IP + ':' + process.env.PORT;
var should = chai.should();

chai.use(chaiHttp);


describe('Business Routes', function() {
  it('should list a SINGLE restaurant on /api/business/info GET', function(done) {
    chai.request(business)
      .get('/api/business/info')
      .query({business_id: 'sunrise-coffee-las-vegas-3'})
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });
  it('should add a SINGLE restaurant on /api/business/info POST');
  it('should list a SINGLE restaurant category/neighborhood information on /api/business/detail GET');
  it('should list a SINGLE restaurant review/rating on /api/business/review GET');
  it('should add a SINGLE restaurant review/rating on /api/business/review POST');
  it('should query Yelp for restaurant information and save info to DB /api/business/yelp POST');
});