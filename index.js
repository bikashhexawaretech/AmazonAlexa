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


var card = {
    type: 'Standard',
    title: 'Category',
    text: 'Category',
    image: {
        "smallImageUrl": "https://insyncworkplacesolutions.com.au/wp-content/uploads/2013/04/microscope-2.jpg",
        "largeImageUrl": "https://insyncworkplacesolutions.com.au/wp-content/uploads/2013/04/microscope-2.jpg"
    }
};
 
 

function buildResponse(title, output, repromptText, shouldEndSessionValue) {
    
	return {
		outputSpeech: {
			type: 'PlainText',
			text: output
		},
		card: {
			type: 'Simple',
			title: title,
			content: output
		},
		reprompt: {
			outputSpeech: {
				type: 'PlainText',
				text: repromptText
			}
        },
        shouldEndSession: shouldEndSessionValue
	};
}

function buildResponseCard(card,title, output, repromptText, shouldEndSessionValue){
    return {
		outputSpeech: {
			type: 'PlainText',
			text: output
		},
		card:card,
		reprompt: {
			outputSpeech: {
				type: 'PlainText',
				text: repromptText
			}
        },
        shouldEndSession: shouldEndSessionValue
	};

}

function Greetings(intent, session, callback) {
    const sessionAttributes = {},
        cardTitle = 'Hey There',
        speechOutput = 'Hey There I am servicenow assistant.I can help you with create an incident and get the status of an incident',
        repromptText = 'Hey There I am servicenow assistant.I can help you with create an incident and get the status of an incident',
        shouldEndSession = false;
    callback(sessionAttributes, buildResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function Category(intent, session, callback) {
    const sessionAttributes = {},
        cardTitle = 'Category',
        speechOutput = 'Please enter Category like Hardware,Software or Network',
        repromptText = 'Please enter Category like Hardware,Software or Network',
        shouldEndSession = false;
    callback(sessionAttributes, buildResponseCard(card,cardTitle, speechOutput, repromptText, shouldEndSession));
}



function ContactType(intent, session, callback) {
    const sessionAttributes = {},
        cardTitle = 'Contact Type',
        speechOutput = 'Please enter contact type like Phone or Email',
        repromptText = 'Please enter contact type like Phone or Email',
        shouldEndSession = false;
    callback(sessionAttributes, buildResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function Description(intent, session, callback) {
    const sessionAttributes = {},
        cardTitle = 'Description',
        speechOutput = 'Please enter description',
        repromptText = 'Please enter description',
        shouldEndSession = false;
    callback(sessionAttributes, buildResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function callIntent(req, session, callback){
    console.log(req.intent.name);
	if(req.intent.name === 'Greeting'){
      
        Greetings(req.intent.name, session, callback);
    }
    else
    if(req.intent.name === 'CreateIncident'){
         
        Category(req.intent.name, session, callback);
    }  
    else
    if(req.intent.name === 'Category'){
         
        ContactType(req.intent.name, session, callback);
    }  
    else
    if(req.intent.name === 'ContactType'){
         
        Description(req.intent.name, session, callback);
    }  
     
}
 
function sendResponse(res, attributes, response){
	return res.json({
		version: '1.0',
		attributes,
		response: response
	});
}

app.post('/', function (req, res)   {
    
    /*
    if (req.body.session.new) {
        console.log('Inside');
    }
    */
    
    
    if (req.body.request.type === 'IntentRequest') {
        callIntent(req.body.request,req.body.session,
            function (attributes, response)   {
                sendResponse(res, attributes, response);
            });
        }

         

        else if (req.body.request.type === 'SessionEndedRequest') {
            console.log("session end");
        }
	
});