const galleries = require('../models/galleries');
const galleryView = require('../views/galleryView');


function handleGetGalleries(req, res) {
    function generateResponse(galleries) {
        res.send(galleryView.render(galleries));
    }

    galleries.getGalleries(generateResponse);
}

module.exports = {
    getGalleries: handleGetGalleries
};

