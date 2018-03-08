var express = require('express');
var bodyParser = require('body-parser');
var alexa = require('alexa-app');
var app = express();
var portC = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(portC, function(){
    console.log('AGENT is running my app on  PORT: ' + portC);
});



app.post('/', (req, res) => {
	 
    if (req.body.session.new) {
        console.log('Inside');
    }
    
    console.log(req.body.request.type);
     
	
});