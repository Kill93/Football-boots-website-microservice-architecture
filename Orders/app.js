require('dotenv').config();
var mysql = require('mysql');
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3600;
app.use(cors());

var pool = mysql.createPool({
    user     : 'ba8bd2595d74f0',
    password : '644161c9',
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    database: 'ad_0c9ac391300a19b',
    port     : 3306
});

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/charge', function(req, res, next){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        "use strict";
        var obj = JSON.parse(body);

        var newCharge = {
            amount: Math.round(obj.price) + '00',
            currency: "eur",
            source: obj.token_from_stripe,
            description: 'Thanks from ' + obj.username,
            receipt_email: obj.username + '@live.ie',
            shipping: {
                name: obj.username,
                address: {
                    line1: 'Cahersiveen',
                    city: 'Kerry',
                    state: 'Kerry',
                    postal_code: 'zipcode',
                    country: 'IRE'
                }
            }
        };
        console.log(newCharge);


        let sql = 'INSERT INTO orders (firstName, price)' +
            'VALUES(?, ?)';

        pool.getConnection(function(err, connection) {

            connection.query(sql, [obj.username, obj.price], (err, rows) => {
                if (err) {
                    throw err;
                }
            });
            connection.release();
        })

        stripe.charges.create(newCharge, function (err, charge) {

            if (err) {
                console.error(err);
                res.json({error: err, charge: false});
            } else {
                res.json({error: false, charge: charge});
            }
        });
    })
});

app.get('/charge/:id', function(req, res){
    stripe.charges.retrieve(req.params.id, function(err, charge) {
        if (err){
            res.json({ error: err, charge: false });
        } else {
            res.json({ error: false, charge: charge });
            console.log('CHARGE IS SENT')
        }
    });
});

app.get('/orders', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    pool.getConnection(function(err, connection) {
        console.log("connection started")
        connection.query('SELECT * FROM orders',
            function (err, results, fields) {
                if (err) {
                    throw err;
                }
                res.send(results);

            });
        connection.release();
        console.log("connection ended")
    })
});

app.listen(port, function(){
    console.log('Server listening on port ' + port)
});