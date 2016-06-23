var BusinessDetail = require('./../models/BusinessDetailModel.js');
// var PreferenceController = require('./../controller/PreferenceController.js');



module.exports = {
  getDetails: function (req, res) {
    //assuming req.param looks like { business_id: this.props.business_id }
    var queryObj = {
      business_id: req.query.business_id
    }
    BusinessDetail.where(queryObj).fetch()
      .then(function (foundDetail) {
        res.status(200).send(foundDetail);
      })
      .catch(function (err) {
        console.error('Error: Fetching '+ req.params.business_id + ' from db', err);
        res.status(500).send(err);
      });
  },

  _saveDetails: function (business_id, categoriesArr, neighborhoodsArr, res, fromYelp) {
    var saveToDb = function (arr, count, type) {
      if (arr === undefined || count === arr.length) {
        if (!fromYelp) {
          res.status(201).send('Add success');
        }
        return;
      }

      var newDetail = {
        business_id: business_id,
        type: type,
        value: arr[count]
      };

      new BusinessDetail(newDetail).save()
        .then(function (saved) {
          console.log('Successfull saved BusinessDetail', saved);
          saveToDb(arr, ++count, type);
        })
        .catch(function (err) {
          console.error('Error: Saving BusinessDetail to the database', err);
        });
    };

    saveToDb(categoriesArr, 0, 'category');
    saveToDb(neighborhoodsArr, 0, 'neighborhood');
  }

};