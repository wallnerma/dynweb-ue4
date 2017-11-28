const errorView = require('../views/errorView');

function handleGetError404(req, res) {
    function generateResponse() {
        res.status(404).send(errorView.render404());
    }
    generateResponse();
}

function handleGetError500(req, res) {
    function generateResponse() {
        res.status(500).send(errorView.render500());
    }
    generateResponse();
}

module.exports = {
    getError404: handleGetError404,
    getError500: handleGetError500
};