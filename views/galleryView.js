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

module.exports = {
    render: renderView
};