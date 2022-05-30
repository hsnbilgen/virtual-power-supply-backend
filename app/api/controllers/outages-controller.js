const { getOutagesData } = require('./backend-controller');

const getOutages = (req, res) => {
    return getOutagesData(req, res, 'getOutages')
        .then((response) => {
            if (response.status != 200) {
                res.status(response.status).json(response.data);
            } else {
                res.status(response.status).json(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).json(error.data);
        });
}

module.exports = {
    getOutages
}