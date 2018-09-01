const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => res.send('Hello World!'));

//get all services by zip code
app.get('/servicesByZip', function(req, res) {
 var zip = req.query.zip; 

 //
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))