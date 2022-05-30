const { getOutagesData, getSiteInfoData, createSiteOutagesData } = require('./backend-controller');

const getSiteInfo = (req, res) => {
    return getSiteInfoData(req, res, 'getSiteInfo')
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

const createSiteOutages = (req, res) => {
    let enhancedOutages = [];
    let filteredOutages = [];
    getOutagesData(req, res, 'getOutages')
    .then((responseOutages) => {
        filteredOutages = this._filterOutages(responseOutages.data);
        return getSiteInfoData(req, res, 'getSiteInfo');
    })
    .then((responseSiteInfo) => {
        enhancedOutages = this._mapSiteOutages(filteredOutages, responseSiteInfo.data.devices);
        return createSiteOutagesData(req, res, 'createSiteOutages', enhancedOutages);
    })
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

this._filterOutages = (outages) => {
    const startDate = new Date('2022-01-01T00:00:00.000Z').getTime();
    let filteredList = outages.filter(outage => {
        let time = new Date(outage.begin).getTime();
        return (startDate < time);
    });
    filteredList = filteredList.filter(outage => {
        return outage.id;
    });
    return filteredList;
}

this._mapSiteOutages = (outages, devices) => {
    return outages.map(x => ({ ...x, ...devices.find(d => d.id === x.id) })).filter(o => { return o.name });
}

module.exports = {
    getSiteInfo,
    createSiteOutages
}