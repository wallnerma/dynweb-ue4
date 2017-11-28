const layout = require('./layout');
const startPage = require('../templates/startPage');

function renderView(galleries) {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'startPage',
        galleries: galleries.slice(0, Math.min(3, galleries.length))
    };
    return layout(data);
}

module.exports = {
    render: renderView
};