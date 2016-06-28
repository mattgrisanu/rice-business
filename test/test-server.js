var chai = require('chai');
var chaiHttp = require('chai-http');
var business = require('./../server/server')
var should = chai.should();
var data = require('./test-data')
var BusinessInfo = require('./../server/models/BusinessInfoModel');
var BusinessDetail = require('./../server/models/BusinessDetailModel');

chai.use(chaiHttp);

describe('BusinessInfo Routes', function() {

  afterEach(function(done){
    BusinessInfo.where({name: 'Tadu Ethiopian Kitchen'}).destroy()
    BusinessDetail.where({business_id: 'tadu-ethiopian-kitchen-san-francisco-3'}).destroy()
    done();
  });

  it('should add a SINGLE restaurant on /api/business/info POST', function(done) {
    chai.request(business)
    .post('/api/business/info')
    .send(data.yelp)
    .end(function(err, res) {
      res.should.have.status(201);
      res.should.be.a('object')
      done()
    })
  });
  it('should list a SINGLE restaurant on /api/business/info GET', function(done) {
    chai.request(business)
      .get('/api/business/info')
      .query({business_id: 'sunrise-coffee-las-vegas-3'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name')
        res.body.should.have.property('phone')
        res.body.should.have.property('address')
        res.body.should.have.property('rating')
        done();
      })
  });
});

  it('should list a SINGLE restaurant category/neighborhood information on /api/business/detail GET', function(done) {
    chai.request(business)
      .get('/api/business/detail')
      .query({business_id: 'sunrise-coffee-las-vegas-3'})
      .end(function(err, res) {
        console.log(res.body)
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('type');
        res.body[0].should.have.property('value');
        res.body[0].value.should.equal('coffee');
        done();
      })
  });
  it('should list a SINGLE restaurant review/rating on /api/business/review GET');
  it('should add a SINGLE restaurant review/rating on /api/business/review POST');
  it('should query Yelp for restaurant information and save info to DB /api/business/yelp POST');
