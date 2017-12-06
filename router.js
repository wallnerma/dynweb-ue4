const homeController = require('./controllers/homeController');
const allGalleriesController = require('./controllers/allGalleriesController');
const imageController = require('./controllers/imageController');
const shoppingCartController = require('./controllers/shoppingCartController');
const errorController = require('./controllers/errorController')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

module.exports = function(app) {
    app.use(express.static('public'));
    app.get('/', homeController.getHome);
    app.get('/galleries', allGalleriesController.getGalleries);
    app.get('/galleries/:galleryKey', imageController.getImage);
    app.use('/shopping-cart', cookieParser());
    app.post('/shopping-cart/add', bodyParser.urlencoded({ extended: true }));
    app.post('/shopping-cart/add', shoppingCartController.postShoppingCart);
    app.get('/shopping-cart', shoppingCartController.getShoppingCart);
    app.post('/shopping-cart/order', bodyParser.urlencoded({ extended: true }));
    app.post('/shopping-cart/order', shoppingCartController.postOrderSuccess);
    app.use(errorController.getError404);
    app.use(errorController.getError500);
};