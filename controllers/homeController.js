const galleries = require('../models/galleries');
const homeView = require('../views/homeView');

function handleGetHome(req, res) {
    function generateResponse(galleries) {
        res.send(homeView.render(galleries));
    }

    galleries.getGalleries(generateResponse);
}

module.exports = {
    getHome: handleGetHome
};