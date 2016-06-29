var BusinessInfo = require('./../models/BusinessInfoModel.js');
var BusinessDetailController = require('./BusinessDetailController.js');

/**
assuming we yelp api searched returned json
{
    "region": {
        "span": {
            "latitude_delta": 0.0, 
            "longitude_delta": 0.0
        }, 
        "center": {
            "latitude": 37.7847934, 
            "longitude": -122.4141884
        }
    }, 
    "total": 49306, 
    "businesses": [
        {
            "is_claimed": true, 
            "rating": 4.5, 
            "mobile_url": "http://m.yelp.com/biz/tadu-ethiopian-kitchen-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=tOhjjRQkHzG3U_KcHUn-PQ", 
            "rating_img_url": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png", 
            "review_count": 317, 
            "name": "Tadu Ethiopian Kitchen", 
            "rating_img_url_small": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png", 
            "url": "http://www.yelp.com/biz/tadu-ethiopian-kitchen-san-francisco-3?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=tOhjjRQkHzG3U_KcHUn-PQ", 
            "categories": [
                [
                    "Ethiopian", 
                    "ethiopian"
                ]
            ], 
            "menu_date_updated": 1463688477, 
            "phone": "4154096649", 
            "snippet_text": "Kitfo special and gomen besega are my jam and they definitely delivered here! The spices and ghee were so indulgent against the tender meat and stewed...", 
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/ClnhSWG3puv1_NsL3retiw/ms.jpg", 
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/Nhsy8iz8tAeoOswapLdMMA/ms.jpg", 
            "display_phone": "+1-415-409-6649", 
            "rating_img_url_large": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png", 
            "menu_provider": "eat24", 
            "id": "tadu-ethiopian-kitchen-san-francisco-3", 
            "is_closed": false, 
            "location": {
                "cross_streets": "Jones St & Leavenworth St", 
                "city": "San Francisco", 
                "display_address": [
                    "484 Ellis St", 
                    "Tenderloin", 
                    "San Francisco, CA 94102"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Tenderloin"
                ], 
                "postal_code": "94102", 
                "country_code": "US", 
                "address": [
                    "484 Ellis St"
                ], 
                "coordinate": {
                    "latitude": 37.7847934, 
                    "longitude": -122.4141884
                }, 
                "state_code": "CA"
            }
        }
    ]
}
        
*/

module.exports = {
  getInfo: function (req, res) {
    //assuming req.param looks like { name: this.props.restaurantId/name }
    var queryObj = {
      business_id: req.query.business_id
    }
    console.log('PARAMS in GET INFO --------->', req.query.business_id)
    BusinessInfo.where(queryObj).fetch()
      .then(function (foundBusiness) {
        res.status(200).send(foundBusiness);
      })
      .catch(function (err) {
        console.error('Error: Fetching '+ req.params.name + ' from db', err);
        res.status(500).send(err);
      });
  },

  addBusiness: function (req, res) {
    //assume req.body is looking and coming from yelp api
    var business = req.body.businesses[0];
    var neighborhoodsArr = business.location.neighborhoods;
    var categoriesArr = [];
    for(var i = 0; i < business.categories.length; i++) {
      categoriesArr.push(business.categories[i][0])
    }
    //might need forloop over req.body.businesses is an array
    var newBusiness = {
      business_id: business.id,
      name: business.name,
      address: business.location.display_address[0],
      city: business.location.city,
      state: business.location.state_code,
      latitude: business.location.coordinate.latitude,
      longitude: business.location.coordinate.longitude,
      rating: business.rating,
      review_count: business.review_count,
      phone: business.phone,
      is_closed: business.is_closed
    };

    new BusinessInfo(newBusiness).save()
      .then(function (saved) {
        console.log('Sucessfully saved => ', saved);
        BusinessDetailController._saveDetails(business.id, categoriesArr, neighborhoodsArr, res, false);

      })
      .catch(function (err) {
        console.error('Error: Saving to database', err);
        res.status(500).send(err);
      })
  },
   _addFromYelp: function(yelpData, res) {
    var business = yelpData.businesses[0];
    var neighborhoodsArr = business.location.neighborhoods;
    var categoriesArr = [];
    for(var i = 0; i < business.categories.length; i++) {
      categoriesArr.push(business.categories[i][1])
    }
    //might need forloop over req.body.businesses is an array
    var newBusiness = {
      business_id: business.id,
      name: business.name,
      address: business.location.display_address[0],
      city: business.location.city,
      state: business.location.state_code,
      latitude: business.location.coordinate.latitude,
      longitude: business.location.coordinate.longitude,
      rating: business.rating,
      review_count: business.review_count,
      phone: business.phone,
      is_closed: business.is_closed
    };
    console.log(newBusiness)
    BusinessInfo.where({business_id: business.id}).fetch()
      .then(function(foundBusiness) {
        console.log("INSIDE businessInfo from yelp---->", foundBusiness)
        if(foundBusiness === null) {
          new BusinessInfo(newBusiness).save()
            .then(function (saved) {
              console.log('Sucessfully saved => ', saved);
              BusinessDetailController._saveDetails(business.id, categoriesArr, neighborhoodsArr, res, true);

            })
            .catch(function (err) {
              console.error('Error: Saving to database', err);
              res.status(500).send(err);
            })
        } else {  
          console.error('Business already added')
        }
      })
      .catch(function (err) {
        console.error('Error: Fetching BusinessInfo' , err);
        res.status(500).send(err);
      });
  }
};