var express =  require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

app.use(cors());

var port = process.env.PORT || 3000;

var pool = mysql.createPool({
    user     : 'ba8bd2595d74f0',
    password : '644161c9',
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    database: 'ad_0c9ac391300a19b',
    port     : 3306
});

app.post('/register', function(req, res, next) {

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
        let sql = 'INSERT INTO users (firstName, lastName, address, email, password)' +
            'VALUES(?, ?, ? ,? ,?)';

        pool.getConnection(function(err, connection) {

            connection.query(sql, [obj.firstName, obj.lastName, obj.address, obj.email, obj.password], (err, rows) => {
                if (err) {
                    throw err;
                }
            });
            connection.release();
        })
        res.send("success");

    })

});

app.post('/login', function(req, res, next) {

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
        let sql = "Select * FROM users WHERE email='"+obj.email + "' AND password='"+obj.password +"'";

        pool.getConnection(function(err, connection) {

            connection.query(sql ,(err, rows) => {
                if (err) {
                    throw err;
                }

                if (rows!=null && rows.length>0) {
                    console.log(" user in database" );
                    var obj = {
                        id: rows[0].user_id,
                        firstName: rows[0].firstName,
                        success: "success"
                    }
                    res.send(obj);

                }
                else{
                    console.log(" user not in database");

                }
            });
            connection.release();
        })

    })

});

app.get('/users', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    pool.getConnection(function(err, connection) {
        console.log("connection started")
        connection.query('SELECT * FROM users',
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

app.listen(port);