var Yelp = require('./../config/yelp');
var BusinessInfoController = require('./BusinessInfoController.js');

// var PreferenceController = require('./../controller/PreferenceController.js');

/* assume coming from rec
  { 
    response: [{
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
    var recs = req.body.response
    var recNames = [];
    var count = 0
    for(var i = 0; i < recs.length; i++) {
      recNames.push(recs[i].name)
    }


    for(var j = 0; j < recNames.length; j++) {
      (function (name) {
         Yelp.search({term: name, location: 'Las Vegas', limit: 1})
         .then(function(yelpData) {
            var shouldSend = false;

            BusinessInfoController.checkBus(name)
              .then(function(found) {
                count++;
                if(count === recNames.length -1) {
                  shouldSend = true
                }
                 if(found === null) {
                  console.log('Got yelpData back from Yelp, sending to BusinessInfo To Add to Db')
                  BusinessInfoController._addFromYelp(yelpData, shouldSend, res)
                } else if (found !== null && shouldSend) {
                  res.status(201).send('Add Business sucessful!');
                }
              })
           })
         .catch(function(err) {
           console.error(err, 'Error from posting to Yelp Search Api from', name);
         })
       }) (recNames[j]);
    }
  }
};