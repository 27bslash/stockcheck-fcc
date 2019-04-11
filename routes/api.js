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
      var url;
      var url2;
      const query = req.query
      const symbol = query.stock
      res.locals.obj1;
      res.locals.obj2;
      const result = {
        stockData: {
          stock: symbol[0]
          // price: obj.latestPrice,  
        }
      }
      let getApi = (stock) => {
        let url = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
        let stockData = {};
        return new Promise((resolve, reject) => {
          request(url, { json: true }, (err, res, body) => {
            if (err) {
              console.log(err)
              return reject(err)
            }
            stockData.stock = body.symbol
            stockData.price = body.latestPrice
            console.log(stockData)
            resolve(stockData)
          })
        })
      }
      let initStock = async (req, res, next) => {
        res.locals.obj1 = {};
        res.locals.obj2 = {};
        try {
          res.locals.obj1 = await getApi(req.query.stock1);
        } catch (err) {
          console.log(err);
        }
        if (req.query.stock2) {
          console.log(req.query.stock2)
          try {
            res.locals.obj2 = await getApi(req.query.stock2);
          } catch (err) {
            console.log(err);
          }
        }
        next()
      }
      initStock()
      // return new Promise((resolve, reject) => {
      //   request(url2, { json: true }, (err, res, body) => {
      //     if (err) { return console.log(err) }
      //     console.log(body.symbol)
      //     resolve(body);
      //   })
      // })


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