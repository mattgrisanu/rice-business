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
    var shouldSend = false;
    var newRecNames = []
    
    for(var i = 0; i < recs.length; i++) {
      recNames.push(recs[i].name)
    }

    // console.log('All recs =>', recNames);

    var _checkifValid = function (yelpData, business) {
      if (yelpData.businesses.length > 0 || yelpData.businesses[0].name === business) {
        return true;
      } else {
        return false;
      }
    }
     // Yelp.search({term: recNames[0], location: 'Las Vegas', limit: 1}) // name maybe an invalid yelp query term => handle error and continue
     //  .then(function(yelpData) {
     //    console.log('working api keys')
     //  })

    var _searchYelp = function (names) {
      console.log('at cycle =>', count, '/', recNames.length)
      if(count === recNames.length) {
        return;
      }
      console.log('querying ', names[count], 'on yelp');
      Yelp.search({term: names[count], location: 'Las Vegas', limit: 1}) // name maybe an invalid yelp query term => handle error and continue
      .then(function(yelpData) {
         count++;
         if (_checkifValid(yelpData, names[count])) {
            console.log('valid =>', count);
            BusinessInfoController.checkBus(names[count])
              .then(function(found) {
                if(count === recNames.length -1) {
                  shouldSend = true
                }
                
                if(found === null) { // not in db
                  // console.log('Got yelpData back from Yelp, sending to BusinessInfo To Add to Db =>', name);
                  console.log('not found in db =>', count);
                  BusinessInfoController._addFromYelp(yelpData, shouldSend, res)
                    .then(function (saved) {
                      _searchYelp(names);
                    })
                } else if (found !== null && shouldSend) {
                  res.status(201).send('Add Business sucessful!');
                }
              })
          } else {
           return _searchYelp(names);
         }
         
        })
      .catch(function(err) {
        console.error(err, 'Error from posting to Yelp Search Api from', name);
      })
    };

    _searchYelp(recNames);
    // for(var j = 0; j < recNames.length; j++) {
    //   (function (name) {
    //     console.log('Querying on Yelp =>', name);
    //      Yelp.search({term: name, location: 'Las Vegas', limit: 1}) // name maybe an invalid yelp query term => handle error and continue
    //      .then(function(yelpData) {
    //         if(yelpData.businesses.length > 0) {
    //           var restName = yelpData.businesses[0].name 
    //           if(restName === name) {
    //             newRecNames = newRecNames.concat(restName)
    //           }
    //         }
    //         var shouldSend = false;
            
    //         BusinessInfoController.checkBus(restName)
    //           .then(function(found) {
    //             count++;
    //             if(count === recNames.length -1) {
    //               shouldSend = true
    //             }
    //              if(found === null) {
    //               console.log('Got yelpData back from Yelp, sending to BusinessInfo To Add to Db =>', name);
    //               BusinessInfoController._addFromYelp(yelpData, shouldSend, res)
    //             } else if (found !== null && shouldSend) {
    //               res.status(201).send('Add Business sucessful!');
    //             }
    //           })
    //        })
    //      .catch(function(err) {
    //        console.error(err, 'Error from posting to Yelp Search Api from', name);
    //      })
    //    }) (recNames[j]);
    
  }
};