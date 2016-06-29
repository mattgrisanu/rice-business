var chai = require('chai');
var chaiHttp = require('chai-http');
var business = require('./../server/server')
var should = chai.should();
var data = require('./test-data')
var BusinessInfo = require('./../server/models/BusinessInfoModel');
var BusinessDetail = require('./../server/models/BusinessDetailModel');
var BusinessReview = require('./../server/models/BusinessReviewModel');
var db = require('./../server/config/db')

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
        res.body.rating.should.equal(4.5)
        done();
      })
  });
});
describe('BusinessDetail Routes', function() {

  it('should list a SINGLE restaurant category/neighborhood information on /api/business/detail GET', function(done) {
    chai.request(business)
      .get('/api/business/detail')
      .query({business_id: 'sunrise-coffee-las-vegas-3'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('type');
        res.body[0].should.have.property('value');
        res.body[0].value.should.equal('coffee');
        done();
      })
  });
});
describe('BusinessReview Routes', function() {
  beforeEach(function(done) {
    BusinessReview.where({business_id: 'sunrise-coffee-las-vegas-3'}).destroy()

    var newRating = {
      business_id: 'sunrise-coffee-las-vegas-3',
      user_id: 'katkat',
      rating: 5,
      review: "Monkey's old haunt when used to run the park in daylight. Clean pit stop and recovery meal of ALIEN and NOM NOM BURRITOs (vegan option)and COFFEE!..."
    };

    new BusinessReview(newRating).save()
    done()
  })
  afterEach(function(done){
    BusinessReview.where({business_id: 'sunrise-coffee-las-vegas-3'}).destroy()
    
    // BusinessInfo.where({name: 'TACOS EL GORDO'}).destroy()
    // BusinessDetail.where({business_id: 'tacos-el-gordo-las-vegas'}).destroy()
   

    done();
  });

  it('should list a SINGLE restaurant review/rating on /api/business/review GET', function(done) {
     chai.request(business)
      .get('/api/business/review')
      .query({business_id: 'sunrise-coffee-las-vegas-3'})
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body[0].should.have.property('rating')
        res.body[0].should.have.property('review')
        res.body[0].review.should.be.a('string')
        done();
        
      })
  });
  it('should add a SINGLE restaurant review/rating on /api/business/review POST', function(done) {
    chai.request(business)
      .post('/api/business/review')
      .send(data.review)
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.have.property('text');
        res.text.should.equal('Add success')
        done()
      })
  });
});
describe('Business Yelp Routes', function() {
  afterEach(function(done){
    BusinessInfo.where({name: 'TACOS EL GORDO'}).destroy()
    BusinessDetail.where({business_id: 'tacos-el-gordo-las-vegas'}).destroy()
    done();
  });

  it('should query Yelp for restaurant information and save info to DB /api/business/yelp POST', function(done) {
    chai.request(business)
      .post('/api/business/yelp')
      .send(data.recommendation)
      .end(function(err,res) {
        res.should.have.status(201);
        res.should.have.property('text');
        res.text.should.equal('Add success!!')
        done()
      })
  });
});
