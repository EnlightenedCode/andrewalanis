var PORT = process.env.PORT || 8080;
var dokkuLogin = process.env.LOGIN_DOKKU;
var dokkuHash = process.env.HASH_DOKKU;
var express = require("express");
var auth = require('basic-auth');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    var credentials = auth(req);

    if (!credentials || credentials.name !== dokkuLogin || credentials.pass !== dokkuHash) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied')
    } else {
        res.send("Hello, You are in!");
        res.end('Access granted');

    }

});

app.listen(PORT);