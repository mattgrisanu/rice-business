var Yelp = require('./../config/yelp');
var BusinessInfoController = require('./BusinessInfoController.js');

// var PreferenceController = require('./../controller/PreferenceController.js');

/* assume coming from rec
  {
    items: [{
      cuisine: "cafes",
      id: "unlessstring",
      name: "The Beat Coffeehouse & Records",
      rating: 0.20202,
      userRated: false
    },
    {
      cuisine: "french",
      id: "unlessstring",
      name: "Sunrise Coffee",
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

    var saveToDb = function (arr, count) {
      if (arr === undefined || count === arr.length) {
        if (res !== undefined) {
          res.status(201).send('Add success');
        }
        return;
      }
      Yelp.search({term: arr[count], location: 'Las Vegas'})
        .then(function(yelpData) {
          console.log('Got yelpData back from Yelp, sending to BusinessInfo To Add to Db')
          BusinessInfoController._addFromYelp(yelpData, res)
          saveToDb(arr, ++count)
        })
        .catch(function(err) {
          console.error(err, 'Error from posting to Yelp Search Api')
          res.status(500).send(err);
        })
    };

    saveToDb(recNames, 0);
  }
};