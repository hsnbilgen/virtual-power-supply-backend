const { getOutages } = require('../controllers/outages-controller');
const { getSiteInfo, createSiteOutages } = require('../controllers/site-controller');

module.exports = {
    getOutages,
    getSiteInfo,
    createSiteOutages
}