const layout = require('./layout');
require('../templates/errors');

function renderView404() {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '404',
    };
    return layout(data);
}

function renderView500() {
    console.log(`Unhandled error caught: [${err}]`);

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '500',
    };
    return layout(data);
}

module.exports = {
    render404: renderView404,
    render500: renderView500
};


