const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const parser = require('body-parser');
const encoded = parser.urlencoded( {extended: false} );
app.use(express.static('site'))

let db = new sqlite3.Database('main.db', (err) => {
if (err) {
console.log(err.message);
}
console.log("connected to database");
});

db.serialize(() => {
db.run('CREATE TABLE IF NOT EXISTS accounts(name, pass)');

db.each('SELECT * FROM accounts', (err, row) => {
if (err) {
throw err;
}
console.log(row.message);
});
});

app.get('/index.html', function (req, res) {
res.sendFile(__dirname + "/" + "index.html");
});

app.post("/", encoded, function (req, res) {
 console.log(`name: ${req.body.name}, pass: ${req.body.pass}`);
res.send(`succesfull ${req.body.name} ${req.body.pass}`);
 db.serialize(() => {
 db.run(`INSERT INTO accounts(name, pass) VALUES (${req.body.name}, ${req.body.pass})`)
 db.each("SELECT * FROM accounts", (err, row) => {
if (err) {
throw err;
}
console.log(row.message);
});
});
});
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
