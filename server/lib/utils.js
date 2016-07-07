module.exports = {
  unique: function (arr) {
    var obj = {};
    var results = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = arr[i];
    }
    for (var i in obj) {
      results.push(obj[i]);
    }
    return results;
  }
};