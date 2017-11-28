const layout = require('./layout');
require('../templates/orderSuccess');

function renderOrderSuccess() {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'orderSuccess'
    };
    return layout(data);
}

module.exports = {
    renderView: renderOrderSuccess
};
