/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var request = require('request');
// const place = 2019-09-05
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const url2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=YGIV1AV1PJXNF0J3';
const url = 'https://api.iextrading.com/1.0//stock/AAPL/quote';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      request(url, function (error, response, body) {

        // var keysArray = Object.keys(body)
        // for (var i = 0; i < keysArray.length; i++) {
          // ['Meta Data']
        // }
        var obj = JSON.parse(body)
        console.log(typeof(obj))
        res.send(obj)
      })
    });

}