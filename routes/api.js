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

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const url = 'https://api.iextrading.com/1.0//stock/AAPL/quote';

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      request(url, function (error, response, body) {
        let obj = JSON.parse(body)
        res.send(obj)
        //dsfk
      })
    });

}