const layout = require('./layout');
const allGalleries = require('../templates/allGalleries');

function renderView(galleries) {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'allGalleries',
        galleries: galleries
    };
    return layout(data);
}
/*
app.get('/galleries', (req, res) => {
    function generateResponse(galleries) {
        const now = new Date();
        const data = {
            currentYear: now.getFullYear(),
            bodyPartial: 'allGalleries',
            galleries: galleries
        };
        res.send(layout(data));
    }

    galleries.getGalleries(generateResponse);
});

*/
module.exports = {
    render: renderView
};