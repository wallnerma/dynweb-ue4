const homeController = require('./controllers/homeController');

module.exports = function(app) {
    // TODO A router's concern is to associate request methods and paths to controller functions. Nothing more.
    app.get('/', homeController.getHome);
};