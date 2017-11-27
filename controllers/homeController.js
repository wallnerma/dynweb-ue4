const galleries = require('../models/galleries');
const homeView = require('../views/homeView');

// HINT: A controller is responsible (i) to deal with HTTP protocol issues and (ii) encapsulates the knowledge how to feed a view with appropriate data from the model
function handleGetHome(req, res) {
    function generateResponse(galleries) {
        res.send(homeView.render(galleries));
    }

    galleries.getGalleries(generateResponse);
}

module.exports = {
    getHome: handleGetHome
};