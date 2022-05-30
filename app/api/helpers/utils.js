const requestConfig = require('../config/request.json');

const prepareRequest = (req, methodName) => {
    let url = {};
    let siteId = req.params.siteId && req.params.siteId;

    switch (methodName) {
        case 'getOutages':
            url = `${requestConfig.host}${requestConfig.basePath}${requestConfig.pathOutages}`;
            break;
        case 'getSiteInfo':
            url = `${requestConfig.host}${requestConfig.basePath}${requestConfig.pathSiteInfo}/${siteId}`;
            break;
        case 'createSiteOutages':
            url = `${requestConfig.host}${requestConfig.basePath}${requestConfig.pathSiteOutages}/${siteId}`;
            break;
        default:
            break;
    };
    console.log(url);
    return url;
}

const setResponse = (status, success, data, error) => {

    try {
        if (error) {
            return {
                status: status,
                success: success,
                errors: [{ message: error }]
            };
        }
        data = {
            status: status,
            success: success,
            data: data
        }
        return data;
    } catch (error) {
        console.log(error);
        data = {
            status: status,
            success: false,
            errors: [{ message: error }]
        }
        return data;
    }
}

const setEnvironment = () => {
    const environment = process.env.NODE_ENV || 'development';
    global.__environment = environment;
    console.log(`environment is: ${environment}`);
}

module.exports = {
    prepareRequest,
    setResponse,
    setEnvironment
}