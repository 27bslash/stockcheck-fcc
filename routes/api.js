/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const MongoClient = require('mongodb');
const request = require('request');
const fetch = require('node-fetch');
const async = require('async');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
const url = 'https://api.iextrading.com/1.0/stock/AAPL/quote';


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      let symbol = req.query.stock
      let realUrl = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
      let realUrl1 = `https://api.iextrading.com/1.0/stock/${symbol[0]}/quote`;
      let realUrl2 = `https://api.iextrading.com/1.0/stock/${symbol[1]}/quote`;

      
      const url = 'https://jsonplaceholder.typicode.com/users'

      if (Array.isArray(symbol)) {
        try {
          let p1 = fetch(realUrl1).then(res => res.json())
          let p2 = fetch(realUrl2).then(res => res.json())

          Promise.all([p1, p2])
            .then(json => {
              let result1 = {};
              let result2 = {};
              result1.stock = json[0].symbol
              result1.price = json[0].latestPrice
              result2.stock = json[1].symbol
              result2.price = json[1].latestPrice
              JSON.stringify(result1);
              console.log('result 1',typeof(result1), result1)
              let string = `{"StockData": [${JSON.stringify(result1)},${JSON.stringify(result2)}]}`
              // console.log('pls be a string       ', typeof(string), string)
              res.send(string)
            }).catch(err => console.log(err));
        }
        catch (error) {
          console.log(error)
        }
      }
      else {
        fetch(realUrl)
          .then(res => res.json())
          .then(json => {
            let result = {}
            result.stock = json.symbol
            result.price = json.latestPrice
            let stockData = result
            var obj = {stockData}
            console.log(typeof(obj))
            res.json(obj)
          }).catch(err => console.log(err))
      }
    });
}