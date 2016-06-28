var BusinessReview = require('./../models/BusinessReviewModel.js');
// var PreferenceController = require('./../controller/PreferenceController.js');

/* assume coming from client
  {
    clientId:
    business_id:
    rating:
    review:
  }       
*/

module.exports = {
  getRating: function (req, res) {
    //assuming req.param looks like { business_id: this.props.business_id }
    var queryObj = {
      business_id: req.query.business_id
    }
    BusinessReview.where(queryObj).fetchAll()
      .then(function (foundReview) {
        res.status(200).send(foundReview);
      })
      .catch(function (err) {
        console.error('Error: Fetching '+ req.query.business_id + ' from db', err);
        res.status(500).send(err);
      });
  },

  addRating: function (req, res) {
    //assume req.body looks like above
    var rating = req.body;
    console.log('THIS IS RATING from addRating----->', rating)
    var newRating = {
      business_id: rating.business_id,
      user_id: rating.clientId,
      rating: rating.rating,
      review: rating.review
    };

    new BusinessReview(newRating).save()
      .then(function (saved) {
        console.log('Sucessfully saved => ', saved);
        res.status(201).send('Add success');
      })
      .catch(function (err) {
        console.error('Error: Saving to database', err);
        res.status(500).send(err);
      })
  }
};