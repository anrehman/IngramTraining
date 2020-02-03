const request = require('request');

module.exports = function (controller) {
    // webhook for attachment
    controller.webserver.post('/atachmentResponse', function (req, res) {
        res.status(200);
        removeMessage(req.body.data.messageId);
        getAttachmentResponseData(req.body.data.personId, req.body.data.id);
    });

    function removeMessage(messageId) {
        let urlRequest = `${process.env.CISCOAPIURL}/messages/${messageId}`;
        request.delete({
            headers: {
                'Authorization': 'Bearer ' + process.env.SPARK_TOKEN,
            },
            url: urlRequest
        }, (err, res, body) => {
            if (err) {
                return console.log(err)
            }
        });
    }

    function getAttachmentResponseData(personId, id) {
        let urlRequest = `${process.env.CISCOAPIURL}/attachment/actions/${id}`;
        request({
            headers: {
                'Authorization': 'Bearer ' + process.env.SPARK_TOKEN
            },
            url: urlRequest
        }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            body = JSON.parse(body);
            var text = "";
            var url = "";
            if (body.inputs.rating == 1) {
                text = "Nos alegramos mucho que te haya gustado!!";
                url = "https://1.bp.blogspot.com/-hw33YfeU2gg/VuOR8JVMxUI/AAAAAAAAMAo/l_W-kOh7CO4ixEsaWeML8FB4EpJ_xZoZA/s1600/Smiley-Green-rating.jpg";
            } else if (body.inputs.rating == 2) {
                text = "La próxima vez no te dejaremos indiferente :-)";
                url = "https://3.bp.blogspot.com/-dEHkeQJBm9c/VuOR89AkTII/AAAAAAAAMAs/FjIS9MUZKUI71-YgMM_nIjGD2ZjoXZQPQ/s1600/Smiley-Yellow-rating.jpg";
            } else if (body.inputs.rating == 3) {
                text = "Upss, trabajamos para mejorar!";
                url = "https://3.bp.blogspot.com/-2Q4mCe03fEg/VuOR92Jk6bI/AAAAAAAAMAw/YCY_ej--zEoSybT_PseTp6p0-G7Y-kGfw/s1600/Smiley-Red-rating.jpg";
            }
            sendThankYouMessage(personId, text, url);
        });
    }

    function sendThankYouMessage(personId, text, url) {
        var urlRequest = `${process.env.CISCOAPIURL}/messages`;
        request.post({
            headers: {
                'Authorization': 'Bearer ' + process.env.SPARK_TOKEN,
                'Content-Type': 'application/json'
            },
            url: urlRequest,
            json: {
                toPersonId: personId,
                text: 'Hola',
                attachments: getThankYouCard(text, url)
            }
        }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
        });
    }

    function getThankYouCard(text, url) {
        return {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [{
                        "type": "Container",
                        "items": [{
                            "type": "TextBlock",
                            "text": "Rating",
                            "horizontalAlignment": "Center",
                            "separator": true,
                            "size": "Large",
                            "color": "Accent"
                        }],
                        "style": "emphasis"
                    },
                    {
                        "type": "ColumnSet",
                        "columns": [{
                                "type": "Column",
                                "width": 1,
                                "items": [{
                                    "type": "Image",
                                    "altText": "",
                                    "url": url,
                                    "size": "Small",
                                    "horizontalAlignment": "Center"
                                }]
                            },
                            {
                                "type": "Column",
                                "width": 4,
                                "items": [{
                                    "type": "TextBlock",
                                    "text": text,
                                    "horizontalAlignment": "Center",
                                    "separator": true
                                }],
                                "horizontalAlignment": "Center",
                                "verticalContentAlignment": "Center"
                            }
                        ]
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        };
    }

}