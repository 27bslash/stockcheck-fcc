var expect = require('chai').expect;
const MongoClient = require('mongodb');
const request = require('request');
const fetch = require('node-fetch');
const async = require('async');

module.exports = function (app) {

    app.route('/testing/stock')
        .get(function (req, res) {
            res.send('test')
            let symbol = req.query.stock
            console.log(typeof(symbol));
            let realUrl = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
            let realUrl1 = `https://api.iextrading.com/1.0/stock/${symbol[0]}/quote`;
            let realUrl2 = `https://api.iextrading.com/1.0/stock/${symbol[1]}/quote`;


            const url = 'https://jsonplaceholder.typicode.com/users'

            if (Array.isArray(symbol)) {
                console.log('we made it', realUrl1)
                try {
                    fetch(realUrl2)
                        .then(res => res.json())
                        .then(json => console.log(json.symbol)).catch(err => console.log(err))

                    fetch(realUrl1)
                        .then(res => res.json())
                        .then(json => console.log(json.symbol)).catch(err => console.log(err))
                }
                catch (error) {
                    console.log(error)
                }
            }
            else {
                fetch(realUrl)
                .then(res => res.json())
                .then(json => console.log(json.symbol)).catch(err => console.log(err))
            }

            const p4 = fetch(url)
                .then(res =>
                    res.json()
                );
            Promise.all([p4]).then(values => console.log('Promise 1', (values[0][0].name)))
                .catch(err => console.log(err));
        });
}