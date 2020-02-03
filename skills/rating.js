const request = require('request');

module.exports = function (controller) {
    controller.hears(["rating"], 'direct_message', function (bot, message) {
        sendMessage(message.user);
    });

    function sendMessage(personEmail) {
        if (personEmail != process.env.BOT_EMAIL) {
            let urlRequest = `${process.env.CISCOAPIURL}/messages`;
            request.post({
                headers: {
                    'Authorization': 'Bearer ' + process.env.SPARK_TOKEN,
                    'Content-Type': 'application/json'
                },
                url: urlRequest,
                json: {
                    toPersonEmail: personEmail,
                    text: 'Hola',
                    attachments: getAttachmentCard()
                }
            }, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }

    function getAttachmentCard() {
        return {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
                "type": "AdaptiveCard",
                "body": [{
                        "type": "TextBlock",
                        "size": "Medium",
                        "weight": "Bolder",
                        "text": "Valora tu experiencia con el bot"
                    },
                    {
                        "type": "Input.ChoiceSet",
                        "placeholder": "Placeholder text",
                        "choices": [{
                                "title": "Happy :D",
                                "value": "1"
                            },
                            {
                                "title": "Normal :)",
                                "value": "2"
                            },
                            {
                                "title": "Sad :(",
                                "value": "3"
                            }
                        ],
                        "style": "expanded",
                        "value": "1",
                        "id": "rating",
                        "separator": true
                    },
                    {
                        "type": "ActionSet",
                        "actions": [{
                            "type": "Action.Submit",
                            "title": "Enviar",
                            "style": "positive"
                        }]
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.0"
            }
        };
    }
};