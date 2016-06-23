var Yelp = require('./../config/yelp');
var BusinessInfoController = require('./BusinessInfoController.js');

// var PreferenceController = require('./../controller/PreferenceController.js');

/* assume coming from rec
  {
    items: [{
      cuisine: "cafes",
      id: "unlessstring",
      name: "La Belle Terre Bread French Bakery Cafe",
      rating: 0.20202,
      userRated: false
    },
    {
      cuisine: "french",
      id: "unlessstring",
      name: "Patisserie Manon",
      rating: 0.20202,
      userRated: false
    }]
  }       
*/

module.exports = {
  queryYelp: function(req, res) {
    var recs = req.body.items
    var recNames = [];
    for(var i = 0; i < recs.length; i++) {
      recNames.push(recs[i].name)
    }

    recNames.forEach(function(rec) {
      Yelp.search({term: rec})
        .then(function(yelpData) {
          console.log('Got yelpData back from Yelp, sending to BusinessInfo To Add to Db')
          BusinessInfoController._addFromYelp(yelpData, res)
        })
        .catch(function(err) {
          console.error(err, 'Error from posting to Yelp Search Api')
          res.status(500).send(err);
        })
    })

  }
};