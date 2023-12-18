const express = require('express');
const app = express();
const sql = require('mysql');
const parser = require('body-parser');
const encoded = parser.urlencoded( {extended: false} );
app.use(express.static('site'))

app.get('/index.html', function (req, res) {
res.sendFile(__dirname + "/" + "index.html");
});

app.post("/", encoded, function (req, res) {
 console.log(`name: ${req.body.name}, pass: ${req.body.pass}`);
res.send(`succesfull ${req.body.name} ${req.body.pass}`);
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})