require("dotenv").config();
const request = require('request');
const moment = require('moment');
const { isDateValid, getNumberOfDaysLeftForBirthday } = require("./helpers");


const getHomePage = (req, res) => {
    res.send("Hi, welcome to thhe assessment");
}

const getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

const postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Get the webhook event. entry.messaging is an array, but 
            // will only ever contain one event, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get sender psid
            const senderPsid = webhook_event.sender.id;
            if(webhook_event.message) {
                handleMessage(senderPsid, webhook_event.message);
            } else if(webhook_event.postback) {
                handlePostback(senderPsid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
}

function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    // Do calculations based on the postback payload
    if (payload.toLowerCase().includes('yes')) {
        
        const validDate = payload.split(',')
            .map(item => item.trim())
            .filter(item => isDateValid(item))

        const daysLeftForBirthday = getNumberOfDaysLeftForBirthday(validDate[0]);

        response = `There are ${daysLeftForBirthday} day(s) left until your next birthday`;
    } else if (payload === 'no') {
        response = "Bye! Nice chatting with you! Goodbye";
    }
    // Send the message to acknowledge the postback
    callSendApi(sender_psid, response);
}

const handleMessage = (senderPsid, message) => {
    let response;
    console.log(message, 'xxxxxx');
    if(message && message.text) {
        const isDateAvailable = message.text.split(',')
        .map(item => item.trim())
        .some(item => isDateValid(item));

        if(message.text.toLowerCase() === 'hi') {
            response = 'Hi, may I know your name and birth-date?\neg: John Smith, YYYY-MM-DD';
            callSendApi(senderPsid, response);
        } else if(isDateAvailable) {
            const validDate = message.text.split(',')
            .map(item => item.trim())
            .filter(item => isDateValid(item))
            callSendAPIWithTemplate(senderPsid, validDate[0]);
        } else {
            response = 'I did not understand. Please type "hi" to start the conversation.';
            callSendApi(senderPsid, response);
        }
    } 
}

const callSendApi = (senderPsid, response) => {
    // Construct the response body
    let requestBody = {
        "recipient": {
            "id": senderPsid
        },
        "message": { "text": response }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v7.0/me/messages",
        "qs": { "access_token": process.env.FB_PAGE_TOKEN },
        "method": "POST",
        "json": requestBody
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!');
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let callSendAPIWithTemplate = (senderPsid, birthdate) => {
    // document fb message template
    // https://developers.facebook.com/docs/messenger-platform/send-messages/templates
    let body = {
        "recipient": {
            "id": senderPsid
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": `Want to know how many days till your birthday?`,
                        "subtitle": "Tap a button to answer.",
                        "image_url": 'https://thumbs.dreamstime.com/b/happy-birthday-cupcake-celebration-message-160558421.jpg',
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": `yes,${birthdate}`,
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    };

    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": process.env.FB_PAGE_TOKEN },
        "method": "POST",
        "json": body
    }, (err, res, body) => {
        if (!err) {
            // console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
    getHomePage,
    getWebhook,
    postWebhook,
}