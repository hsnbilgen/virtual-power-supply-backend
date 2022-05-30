const { APIRequestHandlerPromise } = require('../helpers/rest-client');
const { prepareRequest, setResponse } = require('../helpers/utils');

const getOutagesData = (req, res, methodName) => {
    const url = prepareRequest(req, methodName);
    return new Promise((resolve, reject) => {
        APIRequestHandlerPromise(url, 'GET')
            .then((response) => {
                const success = response.status >= 400 ? false : true;
                const jsonResponse = setResponse(response.status, success, response.data, '');
                resolve(jsonResponse);
            })
            .catch((error) => {
                const success = error.status >= 400 ? false : true;
                const jsonResponse = setResponse(error.status, error, '', error.data);
                reject(error);
            });
    });
};

const getSiteInfoData = (req, res, methodName) => {
    const url = prepareRequest(req, methodName);
    return new Promise((resolve, reject) => {
        APIRequestHandlerPromise(url, 'GET')
            .then((response) => {
                const success = response.status >= 400 ? false : true;
                const jsonResponse = setResponse(response.status, success, response.data, '');
                resolve(jsonResponse);
            })
            .catch((error) => {
                const success = error.status >= 400 ? false : true;
                const jsonResponse = setResponse(error.status, error, '', error.data);
                reject(error);
            });
    });
};

const createSiteOutagesData = (req, res, methodName, bodyString) => {
    const url = prepareRequest(req, methodName);
    const headersObject = {
        'x-api-key': "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23",
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
    };
    console.log(bodyString);
    return new Promise((resolve, reject) => {
        APIRequestHandlerPromise(url, 'POST', bodyString, headersObject)
            .then((response) => {
                const success = response.status >= 400 ? false : true;
                const jsonResponse = setResponse(response.status, success, response.data, '');
                resolve(jsonResponse);
            })
            .catch((error) => {
                const success = error.status >= 400 ? false : true;
                const jsonResponse = setResponse(error.status, error, '', error.data);
                reject(error);
            });
    });
};

module.exports = {
    getOutagesData,
    getSiteInfoData,
    createSiteOutagesData
}