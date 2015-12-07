var PORT = process.env.PORT || 8080;
var express = require("express");
var auth = require('basic-auth');

var app = express();
app.use(app.router);
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    var credentials = auth(req);

    if (!credentials || credentials.name !== 'develop' || credentials.pass !== 'developonme') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied')
    } else {
        res.send("Hello, You are in!");
        res.end('Access granted');

    }

});

app.listen(PORT);