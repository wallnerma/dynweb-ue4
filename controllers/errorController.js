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

//
// // Custom 404
// app.use((req, res) => {
//     const now = new Date();
//     const data = {
//         currentYear: now.getFullYear(),
//         bodyPartial: '404',
//     };
//     res.status(404).send(layout(data));
// });
//
// // Custom 500
// app.use((err, req, res) => {
//     console.log(`Unhandled error caught: [${err}]`);
//
//     const now = new Date();
//     const data = {
//         currentYear: now.getFullYear(),
//         bodyPartial: '500',
//     };
//     res.status(500).send(layout(data));
// });