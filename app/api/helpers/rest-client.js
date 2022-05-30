const axios = require('axios');

const APIRequestHandlerPromise = (url, method, bodyString, headersObject) => {
    return new Promise((resolve, reject) => {
        APIRequestHandler({
            url,
            method,
            bodyString,
            headersObject
        }, (body, error) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
};

const APIRequestHandler = ({ url, method, body, headers }, callback) => {
    const options = {
        url: url && url,
        method: method && method,
        json: true,
        headers: headers && {
            'x-api-key': "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23",
            'Content-Type': 'application/json',
            'Content-Lenght': body && Buffer.byteLength(body) || 0
        } || {
            'x-api-key': "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23",
            'Content-Type': 'application/json'
        },
        data: body && body
    };


    axios(options)
        .then((response) => {
            if (response.status >= 200 && response.status < 400) {
                callback(response);
            } else {
                callback(response.status, response);
            }
        })
        .catch((error) => {
            callback(error.response.status, error.response);
        });
};

module.exports = {
    APIRequestHandler,
    APIRequestHandlerPromise
}