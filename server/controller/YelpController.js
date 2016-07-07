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

var _checkifValid = function (yelpData, business_name) {
  if (yelpData.businesses.length > 0 && yelpData.businesses[0].name === business_name) {
    return true;
  } else {
    return false;
  }
};

var _isValidYelp = function (business_name) {
  return Yelp.search({term: business_name, location: 'Las Vegas', limit: 1})
    .then(function (yelpData) {
      if (_checkifValid(yelpData, business_name)) {
        return yelpData
      } else {
        return false;
      }
    })
    .catch(function (err) {
      console.error('Error: Cannot complete Yelp query with business_name = ', name);
    });
};

var _shouldSaveToDb = function (business_name, allValidYelp) {
  return _isValidYelp(business_name)
    .then(function (data) {
      if (data) {
        allValidYelp.push(business_name);
        return BusinessInfoController.checkBus(business_name)
          .then(function(found) {
            return [found, data, allValidYelp];
          })
          .catch(function (err) {
            console.error('Error: Cannot match ', business_name, ' in BusinessInfo db');
          })
      } else {
        return [null, null, allValidYelp];
      }
    })
    .catch(function (err) {
      console.error('Error: Cannot complete Yelp query with business_name = ', name);
    })
};

module.exports = {
  queryYelp: function(req, res) {
    var recs = req.body.response
    var recNames = [];
    var count = 0;
    var validYelp = [];
    var shouldSend = false;
    
    for(var i = 0; i < recs.length; i++) {
      recNames.push(recs[i].name)
    }

    var _handleYelpSaveAndRes = function (all_business_names) {
      count++;
      _shouldSaveToDb(all_business_names[count], [])
        .then(function (matchedBusiness) {
          if(count === recNames.length -1) {
            shouldSend = true
          }

          if (matchedBusiness[0] !== null && matchedBusiness[1] !== null) { // valid yelp
            // save
              // then call next

          } else { // invalid yelp
            // send if shouldSend === true
            // if not call next
            if () {

            } else {

            }
          }
          if (matchedBusiness[0].length === null) {
            BusinessInfoController._addFromYelp(matchedBusiness[1], shouldSend, matchedBusiness[2], res);
          } else if (matchedBusiness[0].length !== null && shouldSend) {

          }
        })
    }

    _handleYelpSaveAndRes(recNames);
    
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