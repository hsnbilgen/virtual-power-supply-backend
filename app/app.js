const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const { connector, summarise } = require('swagger-routes-express');
const api = require('./api/routes');
const { errorHandler } = require('./api/middleware');
const { setEnvironment } = require('./api/helpers/utils');

const PORT = process.env.PORT || 9000;

const startApp = () => {
    const app = express();


    app.use(express.json());
    app.use(errorHandler);
    app.all('*', (req, res, next) => {
        if(!global.__environment) {
            setEnvironment();
        }
        next();
    })
    
    loadRoutes(app);

    app.listen(PORT, () => {
        console.log(`try this: \n curl http://localhost:${PORT}/`);
    });

    process.on('uncaughtException', (error) => {
        console.log(`Process uncaughtException: ${error}`);
    });

}

const loadRoutes = (app) => {
    const swaggerFile = YAML.load(path.join(__dirname, './api/swagger/api.yaml'))
    const connect = connector(api, swaggerFile)
    const apiSummary = summarise(swaggerFile);
    
    console.log(apiSummary);

    connect(app);
    return app;
}

module.exports = {
    startApp,
    loadRoutes
}