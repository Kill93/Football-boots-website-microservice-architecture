var express =  require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

app.use(cors());

var port = process.env.PORT || 5050;

var pool = mysql.createPool({
    user     : 'ba8bd2595d74f0',
    password : '644161c9',
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    database: 'ad_0c9ac391300a19b',
    port     : 3306
});

app.get('/boots', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    pool.getConnection(function(err, connection) {
        console.log("connection started")
        connection.query('SELECT * FROM boots',
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

app.post('/addBoot', function(req, res, next) {

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
        console.log(obj);
        let sql = 'INSERT INTO boots (name, colour, type, imageName, price)' +
            'VALUES(?, ?, ? ,? ,?)';

        pool.getConnection(function(err, connection) {

            connection.query(sql, [obj.name, obj.colour, obj.type, obj.imageName, obj.price], (err, rows) => {
                if (err) {
                    throw err;
                }
            });
            connection.release();
        })
        res.send("success");

    })

});

app.post('/removeBoot', function(req, res, next) {

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
        console.log(obj);
        let sql = "DELETE FROM boots WHERE boot_id="+
            obj;

        pool.getConnection(function(err, connection) {

            connection.query(sql ,(err, rows) => {
                if (err) {
                    throw err;
                }
            });
            connection.release();
        })
        res.send("success");

    })

});

app.listen(port);