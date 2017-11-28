const imageModel = require('../models/image');
const imageView = require('../views/imageView');
const galleryPartial = require('../templates/allGalleries')

function handleGetImage(req, res) {
    const galleryKey = req.params.galleryKey;
    const galleryName = galleryKey;
    const gallery = {
        name: galleryName,
        images: [],
        uri: '/galleries/' + galleryName
    };
    function generateResponse(galleryName, gallery) {
        res.send(imageView.render(galleryName, gallery));
    }
    imageModel.getImage(generateResponse, galleryKey, gallery);
}

module.exports = {
    getImage: handleGetImage
};


