var BusinessDetail = require('./../models/BusinessDetailModel.js');
// var PreferenceController = require('./../controller/PreferenceController.js');



module.exports = {
  getDetails: function (req, res) {
    //assuming req.param looks like { business_id: this.props.business_id }
    var queryObj = {
      business_id: req.query.business_id
    }
    BusinessDetail.where(queryObj).fetchAll()
      .then(function (foundDetail) {
        res.status(200).send(foundDetail);
      })
      .catch(function (err) {
        console.error('Error: Fetching '+ req.params.business_id + ' from db', err);
        res.status(500).send(err);
      });
  },

  _saveDetails: function (business_id, categoriesArr, neighborhoodsArr, shouldSend, sendData, res) {
    var saveToDb = function (categories, neighborhoods, count) {
      var type, value;
      var numberOfCategories = categories.constructor === Array ? categories.length : 0;
      var numberOfNeighborhoods = neighborhoods.constructor === Array ? neighborhoods.length : 0;

      if (count < numberOfCategories) {
        type = 'category';
        value = categories[count];
      } else {
        type = 'neighborhood';
        value = neighborhoods[count - numberOfCategories];
      }

      var newDetail = {
        business_id: business_id,
        type: type,
        value: value
      };

      return new BusinessDetail(newDetail).save()
        .then(function (saved) {
          count++;
          if (count === numberOfNeighborhoods + numberOfCategories) {   
            if (shouldSend) {
              res.status(201).send(sendData)
            }   
            return saved;
          }

          saveToDb(categoriesArr, neighborhoodsArr, count);
        })
        .catch(function (err) {
          console.error('Error: Saving BusinessDetail to the database', err);
        });
    };

    return saveToDb(categoriesArr, neighborhoodsArr, 0);
  }

};