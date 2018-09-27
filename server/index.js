const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', express.static('dist'));
app.use('/',express.static('public'));

app.get('/', function(req, res) {
  console.log('why is this route not doing anything?')
  res.end();
})

app.listen(3000, () => console.log('Example app listening on port 3000!')) 
