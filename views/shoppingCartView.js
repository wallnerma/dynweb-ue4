const layout = require('./layout');
const shoppingCart = require('../templates/shoppingCart');

function renderView(images, imagesInCart) {

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'shoppingCart',
        shoppingCart: {
            images: images,
            itemCount: imagesInCart.length
        }
    };
    return layout(data);
}

module.exports = {
    render: renderView
};