const layout = require('./layout');
const gallery = require('../templates/gallery');

function renderView(galleryName, gallery) {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'gallery',
        gallery: gallery
    };
    return layout(data);
}

module.exports = {
    render: renderView
};