const homeController = require('./controllers/homeController');
const allGalleriesController = require('./controllers/allGalleriesController');
const imageController = require('./controllers/imageController');
const shoppingCartController = require('./controllers/shoppingCartController');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
    // TODO A router's concern is to associate request methods and paths to controller functions. Nothing more.
    app.get('/', homeController.getHome);
    app.get('/galleries', allGalleriesController.getGalleries);
    app.get('/galleries/:galleryKey', imageController.getImage);
    app.use('/shopping-cart', cookieParser());
    app.post('/shopping-cart/add', bodyParser.urlencoded({ extended: true }));
    app.post('/shopping-cart/add', shoppingCartController.postShoppingCart);
    app.get('/shopping-cart', shoppingCartController.getShoppingCart);
};