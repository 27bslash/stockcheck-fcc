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
      const query = req.query
      const symbol = query.stock
      const url2 = `https://api.iextrading.com/1.0/stock/${symbol[1]}/quote`
      const url = `https://api.iextrading.com/1.0/stock/${symbol[0]}/quote`

      const result = {
        stockData: {
          stock: symbol[0]
          // price: obj.latestPrice,
        }
      }
      let getApi = (stock) => {
      return new Promise((resolve,reject) => {
        request(url, {json: true }, (err, res, body) => {
          if (err) { return console.log(err)}
          console.log(body)
        })
      })
    }
    
      let urls = [url, url2];



      // request(url, function (error, response, body) {
      //   if (error) {
      //     res.status(404).send('error')
      //   } else {
      //     let obj = JSON.parse(body)
      //     const object1 = {
      //       stock: symbol,
      //       price: obj.latestPrice
      //     }
      //     console.log(object1.stock)
      //     res.status(200).send(object1)
      //   }
      // });
    })
}