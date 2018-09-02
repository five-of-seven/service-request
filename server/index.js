const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static('client/dist'));


//get all services by zip code
app.get('/servicesByZip', function(req, res) {
 var zip = req.query.zip; 

})

app.post('/newreq', function(req,res){

	var sub = req.body.Subject
	var msg = req.body.Message

	var result = {Subject:sub,Message:msg}

	res.send(result);

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))