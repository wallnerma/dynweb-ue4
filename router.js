const homeController = require('./controllers/homeController');
const allGalleriesController = require('./controllers/allGalleriesController');
const imageController = require('./controllers/imageController');

module.exports = function(app) {
    // TODO A router's concern is to associate request methods and paths to controller functions. Nothing more.
    app.get('/', homeController.getHome);
    app.get('/galleries', allGalleriesController.getGalleries);
    app.get('/galleries/:galleryKey', imageController.getImage);
};