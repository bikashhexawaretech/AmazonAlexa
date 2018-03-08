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

function Greetings(intent, session, callback) {
    const sessionAttributes = {},
        cardTitle = 'Hey There',
        speechOutput = 'Hey There.I am alexa bot!!!',
        repromptText = 'Hey There.I am alexa bot!!!',
        shouldEndSession = true;
    callback(sessionAttributes, buildResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function callIntent(req, session, callback){
	if(req.intent.name === 'Greeting'){
        console.log('Greeting Intent Called');
        Greetings(intent, session, callback);
    }  
}

function sendResponse(res, attributes, response){
	return res.json({
		version: '1.0',
		attributes,
		response: response
	});
}

app.post('/', (req, res) => {
    
    /*
    if (req.body.session.new) {
        console.log('Inside');
    }
    */
    
    console.log(req.body.request.type);
    if (req.body.request.type === 'IntentRequest') {
        callIntent(req.body.request,req.body.session,
            (attributes, response) => {
                sendResponse(res, attributes, response);
            });
        }
        else if (req.body.request.type === 'SessionEndedRequest') {
            console.log("session end");
        }
	
});